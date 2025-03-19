import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, View, RefreshControl } from "react-native";
import { useDatabase } from "~/db/provider";
import { LogCard } from "./LogCard";
import { Text } from "./ui/text";
import { getLogsWithRelations } from "~/db/services/log.service";

export function LogsList() {
  const { db } = useDatabase();

  const {
    data: logs,
    error,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      if (!db) throw new Error("Database not available");
      return getLogsWithRelations(db);
    },
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading logs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No logs found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={logs}
      keyExtractor={(item) => item.logs.id}
      renderItem={({ item }) => (
        <LogCard
          log={item.logs}
          mood={item.moods?.mood}
          action={item.actions?.action}
          subject={item.subjects?.name}
          location={item.locations?.name}
        />
      )}
      contentContainerStyle={{ padding: 16 }}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
          tintColor="#4B5563" // matches the app's color scheme
        />
      }
    />
  );
}
