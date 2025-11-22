import { CUSTOMCOLRS } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

const { width } = Dimensions.get("window");

const ProductCard = ({ item }: any) => {
  let navigation = useRouter();
  const handleProductPress = () => {
    // This is where your actual navigation code goes
    navigation.navigate(`/product/${item._id}`);
  };
  return (
    <View style={styles.dealCardWrapper}>
      {/* *** Added onPress handler: calls parent function with item.id *** */}
      <Card style={styles.dealCard} onPress={() => handleProductPress()}>
        <View style={styles.dealCardContent}>
          <Image
            source={
              item.image
                ? item.image[0]
                : { uri: "https://via.placeholder.com/150" }
            }
            style={styles.dealImage}
            resizeMode="contain"
          />

          <Text numberOfLines={2} style={styles.dealTitlePlaceholder}>
            {item.name || "Product Title Placeholder"}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>₦{item.price}</Text>
            <Text style={styles.oldPrice}>₦{item.oldPrice}</Text>
          </View>

          <Text style={styles.addToCart}>+ Add to Cart</Text>
        </View>
      </Card>
    </View>
  );
};
export default ProductCard;
let styles = StyleSheet.create({
  dealCardWrapper: {
    width: "50%",
    padding: 5,
  },
  dealCard: {
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    backgroundColor: "white",
  },
  dealCardContent: {
    padding: 8,
  },
  dealImage: {
    height: width * 0.45,
    width: "100%",
    resizeMode: "contain",
    backgroundColor: "#f9f9f9",
    marginVertical: 5,
    borderRadius: 5,
  },
  dealTitlePlaceholder: {
    fontSize: 14,
    minHeight: 36,
    lineHeight: 18,
    fontWeight: "500",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 5,
  },
  price: {
    color: CUSTOMCOLRS.TEXT_DARK,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  oldPrice: {
    color: "gray",
    fontSize: 12,
    textDecorationLine: "line-through",
  },
  addToCart: {
    marginTop: 5,
    color: CUSTOMCOLRS.ACCENT,
    fontWeight: "bold",
    fontSize: 12,
  },
});
