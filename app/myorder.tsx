import { PRODUCTS } from "@/constants/Assets";
import { CUSTOMCOLRS } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Card, Divider, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const dummyOrders = [
  {
    id: "1",
    name: PRODUCTS[0].name,
    image: PRODUCTS[0].image[0],
    price: PRODUCTS[0].price,
    date: "Nov 3, 2025",
    status: "Delivered",
  },
  {
    id: "2",
    name: PRODUCTS[1].name,
    image: PRODUCTS[1].image[0],
    price: PRODUCTS[1].price,
    date: "Nov 5, 2025",
    status: "Shipped",
  },
];

const MyOrders = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Back Button */}
      <IconButton
        icon="arrow-left"
        size={22}
        onPress={() => router.back()}
        style={styles.backButton}
        iconColor={CUSTOMCOLRS.TEXT_DARK}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text variant="headlineSmall" style={styles.title}>
          My Orders
        </Text>

        {dummyOrders.map((order) => (
          <Card key={order.id} style={styles.card}>
            <Card.Title
              title={order.name}
              subtitle={`Order ID: #${order.id}`}
            />
            <Card.Cover
              source={order.image}
              style={styles.productImage}
              resizeMode="contain"
            />
            <Card.Content>
              <Text style={styles.price}>₦{order.price}</Text>
              <Text style={styles.status}>
                Status: <Text style={styles.statusValue}>{order.status}</Text>
              </Text>
              <Text style={styles.date}>Ordered on {order.date}</Text>
            </Card.Content>

            <Divider style={{ marginVertical: 8 }} />

            <Card.Actions style={styles.actions}>
              <Button
                mode="outlined"
                textColor={CUSTOMCOLRS.ACCENT}
                onPress={() => console.log("Track order")}
              >
                Track Order
              </Button>

              {order.status === "Delivered" && (
                <Button
                  mode="contained"
                  buttonColor={CUSTOMCOLRS.ACCENT}
                  onPress={() => console.log("Add review")}
                >
                  Add Review
                </Button>
              )}
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff", marginTop: 2 },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontWeight: "700", marginBottom: 16, color: CUSTOMCOLRS.TEXT_DARK },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  productImage: {
    backgroundColor: "#f8f8f8",
    height: 180,
  },
  price: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 8,
  },
  status: { marginTop: 4, color: "gray" },
  statusValue: { color: CUSTOMCOLRS.ACCENT, fontWeight: "600" },
  date: { marginTop: 4, color: "gray", fontSize: 12 },
  actions: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 8,
  },
});

export default MyOrders;
