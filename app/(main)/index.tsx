import BannerAdvert from "@/components/appComponents/bannerAdvert";
import ProductCard from "@/components/appComponents/ProductsCard";
import { PRODUCTS } from "@/constants/Assets";
import { CUSTOMCOLRS } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Appbar, Chip, Searchbar, Text } from "react-native-paper";

// Corrected interface to match the function signature
interface FixedHeaderProps {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

// --- Mock Data & Constants ---
const categories = [
  "All",
  "Women",
  "Home",
  "Men",
  "Sports",
  "Jewelry",
  "Electronics",
  "Garden",
];

const mockDeals = PRODUCTS;

// --- Components ---

// Updated DealCard to accept and use onProductPress prop

// --- Main Component ---

const index = () => {
  let hotDeals = mockDeals.slice(0, 4);
  let [searchQuery, setSearchQuery] = useState("");
  let [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDeals = useMemo(() => {
    let currentDeals = mockDeals;

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentDeals = currentDeals.filter(
        // Assuming the product title property is 'name' based on DealCard usage
        (deal) => deal.name.toLowerCase().includes(lowerCaseQuery)
      );
    }

    if (selectedCategory !== "All") {
      currentDeals = currentDeals.filter(
        (deal) => deal.category === selectedCategory
      );
    }

    // Duplicating the list to ensure scrolling is possible
    return [...currentDeals, ...currentDeals];
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <SafeAreaView style={styles.view}>
        <View style={styles.fixedHeader}>
          {/* Searchbar Row */}
          <View style={styles.searchBarRow}>
            <Searchbar
              placeholder="Search...."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchbar}
              // Moved the magnifying glass inside the icon prop
              icon={() => <Appbar.Action icon="magnify" color="gray" />}
              inputStyle={{ minHeight: 0, paddingHorizontal: 0 }}
            />
            <Appbar.Action
              icon="camera-outline"
              color="gray"
              size={24}
              onPress={() => console.log("Camera Pressed")}
            />
            {/* The second magnify icon is redundant here, removed for cleaner UI. */}
          </View>

          {/* Filter Chips/Category Bar Row - Horizontally Scrollable and Fixed */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Chip
                key={item}
                style={[
                  styles.chip,
                  item === selectedCategory
                    ? {
                        backgroundColor: CUSTOMCOLRS.BACKGROUND,
                        borderColor: CUSTOMCOLRS.PRIMARY,
                      }
                    : { backgroundColor: "#f1f1f1", borderColor: "#ccc" },
                ]}
                mode={item === selectedCategory ? "flat" : "outlined"}
                onPress={() => setSelectedCategory(item)}
                textStyle={
                  item === selectedCategory
                    ? { color: CUSTOMCOLRS.TEXT_DARK }
                    : { color: "black" }
                }
              >
                {item}
              </Chip>
            )}
            contentContainerStyle={styles.categoryBarContainer}
          />

          {/* Info Banners (Free shipping/Return) */}
          <View style={styles.infoBannersRow}>
            <View
              style={[styles.infoBannerItem, { backgroundColor: "#e9fbe9" }]}
            >
              <AntDesign name="check-circle" size={16} color="green" />
              <Text style={[styles.infoBannerText, { color: "green" }]}>
                Free shipping
              </Text>
            </View>
            <View
              style={[styles.infoBannerItem, { backgroundColor: "#f9f9f9" }]}
            >
              <AntDesign name="retweet" size={16} color="gray" />
              <Text style={[styles.infoBannerText, { color: "#333" }]}>
                Return within 90d
              </Text>
            </View>
          </View>
        </View>

        <FlatList
          data={filteredDeals}
          // Assuming your product objects have an 'id' property. If they use '_id', change this line.
          keyExtractor={(item, index) => `${item._id}-${index}`}
          // *** Pass the navigation handler here ***
          renderItem={({ item }) => <ProductCard item={item} />}
          ListHeaderComponent={() => (
            <>
              {!searchQuery || selectedCategory !== "All" ? (
                <BannerAdvert />
              ) : (
                ""
              )}

              <Text
                style={{ marginLeft: "10", fontWeight: "700", fontSize: "20" }}
              >
                Products
              </Text>
            </>
          )}
          numColumns={2}
          contentContainerStyle={styles.dealsGrid}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No deals found for this category.
              </Text>
            </View>
          )}
          ListFooterComponent={() => (
            <>
              <View style={styles.placeholderSection}>
                <Text style={styles.placeholderText}>
                  Earn credits & Free gifts{" "}
                </Text>
              </View>
              <View style={styles.placeholderSection}>
                <Text style={styles.placeholderText}>
                  More Deals and Content Here...
                </Text>
              </View>
            </>
          )}
        />
      </SafeAreaView>
    </>
  );
};

// --- Styles (Omitted for brevity, assuming they are correct from the previous step) ---

let styles = StyleSheet.create({
  // ... all your styles go here
  view: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  fixedHeader: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  searchBarRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchbar: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
    marginRight: 5,
  },
  categoryBarContainer: {
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  chip: {
    marginRight: 8,
    height: 30,
    justifyContent: "center",
    borderRadius: 15,
    paddingHorizontal: 0,
    borderColor: "#ccc",
  },
  infoBannersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  infoBannerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 4,
    minHeight: 30,
    justifyContent: "center",
  },
  infoBannerText: {
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 12,
  },
  dealsGrid: {
    paddingHorizontal: 5,
    paddingTop: 10,
  },

  lightningPill: {
    backgroundColor: "#ffdddd",
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 6,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  lightningText: {
    color: CUSTOMCOLRS.TEXT_DARK,
    fontWeight: "bold",
    fontSize: 12,
  },

  placeholderSection: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  placeholderText: {
    fontWeight: "bold",
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
  specialOfferContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  specialOfferHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  specialOfferTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: CUSTOMCOLRS.TEXT_DARK,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "600",
    color: CUSTOMCOLRS.ACCENT,
  },
  specialOfferList: {
    paddingBottom: 10,
  },
});

export default index;
