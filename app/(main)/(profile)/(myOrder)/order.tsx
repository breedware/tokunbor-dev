import { ORDERS } from "@/constants/Assets"; // adjust path
import { CUSTOMCOLRS } from "@/constants/Colors";
import { format } from "date-fns";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Badge, Card, Chip, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "#4CAF50"; // green
    case "Pending":
      return "#FFC107"; // yellow
    case "Cancel":
      return "#F44336"; // red
    default:
      return "#999";
  }
};

const OrderCard = ({ order }: { order: (typeof ORDERS)[0] }) => {
  const handleCancelOrder = () => {
    Alert.alert(
      "Cancel Order",
      `Order ${order.orderNumber} has been cancelled`
    );
  };

  const handleTrackOrder = () => {
    router.push('/myOrderStatus/[id]')
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.orderNumber}>{order.orderNumber}</Text>
        <Badge
          style={[
            styles.badge,
            { backgroundColor: getStatusColor(order.status) },
          ]}
        >
          {order.status}
        </Badge>
      </View>

      <Text style={styles.date}>
        {format(new Date(order.orderDate), "dd MMM yyyy")}
      </Text>

      <View style={styles.itemsContainer}>
        {order.orderItems.map((item, idx) => (
          <Image key={idx} source={item.image[0]} style={styles.itemImage} />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.total}>Items: {order.numberOfItems}</Text>
        <Text style={styles.total}>Total: ₦{order.orderTotal}</Text>
      </View>
      <TouchableOpacity
        style={{
          alignSelf: "center",
          width: "100%",
          backgroundColor: CUSTOMCOLRS.BACKGROUND,
          borderRadius: 10,
          paddingVertical: 5,
          marginVertical: 5,
        }}
        onPress={() => {
          router.push(`/myOrder/${order.orderNumber}`);
        }}
      >
        <Text
          style={{
            color: CUSTOMCOLRS.ACCENT,
            textAlign: "center",
            marginVertical: 5,
          }}
        >
          View Details
        </Text>
      </TouchableOpacity>
      {(order.status === "Pending" || order.status === "Delivered") && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.trackButton}
            onPress={handleTrackOrder}
          >
            <Text style={styles.buttonText}>Track Order</Text>
          </TouchableOpacity>
          {order.status === "Pending" && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelOrder}
            >
              <Text style={styles.buttonText}>Cancel Order</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </Card>
  );
};

const OrdersPage = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(
    "Pending"
  );

  const filteredOrders = selectedStatus
    ? ORDERS.filter((order) =>
        selectedStatus === "Cancelled"
          ? order.status === "Cancel"
          : order.status === selectedStatus
      )
    : ORDERS;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: CUSTOMCOLRS.BACKGROUND }}>
      <View style={styles.container}>
        <Text style={styles.title}>My Orders</Text>

        {/* Filter Chips */}
        <View style={styles.chipContainer}>
          {["Pending", "Delivered", "Cancelled"].map((status) => (
            <Chip
              key={status}
              mode={selectedStatus === status ? "flat" : "outlined"}
              selectedColor={selectedStatus === status ? "black" : undefined}
              textStyle={selectedStatus === status ? { color: "black" } : {}}
              selected={selectedStatus === status}
              onPress={() =>
                setSelectedStatus(selectedStatus === status ? null : status)
              }
              style={styles.chip}
            >
              {status}
            </Chip>
          ))}
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredOrders}
          keyExtractor={(item) => item.orderNumber}
          renderItem={({ item }) => <OrderCard order={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrdersPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOMCOLRS.BACKGROUND,
    padding: 16,
  },
  title: {
    color: CUSTOMCOLRS.PRIMARY,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  chip: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 8,
  },
  card: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderNumber: {
    color: CUSTOMCOLRS.PRIMARY,
    fontSize: 16,
    fontWeight: "600",
  },
  badge: {
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  itemsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 8,
    resizeMode: "cover",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  total: {
    fontSize: 14,
    color: CUSTOMCOLRS.PRIMARY,
    fontWeight: "600",
  },
  trackButton: {
    flex: 1,
    backgroundColor: CUSTOMCOLRS.ACCENT,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F44336",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "100%",
    marginTop: 8,
  },
});
