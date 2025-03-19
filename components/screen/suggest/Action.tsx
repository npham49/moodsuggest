import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Pressable, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { useDatabase } from "~/db/provider";
import { Action } from "~/db/schema";
import {
  getActionsWithMoodId,
  getAllActions,
} from "~/db/services/action.service";
import { X } from "~/lib/icons/X";

interface ActionSelectorProps {
  log: any;
  setLog: (arg0: any) => void;
  setCurrentPage: (arg0: any) => void;
  onSelectAction: (selectedAction?: Action) => void;
}

export default function ActionSelector({
  log,
  setLog,
  setCurrentPage,
  onSelectAction,
}: ActionSelectorProps) {
  const { db } = useDatabase();

  const {
    data: actionsWithMoodData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mood-w-action"],
    queryFn: async () => {
      if (!db) {
        throw new Error("Database not available");
      }
      if (!log.mood.id) {
        return [];
      }
      const response = await getActionsWithMoodId(db, log.mood.id);
      return response;
    },
  });

  const {
    data: allActions,
    isLoading: allLoading,
    error: allError,
  } = useQuery({
    queryKey: ["mood-w-action"],
    queryFn: async () => {
      if (!db) {
        throw new Error("Database not available");
      }
      if (!log.mood.id) {
        return [];
      }
      const response = await getAllActions(db);
      return response;
    },
  });

  const [query, setQuery] = React.useState("");
  const [filteredActions, setFilteredActions] = React.useState<Action[]>([]);

  function handleSearch(input: string) {
    setQuery(input);

    if (!allActions) {
      throw new Error("actions are undefined");
    }

    // Simple search: case-insensitive match
    const filteredResults = allActions.filter((item) =>
      item.action.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredActions(filteredResults);
  }

  React.useEffect(() => {
    // Pass the current values up to parent for handling
    if (query) {
      setLog((prevLog: any) => ({
        ...prevLog,
        pendingAction: query,
      }));
    }
  }, [query]);

  return (
    <View className="flex flex-col space-y-4 h-auto">
      {error || allError ? (
        <Text>Error: {error?.message ?? allError?.message}</Text>
      ) : null}
      <Text className="text-primary text-3xl">
        Let's help you figure out what to do
      </Text>
      <View className="flex flex-row w-full">
        <View className="flex-1">
          <Input
            value={query}
            onChangeText={handleSearch}
            placeholder="Enter your action"
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
          />
        </View>
        {query !== "" && (
          <View className="h-auto w-auto flex flex-row flex-wrap">
            <Button className="w-8 h-8 rounded-md" onPress={() => setQuery("")}>
              <X className="color-secondary" />
            </Button>
          </View>
        )}
      </View>
      {query === "" ? (
        <View>
          <Text>When you were feeling {log.mood.mood} previously, you...</Text>
          <View className="flex flex-row h-auto flex-wrap">
            {actionsWithMoodData?.map((action: Action) => (
              <Pressable
                onPress={() => onSelectAction(action)}
                key={action.id}
                className="p-2 border border-primary/40 rounded-lg mr-2"
              >
                <Text>{action.action}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : (
        <View>
          <View className="flex flex-row">
            {filteredActions.length > 0 ? (
              filteredActions.map((action: Action) => (
                <Pressable
                  onPress={() => onSelectAction(action)}
                  key={action.id}
                  className="p-2 border border-primary/40 rounded-lg mr-2"
                >
                  <Text>{action.action}</Text>
                </Pressable>
              ))
            ) : (
              <Pressable
                onPress={() => onSelectAction()}
                className="w-full h-auto mt-4 p-4 bg-primary rounded-md"
              >
                <Text className="text-primary-foreground text-center text-lg">
                  Add {query} as a new action when feeling {log.mood.mood}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      )}
    </View>
  );
}
