import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogsList } from "~/components/LogsList";
import { AnimatedScreen } from "~/components/AnimatedScreen";

export default function () {
  return (
    <SafeAreaView className="flex-1">
      <AnimatedScreen>
        <LogsList />
      </AnimatedScreen>
    </SafeAreaView>
  );
}
