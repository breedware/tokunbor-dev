import { CUSTOMCOLRS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const name = "Tolu WebDev";
  const email = "toluwebdev@example.com";
  let navigate = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Image */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?img=12",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigate.navigate("/order")}
          >
            <Ionicons name="cube-outline" size={22} color="#333" />
            <Text style={styles.menuText}>My Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/messages")}
            style={styles.menuItem}
          >
            <View style={{ position: "relative" }}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={22}
                color="#333"
              />
              {/* Badge */}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
            <Text style={styles.menuText}>Messages</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigate.navigate("/billingAdress")}
          >
            <Ionicons name="card-outline" size={22} color="#333" />
            <Text style={styles.menuText}>Billing Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="log-out-outline" size={22} color="#333" />
            <Text style={styles.menuText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    alignItems: "center",
    padding: 20,
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 30,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 16,
    minHeight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: CUSTOMCOLRS.TEXT_LIGHT,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1B1B1B",
  },
  email: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  editButton: {
    backgroundColor: CUSTOMCOLRS.ACCENT,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 15,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  menuSection: {
    width: "100%",
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
});
