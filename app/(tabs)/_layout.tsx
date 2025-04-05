import { Tabs } from "expo-router";
import React from "react";
import { CalendarClockIcon } from "~/lib/icons/CalendarClock";
import { NotebookPenIcon } from "~/lib/icons/NoteBookPen";
import { User } from "~/lib/icons/User";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60 + 0,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        },
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#4F46E5B3",
      }}
    >
      <Tabs.Screen
        name="logs"
        options={{
          title: "Past Logs",
          tabBarIcon: ({ focused }) => (
            <CalendarClockIcon
              className={`h-7 w-7 ${
                focused ? "color-primary" : "color-primary/70"
              }`}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Log Mood",
          tabBarIcon: ({ focused }) => (
            <NotebookPenIcon
              className={`h-7 w-7 ${
                focused ? "color-primary" : "color-primary/70"
              }`}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <User
              className={`h-7 w-7 ${
                focused ? "color-primary" : "color-primary/70"
              }`}
            />
          ),
        }}
      />
    </Tabs>
  );
}
