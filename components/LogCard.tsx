import React from "react";
import { View } from "react-native";
import { Text } from "./ui/text";
import { Card } from "./ui/card";
import { logsTable } from "~/db/schema";

type Log = typeof logsTable.$inferSelect;

interface LogCardProps {
  log: Log;
  mood?: string | null;
  action?: string | null;
  subject?: string | null;
  location?: string | null;
}

export function LogCard({
  log,
  mood,
  action,
  subject,
  location,
}: LogCardProps) {
  return (
    <Card className="w-full mb-4">
      <View className="p-4">
        <View className="flex flex-row justify-between items-center mb-2">
          <Text className="text-xl font-semibold">{mood ?? ""}</Text>
          <Text className="text-sm text-gray-500">
            {new Date(log.createdAt!).toLocaleString()}
          </Text>
        </View>
        <Text className="text-lg mb-2">→ {action ?? ""}</Text>
        {(subject || location) && (
          <View className="flex flex-row flex-wrap">
            {subject && (
              <Text className="text-base text-gray-700">with {subject}</Text>
            )}
            {location && (
              <Text className="text-base text-gray-700">
                {subject ? " at " : "at "}
                {location}
              </Text>
            )}
          </View>
        )}
        {log.note && (
          <View className="mt-2 p-2 bg-gray-100 rounded-md">
            <Text className="text-gray-600">{log.note}</Text>
          </View>
        )}
        {log.ratings && (
          <View className="mt-2">
            <Text className="text-gray-600">Rating: {log.ratings}/5</Text>
          </View>
        )}
      </View>
    </Card>
  );
}
