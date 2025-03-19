import { Tabs } from "expo-router";
import React from "react";
import { cn } from "~/lib/utils";
import { Text } from "~/components/ui/text";
import { NotebookPenIcon } from "~/lib/icons/NoteBookPen";
import { CalendarClockIcon } from "~/lib/icons/CalendarClock";
import { User } from "~/lib/icons/User";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function AnimatedTabIcon({
  focused,
  children,
}: {
  focused: boolean;
  children: React.ReactNode;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(focused ? 1.2 : 1, {
            damping: 10,
            stiffness: 100,
          }),
        },
      ],
      opacity: withTiming(focused ? 1 : 0.7, {
        duration: 200,
      }),
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

function AnimatedTabLabel({
  focused,
  label,
}: {
  focused: boolean;
  label: string;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(focused ? -3 : 0, {
            damping: 10,
            stiffness: 100,
          }),
        },
      ],
      opacity: withTiming(focused ? 1 : 0.7, {
        duration: 200,
      }),
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Text
        className={cn(
          "text-sm text-primary",
          focused ? "font-semibold" : "font-normal"
        )}
      >
        {label}
      </Text>
    </Animated.View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60 + (Platform.OS === "ios" ? insets.bottom : 0),
          paddingBottom: Platform.OS === "ios" ? insets.bottom : 8,
          paddingTop: 8,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarHideOnKeyboard: true,
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="logs"
        options={{
          title: "Logs",
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon focused={focused}>
              <CalendarClockIcon
                className={cn(
                  "h-7 w-7",
                  focused ? "color-primary" : "color-primary/70"
                )}
              />
            </AnimatedTabIcon>
          ),
          tabBarLabel: ({ focused }) => (
            <AnimatedTabLabel focused={focused} label="Past Logs" />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon focused={focused}>
              <NotebookPenIcon
                className={cn(
                  "h-7 w-7",
                  focused ? "color-primary" : "color-primary/70"
                )}
              />
            </AnimatedTabIcon>
          ),
          tabBarLabel: ({ focused }) => (
            <AnimatedTabLabel focused={focused} label="Log Mood" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon focused={focused}>
              <User
                className={cn(
                  "h-7 w-7",
                  focused ? "color-primary" : "color-primary/70"
                )}
              />
            </AnimatedTabIcon>
          ),
          tabBarLabel: ({ focused }) => (
            <AnimatedTabLabel focused={focused} label="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
