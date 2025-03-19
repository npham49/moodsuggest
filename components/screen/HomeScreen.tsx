import { View } from "react-native";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View>
      <Card className="w-full max-w-md">
        <CardHeader>
          <Text className=" text-3xl font-bold">
            Want some suggestions on what to do?
          </Text>
        </CardHeader>
        <CardContent>
          <Button
            onPress={() => {
              router.push("/suggest");
            }}
          >
            <Text>Let's log your mood!</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
