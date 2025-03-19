import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedScreen } from "~/components/AnimatedScreen";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function () {
  return (
    <SafeAreaView className="flex-1">
      <AnimatedScreen>
        <View className="flex-1 justify-center items-center p-4">
          <Text>Let's find you some sugestions on what to do!</Text>
          <Button onPress={() => router.push("/suggest")}>
            <Text>Start New Log</Text>
          </Button>
        </View>
      </AnimatedScreen>
    </SafeAreaView>
  );
}
