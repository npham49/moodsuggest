import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedScreen } from "~/components/AnimatedScreen";
import { Text } from "~/components/ui/text";

export default function () {
  return (
    <SafeAreaView className="flex-1">
      <AnimatedScreen>
        <Text className="text-xl">Profile Screen</Text>
      </AnimatedScreen>
    </SafeAreaView>
  );
}
