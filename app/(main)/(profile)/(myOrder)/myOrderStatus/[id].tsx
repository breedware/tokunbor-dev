import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import {
  MD3LightTheme,
  Provider as PaperProvider,
  Text,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Custom Theme Colors extracted from the image
const COLORS = {
  background: "#F5F5F5",
  teal: "#70aabf", // The blue-ish color for past events
  green: "#7cb443", // The green color for delivery
  textDark: "#333333",
  textLight: "#FFFFFF",
  lineColor: "#70aabf", // Matches the teal
};

const timelineData = [
  { title: "ORDER PLACED", date: "22-10", status: "completed" },
  { title: "PENDING CONFIRMATION", date: "22-10", status: "completed" },
  { title: "WAITING TO BE SHIPPED", date: "22-10", status: "completed" },
  { title: "SHIPPED", date: "23-10", status: "completed" },
  { title: "AVAILABLE FOR PICKUP", date: "24-10", status: "completed" },
  { title: "DELIVERED", date: "25-10", status: "current" },
];

const TimelineItem = ({ item, isLast }) => {
  // Determine styles based on status
  const isCurrent = item.status === "current";
  const activeColor = isCurrent ? COLORS.green : COLORS.teal;

  return (
    <View style={styles.itemContainer}>
      {/* Left Column: Icon and Line */}
      <View style={styles.leftColumn}>
        {/* The Icon Circle */}
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: isCurrent ? "transparent" : activeColor,
              borderColor: activeColor,
              borderWidth: isCurrent ? 0 : 0,
            },
          ]}
        >
          {isCurrent ? (
            // The Green Ring Icon for current status
            <MaterialCommunityIcons
              name="record-circle-outline"
              size={28}
              color={activeColor}
              style={{ backgroundColor: "white", borderRadius: 15 }}
            />
          ) : (
            // The Checkmark for past status
            <MaterialCommunityIcons name="check" size={16} color="white" />
          )}
        </View>

        {/* The Vertical Line */}
        {!isLast && (
          <View
            style={[styles.verticalLine, { backgroundColor: COLORS.teal }]}
          />
        )}
      </View>

      {/* Right Column: Content */}
      <View style={styles.rightColumn}>
        {/* The Label Badge */}
        <View style={[styles.labelBadge, { backgroundColor: activeColor }]}>
          <Text style={styles.labelText}>{item.title}</Text>
        </View>

        {/* The Date */}
        <Text variant="bodyMedium" style={styles.dateText}>
          {item.date}
        </Text>

        {/* Extra text for the specific Delivered item */}
        {isCurrent && (
          <Text variant="bodySmall" style={styles.helperText}>
            Your item/order has been delivered.
          </Text>
        )}
      </View>
    </View>
  );
};

const StatusPage = () => {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <SafeAreaView style={styles.screen}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text variant="titleLarge" style={styles.headerTitle}>
            Item status
          </Text>
        </View>

        {/* Timeline List */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                isLast={index === timelineData.length - 1}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontWeight: "bold",
    color: "#333",
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    // Optional: Add card styling if you want it to look elevated like the screenshot header might imply,
    // but the screenshot shows a clean white background list.
  },
  itemContainer: {
    flexDirection: "row",
    minHeight: 70, // Ensures space for the line to grow
  },
  leftColumn: {
    width: 40,
    alignItems: "center",
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 20, // Space between items
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Keep icon on top of the line
  },
  verticalLine: {
    width: 3,
    flex: 1,
    marginTop: -2, // Slight overlap to ensure connection
    marginBottom: -2,
  },
  labelBadge: {
    alignSelf: "flex-start", // Wrap width to text content
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  labelText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  dateText: {
    color: "#333",
    fontWeight: "bold",
  },
  helperText: {
    color: "#666",
    marginTop: 4,
  },
});

export default StatusPage;
