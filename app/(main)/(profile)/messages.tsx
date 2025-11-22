import { messages } from "@/constants/Assets";
import { CUSTOMCOLRS } from "@/constants/Colors";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Card, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample messages data — all unread
const messagesData = messages;

const MessagesScreen = () => {
  const [messages] = useState(messagesData);

  return (
    <SafeAreaView style={styles.safeArea}>
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
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Messages</Text>

        {messages.map((msg) => (
          <Card key={msg.id} style={styles.card}>
            <Card.Title
              title={msg.sender}
              titleStyle={{ fontWeight: "600", color: CUSTOMCOLRS.TEXT_DARK }}
              left={(props) => (
                <Avatar.Text
                  {...props}
                  label={msg.sender[0]}
                  size={40}
                  style={{ backgroundColor: CUSTOMCOLRS.ACCENT }}
                  color={CUSTOMCOLRS.SURFACE}
                />
              )}
              subtitle={msg.text}
              subtitleNumberOfLines={1}
            />
          </Card>
        ))}

        {messages.length === 0 && (
          <View style={styles.noMessages}>
            <Text style={{ color: CUSTOMCOLRS.TEXT_DARK }}>
              No messages found.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessagesScreen;

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
  header: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: CUSTOMCOLRS.PRIMARY,
  },
  card: {
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: CUSTOMCOLRS.SURFACE, // White cards
  },
  noMessages: {
    marginTop: 50,
    alignItems: "center",
  },
});
