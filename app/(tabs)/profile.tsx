import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { AnimatedScreen } from "~/components/AnimatedScreen";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { useDatabase } from "~/db/provider";
import { deleteAllData } from "~/db/services/app.service";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { db } = useDatabase();

  const handleDeleteAllData = async () => {
    if (!db) return;

    try {
      await deleteAllData(db);
      // Navigate back to the home screen
      router.replace("/");
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <AnimatedScreen>
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-2xl font-bold mb-8">Profile Screen</Text>
          <Button
            variant="destructive"
            onPress={handleDeleteAllData}
            className="w-full max-w-xs"
          >
            <Text className="text-white">Delete All Data</Text>
          </Button>
        </View>
      </AnimatedScreen>
    </SafeAreaView>
  );
}
