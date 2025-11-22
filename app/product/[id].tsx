import { PRODUCTS } from "@/constants/Assets";
import { CUSTOMCOLRS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Card, Divider, Icon, Text } from "react-native-paper";

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [toShow, setToShow] = useState<string>("description");

  useEffect(() => {
    if (id) {
      const found = PRODUCTS.find((item) => String(item._id) === String(id));
      setProduct(found);
      setSelectedImage(found?.image?.[0] || null);
    }
  }, [id]);

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading product details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* --- BACK BUTTON --- */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={CUSTOMCOLRS.TEXT_DARK} />
      </TouchableOpacity>

      {/* Image Gallery */}
      <Card style={styles.imageCard}>
        <Image
          source={{uri: `${selectedImage}`}}
          style={styles.mainImage}
          resizeMode="contain"
        />
        <View style={styles.thumbnailRow}>
          {product.image.map((img: string, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImage(img)}
              style={[
                styles.thumbnailWrapper,
                selectedImage === img && styles.activeThumbnail,
              ]}
            >
              <Image source={{uri: img}} style={styles.thumbnail} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text variant="titleLarge" style={styles.name}>
          {product.name}
        </Text>

        {/* ⭐ Rating (using React Native Paper Icons) */}
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              key={star}
              source={star <= 4 ? "star" : "star-outline"}
              size={18}
              color="#FFD700"
              // style={{ marginRight: 2 }}
            />
          ))}
          <Text style={styles.ratingCount}>({product.reviews.length})</Text>
        </View>

        <Text variant="titleLarge" style={styles.price}>
          ₦{product.price}
        </Text>

        <Text style={styles.description}>{product.description}</Text>

        {/* Size Selection */}
        <View style={styles.sizeContainer}>
          <Text style={styles.sizeLabel}>Select Size</Text>
          <View style={styles.sizeOptions}>
            {product.sizes.map((size: string, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedSize(size)}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.activeSizeButton,
                ]}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.activeSizeText,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button
          mode="contained"
          style={styles.cartButton}
          onPress={() => console.log("Add to cart")}
        >
          Add to Cart
        </Button>

        <Divider style={{ marginVertical: 16 }} />

        <View style={styles.extraInfo}>
          <Text>✅ 100% Original product.</Text>
          <Text>💵 Cash on delivery available.</Text>
          <Text>🔄 Easy return within 7 days.</Text>
        </View>
      </View>

      {/* Description & Review Section */}
      <View style={styles.section}>
        <View style={styles.tabHeader}>
          <Text
            style={[
              styles.tabItem,
              toShow === "description" ? styles.activeTab : "",
            ]}
            onPress={() => setToShow("description")}
          >
            Description
          </Text>
          <Text
            style={[
              styles.tabItem,
              toShow === "reviews" ? styles.activeTab : "",
            ]}
            onPress={() => setToShow("reviews")}
          >
            Reviews ({product.reviews.length})
          </Text>
        </View>
        <View style={styles.tabContent}>
          {toShow === "description" ? (
            <Text style={{ color: "gray", lineHeight: 20 }}>
              {product.description}
            </Text>
          ) : product.reviews.length > 0 ? (
            product.reviews.map((review: unknown | any, index: number) => (
              <Card key={index} style={{ marginBottom: 12, padding: 12 }}>
                {/* Reviewer Name + Stars */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "600" }}>{review.name}</Text>

                  {/* ⭐ Dynamic Star Rating */}
                  <View style={{ flexDirection: "row" }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        source={i < review.ratings ? "star" : "star-outline"}
                        size={16}
                        color="#FFD700"
                        // style={{ marginRight: 2 }}
                      />
                    ))}
                  </View>
                </View>

                {/* Review Comment */}
                <Text style={{ marginTop: 8, color: "#444" }}>
                  {review.reviewText}
                </Text>
              </Card>
            ))
          ) : (
            <Text style={{ color: "gray" }}>No reviews yet.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },
  imageCard: { backgroundColor: "#fff", elevation: 1, marginTop: 20 },
  mainImage: { width: "100%", height: 350, backgroundColor: "#f8f8f8" },
  thumbnailRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  thumbnailWrapper: {
    borderWidth: 1,
    borderColor: "transparent",
    marginHorizontal: 5,
    borderRadius: 8,
  },
  activeThumbnail: { borderColor: CUSTOMCOLRS.ACCENT },
  thumbnail: { width: 60, height: 60, borderRadius: 8 },
  infoSection: { padding: 16 },
  name: { fontWeight: "600", marginBottom: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginVertical: 6 },
  ratingCount: { marginLeft: 4, color: "gray" },
  price: { fontWeight: "bold", marginVertical: 8 },
  description: { color: "gray", lineHeight: 20, marginBottom: 10 },
  sizeContainer: { marginVertical: 10 },
  sizeLabel: { fontWeight: "bold", marginBottom: 8 },
  sizeOptions: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  sizeButton: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  activeSizeButton: {
    borderColor: CUSTOMCOLRS.ACCENT,
    borderWidth: 1.5,
  },
  sizeText: { color: "#333" },
  activeSizeText: { color: CUSTOMCOLRS.ACCENT, fontWeight: "600" },
  cartButton: {
    marginTop: 8,
    backgroundColor: CUSTOMCOLRS.ACCENT,
  },
  extraInfo: { gap: 4, marginTop: 8 },
  section: { marginTop: 20, marginBottom: 40 },
  tabHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: "gray",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: CUSTOMCOLRS.ACCENT,
    color: CUSTOMCOLRS.ACCENT,
    fontWeight: "600",
  },
  tabContent: { padding: 16, color: "gray", lineHeight: 20 },
});

export default ProductDetails;
