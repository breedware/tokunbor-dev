import { CUSTOMCOLRS } from "@/constants/Colors";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: "1",
    title: "🔥 Big November Sale",
    subtitle: "Up to 60% off electronics & fashion!",
    image:
      "https://img.freepik.com/free-vector/modern-sale-banner-with-photo_23-2147960282.jpg",
  },
  {
    id: "2",
    title: "🎁 New Arrivals",
    subtitle: "Shop trending items this week",
    image:
      "https://img.freepik.com/free-vector/fashion-sale-banner-template_23-2148688762.jpg",
  },
  {
    id: "3",
    title: "💎 Premium Picks",
    subtitle: "Exclusive deals for members",
    image:
      "https://img.freepik.com/free-vector/gradient-shopping-discount-banner_23-2149125753.jpg",
  },
];

const BannerAdvert = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Automatically scroll the banners
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * (width - 30),
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 4000); // Every 4 seconds

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(
            e.nativeEvent.contentOffset.x / (width - 30)
          );
          setActiveIndex(newIndex);
        }}
        style={styles.container}
      >
        {banners.map((banner) => (
          <View
            key={banner.id}
            style={[styles.bannerCard, { width: width - 30 }]}
          >
            <Image
              source={{ uri: banner.image }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <View style={styles.overlay}>
              <Text style={styles.title}>{banner.title}</Text>
              <Text style={styles.subtitle}>{banner.subtitle}</Text>
              <Button
                mode="contained"
                buttonColor={CUSTOMCOLRS.PRIMARY}
                textColor="#fff"
                style={styles.button}
              >
                Shop Now
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Indicator dots */}
      <View style={styles.indicatorContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicatorDot,
              { opacity: activeIndex === index ? 1 : 0.3 },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default BannerAdvert;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginBottom: 15,
  },
  container: {},
  bannerCard: {
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 5,
  },
  bannerImage: {
    width: "100%",
    height: 180,
    borderRadius: 15,
  },
  overlay: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 12,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 8,
  },
  button: {
    alignSelf: "flex-start",
    borderRadius: 8,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: CUSTOMCOLRS.PRIMARY,
    marginHorizontal: 4,
  },
});
