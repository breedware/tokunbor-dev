import { OrderInterface, ORDERS } from "@/constants/Assets";
import { CUSTOMCOLRS } from "@/constants/Colors";
import { format } from "date-fns";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Card,
  Divider,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const MyOrders = () => {
  let { id } = useLocalSearchParams();
  let [data, setData] = useState<OrderInterface | null>(null);

  const [visible, setVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  useEffect(() => {
    const order = ORDERS.find((order) => order.orderNumber === id);
    setData(order || null);
  }, [id]);
  console.log(data);
  const openModal = (order: any) => {
    setSelectedOrder(order);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setRating(0);
    setComment("");
  };

  const submitReview = () => {
    console.log("Review Submitted:", {
      orderId: (selectedOrder as any).id,
      rating,
      comment,
    });

    closeModal();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* BACK BUTTON */}
      <TouchableOpacity
        style={styles.backButtonWrapper}
        onPress={() => router.back()}
      >
        <IconButton
          icon="arrow-left"
          size={22}
          iconColor={CUSTOMCOLRS.TEXT_DARK}
          onPress={() => router.back()}
        />
      </TouchableOpacity>

      {/* ORDERS LIST */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text variant="headlineSmall" style={styles.title}>
          {data?.orderNumber}
        </Text>
        <Text
          variant="headlineSmall"
          style={{ marginBottom: 16, color: CUSTOMCOLRS.ACCENT }}
        >
          NO of Products: {data?.orderItems.length}
        </Text>

        {data?.orderItems.map((order) => (
          <Card key={order._id} style={styles.card}>
            <Card.Title
              titleStyle={{ color: CUSTOMCOLRS.PRIMARY }}
              subtitleStyle={{ color: CUSTOMCOLRS.PRIMARY }}
              title={order.name}
              subtitle={`Order ID: #${order._id}`}
            />
            <Card.Cover
              source={{uri: order.image[0]}}
              style={styles.productImage}
              resizeMode="contain"
            />

            <Card.Content>
              <Text style={styles.price}>₦{order.price}</Text>
              <Text style={styles.status}>
                Status: <Text style={styles.statusValue}>{data.status}</Text>
              </Text>
              <Text style={styles.date}>
                Order Date:
                <Text style={styles.statusValue}>
                  {" "}
                  {format(new Date(data.orderDate), "dd MMM yyyy")}
                </Text>
              </Text>
            </Card.Content>

            <Divider style={{ marginVertical: 10 }} />

            <Card.Actions style={styles.actions}>
              <Button mode="outlined" textColor={CUSTOMCOLRS.ACCENT}>
                Track Order
              </Button>

              {data.status === "Delivered" && (
                <Button
                  mode="contained"
                  buttonColor={CUSTOMCOLRS.ACCENT}
                  textColor="white"
                  onPress={() => openModal(order)}
                >
                  Add Review
                </Button>
              )}
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>

      {/* MODAL */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={closeModal}
          contentContainerStyle={styles.modalContainer}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
          >
            <ScrollView>
              <Text variant="titleMedium" style={styles.modalTitle}>
                Rate Your Order
              </Text>

              {/* STAR RATING */}
              <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <IconButton
                    key={num}
                    icon={num <= rating ? "star" : "star-outline"}
                    size={35}
                    iconColor={CUSTOMCOLRS.ACCENT}
                    onPress={() => setRating(num)}
                  />
                ))}
              </View>

              {/* COMMENT FIELD */}
              <TextInput
                mode="outlined"
                label="Write a review"
                outlineColor="black"
                activeOutlineColor="black"
                textColor="black"
                value={comment}
                onChangeText={setComment}
                style={{ marginTop: 10, backgroundColor: "transparent" }}
              />

              {/* BUTTONS */}
              <Button
                mode="contained"
                buttonColor={CUSTOMCOLRS.ACCENT}
                onPress={submitReview}
                style={{ marginTop: 20 }}
              >
                Submit Review
              </Button>

              <Button
                mode="text"
                onPress={closeModal}
                style={{ marginTop: 10 }}
              >
                Cancel
              </Button>
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: CUSTOMCOLRS.BACKGROUND },
  backButtonWrapper: {
    position: "absolute",
    marginTop: 10,
    top: 10,
    left: 10,
    zIndex: 1000,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 10,
  },
  container: { padding: 16 },
  title: {
    fontWeight: "700",
    marginBottom: 16,
    color: CUSTOMCOLRS.PRIMARY,
    marginTop: 40,
  },
  card: {
    marginBottom: 20,
    backgroundColor: CUSTOMCOLRS.SURFACE,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  productImage: { height: 180, backgroundColor: "#f5f5f5" },
  price: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 8,
    color: CUSTOMCOLRS.PRIMARY,
  },
  status: { marginTop: 4, color: "gray" },
  statusValue: { color: CUSTOMCOLRS.ACCENT, fontWeight: "600" },
  date: { marginTop: 4, fontSize: 12, color: "gray" },
  actions: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 12,
    paddingBottom: 40,
  },
  modalTitle: {
    textAlign: "center",
    color: CUSTOMCOLRS.PRIMARY,
    fontWeight: "700",
    marginBottom: 10,
  },
  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default MyOrders;
