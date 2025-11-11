import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  Text,
  IconButton,
  FAB,
  Portal,
  Modal,
  TextInput,
  Button,
} from "react-native-paper";
import { CUSTOMCOLRS } from "@/constants/Colors";

interface Address {
  id: string;
  label: string; // e.g. “Home”
  fullAddress: string;
}

const BillingAddressScreen = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: "1", label: "Home", fullAddress: "123 Main Street, Lagos, NG" },
    { id: "2", label: "Office", fullAddress: "45 Business Ave, Ikeja, NG" },
  ]);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");

  const openAdd = () => {
    setEditing(null);
    setLabel("");
    setAddress("");
    setVisible(true);
  };

  const openEdit = (item: Address) => {
    setEditing(item);
    setLabel(item.label);
    setAddress(item.fullAddress);
    setVisible(true);
  };

  const saveAddress = () => {
    if (!label || !address) return;
    if (editing) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editing.id ? { ...a, label, fullAddress: address } : a
        )
      );
    } else {
      const newAddr: Address = {
        id: Date.now().toString(),
        label,
        fullAddress: address,
      };
      setAddresses((prev) => [newAddr, ...prev]);
    }
    setVisible(false);
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineSmall" style={styles.header}>
        Billing Addresses
      </Text>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.address}>{item.fullAddress}</Text>
            </Card.Content>
            <Card.Actions style={styles.actions}>
              <IconButton
                icon="pencil"
                size={20}
                onPress={() => openEdit(item)}
              />
              <IconButton
                icon="delete"
                size={20}
                onPress={() => deleteAddress(item.id)}
              />
            </Card.Actions>
          </Card>
        )}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={openAdd}
        color="white"
      />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>
            {editing ? "Edit Address" : "Add New Address"}
          </Text>
          <TextInput
            label="Label (e.g. Home)"
            value={label}
            onChangeText={setLabel}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Full Address"
            value={address}
            onChangeText={setAddress}
            mode="outlined"
            multiline
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={saveAddress}
            buttonColor={CUSTOMCOLRS.PRIMARY}
          >
            Save
          </Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

export default BillingAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
  },
  header: {
    fontWeight: "700",
    marginVertical: 12,
  },
  card: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
  },
  address: {
    color: "gray",
    marginTop: 2,
  },
  actions: {
    justifyContent: "flex-end",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: CUSTOMCOLRS.ACCENT,
  },
  modalContainer: {
    backgroundColor: "white",
    margin: 24,
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    marginBottom: 12,
  },
});
