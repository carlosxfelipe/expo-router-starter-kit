import { HapticTab } from "@/components/HapticTab";
import { MCIcons } from "@/components/ui/MCIcons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const getIconName = (route: string, focused: boolean) => {
  switch (route) {
    case "home":
      return focused ? "home" : "home-outline";
    case "orders":
      return focused ? "shopping" : "shopping-outline";
    case "profile":
      return focused ? "account" : "account-outline";
    default:
      return "circle";
  }
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].text,
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: Colors[colorScheme ?? "light"].background,
            borderTopWidth: 0,
          },
          default: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
            borderTopWidth: 0,
          },
        }),
        tabBarIcon: ({ color, size, focused }) => (
          <MCIcons
            name={getIconName(route.name, focused)}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Início" }} />
      <Tabs.Screen name="orders" options={{ title: "Pedidos" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
