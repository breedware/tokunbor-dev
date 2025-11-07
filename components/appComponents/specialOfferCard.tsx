import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ProductCard from "./ProductsCard";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

interface SpecialOfferSectionProps {
  title?: string;
  products: Product[];
}

const SpecialOfferSection: React.FC<SpecialOfferSectionProps> = ({
  title = "Special Offer 🔥",
  products,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard item={item} />
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        snapToInterval={180} // Adjust depending on ProductCard width
        decelerationRate="fast"
      />
    </View>
  );
};

export default SpecialOfferSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  cardWrapper: {
    marginRight: 12,
  },
});
