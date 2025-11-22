import { PRODUCTS } from "@/constants/Assets"; // 👈 Ensure your product data is imported
import { CUSTOMCOLRS } from "@/constants/Colors";
import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Divider, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// --- Helper function to create mock cart items from your PRODUCTS data ---
const createMockCart = (products: any) => {
  // Mocks a cart by taking the first three products and adding quantity
  return products.slice(0, 3).map((product: any, index: number) => ({
    ...product,
    id: product.id || product._id || `p${index + 1}`, // Use existing ID or mock one
    quantity: index === 1 ? 2 : 1, // Example quantity
    // Ensure price properties are numeric for calculations
    price: parseFloat(product.price) || 0,
    oldPrice: parseFloat(product.oldPrice) || 0,
  }));
};

const initialCartItems = createMockCart(PRODUCTS);

// --- Cart Item Component ---
const CartItem = ({ item, updateQuantity, removeItem }: any) => {
  const itemTotal = item.price * item.quantity;

  return (
    <Card style={styles.cartCard}>
      <View style={styles.itemContent}>
        {/* Image: item.image[0] will now contain the valid local asset reference */}
        <Image
          source={
            item.image
              ? item.image[0]
              : { uri: "https://via.placeholder.com/150" }
          }
          style={styles.itemImage}
          resizeMode="cover"
        />

        {/* Details & Controls */}
        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name || "Product Name"}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.itemPrice}>₦{item.price.toLocaleString()}</Text>
            <Text style={styles.itemOldPrice}>
              ₦{item.oldPrice.toLocaleString()}
            </Text>
          </View>

          {/* Quantity Controls */}
          <View style={styles.quantityControl}>
            <IconButton
              icon={() => (
                <AntDesign name="minus-circle" size={20} color="gray" />
              )}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
              size={20}
              disabled={item.quantity <= 1}
              style={{ margin: 0 }}
            />
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <IconButton
              icon={() => (
                <AntDesign
                  name="plus-circle"
                  size={20}
                  color={CUSTOMCOLRS.ACCENT || "blue"}
                />
              )}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
              size={20}
              style={{ margin: 0 }}
            />
          </View>
        </View>

        {/* Remove & Subtotal */}
        <View style={styles.removeContainer}>
          <IconButton
            icon={() => <Feather name="trash-2" size={20} color="red" />}
            onPress={() => removeItem(item.id)}
            size={20}
            style={{ margin: 0 }}
          />
          <Text style={styles.itemSubtotal}>₦{itemTotal.toLocaleString()}</Text>
        </View>
      </View>
    </Card>
  );
};

// --- Main Cart Screen Component ---
const CartScreen = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (itemId: string, newQuantity:number) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems: any) =>
      prevItems.map((item: any) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems((prevItems: any) => prevItems.filter((item: any) => item.id !== itemId));
  };

  const cartSubtotal = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);

  const renderItem = ({ item }: {item: any}) => (
    <CartItem
      item={item}
      updateQuantity={updateQuantity}
      removeItem={removeItem}
    />
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Feather name="shopping-cart" size={50} color="gray" />
      <Text style={styles.emptyText}>Your cart is empty.</Text>
      <Text style={styles.emptySubText}>Add some items to start shopping!</Text>
      <Button
        mode="contained"
        style={styles.shopButton}
        onPress={() => console.log("Go to Home")}
      >
        Start Shopping
      </Button>
    </View>
  );

  const ListFooterComponent = () => {
    if (cartItems.length === 0) return null;

    return (
      <View style={styles.footerContainer}>
        <Divider style={styles.divider} />
        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalLabel}>
            Subtotal ({totalItems} items):
          </Text>
          <Text style={styles.subtotalValue}>
            ₦{cartSubtotal.toLocaleString()}
          </Text>
        </View>
        <Text style={styles.shippingText}>Free shipping!</Text>

        <Button
          mode="contained"
          icon="credit-card-outline"
          labelStyle={styles.checkoutLabel}
          style={styles.checkoutButton}
          onPress={() => console.log("Proceed to Checkout")}
        >
          Proceed to Checkout
        </Button>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.headerSubTitle}>({totalItems} items)</Text>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
      />
    </SafeAreaView>
  );
};

// --- Styles (Omitted for brevity, but use the full styles from the previous step) ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  headerSubTitle: {
    fontSize: 16,
    color: "gray",
    marginLeft: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cartCard: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 1,
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  itemDetails: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: CUSTOMCOLRS.TEXT_DARK || "#333",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: CUSTOMCOLRS.ACCENT || "red",
    marginRight: 8,
  },
  itemOldPrice: {
    fontSize: 12,
    color: "gray",
    textDecorationLine: "line-through",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 5,
    width: 20,
    textAlign: "center",
  },
  removeContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  itemSubtotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: CUSTOMCOLRS.TEXT_DARK || "#333",
    marginTop: 10,
  },
  footerContainer: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  divider: {
    marginVertical: 10,
    backgroundColor: "#eee",
  },
  subtotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  subtotalLabel: {
    fontSize: 18,
    color: "gray",
  },
  subtotalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: CUSTOMCOLRS.TEXT_DARK || "#000",
  },
  shippingText: {
    fontSize: 12,
    color: "green",
    textAlign: "right",
    marginBottom: 15,
  },
  checkoutButton: {
    paddingVertical: 5,
    backgroundColor: CUSTOMCOLRS.ACCENT || "red",
    borderRadius: 8,
  },
  checkoutLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    color: "#333",
  },
  emptySubText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  shopButton: {
    backgroundColor: CUSTOMCOLRS.PRIMARY || "orange",
  },
});

export default CartScreen;
