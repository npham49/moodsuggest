import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingIllustration } from "~/components/OnboardingIllustration";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useDatabase } from "~/db/provider";
import { initializeApp, isAppInitialized } from "~/db/services/app.service";

export default function () {
  const { db } = useDatabase();
  const [isInitializing, setIsInitializing] = React.useState(false);

  async function handleGetStarted() {
    if (!db) return;

    setIsInitializing(true);
    try {
      await initializeApp(db);
      router.replace("/(tabs)/logs");
    } catch (error) {
      console.error("Error initializing app:", error);
    } finally {
      setIsInitializing(false);
    }
  }

  React.useEffect(() => {
    const checkInitialization = async () => {
      const isAppInit = await isAppInitialized();
      // if (isAppInit) {
      //   router.push("/(tabs)/logs");
      // }
    };
    checkInitialization();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center p-8">
        <OnboardingIllustration />
        <View className="mt-8 space-y-4 w-full max-w-md">
          <Text className="text-3xl font-bold text-center">
            Welcome to MoodSuggest
          </Text>
          <Text className="text-lg text-gray-600 text-center">
            Your personal mood companion that helps you discover activities
            tailored to how you feel.
          </Text>
          <Button
            onPress={handleGetStarted}
            disabled={isInitializing}
            className="w-full mt-4"
          >
            <Text className="text-primary-foreground">
              {isInitializing ? "Setting up..." : "Get Started"}
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
