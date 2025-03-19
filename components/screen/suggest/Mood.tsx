import React from "react";
import { Keyboard, Pressable, View } from "react-native";
import { Mood } from "~/db/schema";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { X } from "~/lib/icons/X";
import { Button } from "~/components/ui/button";
import { EmojiModal } from "react-native-emojis-picker";
import { useQuery } from "@tanstack/react-query";
import { getAllMoods } from "~/db/services/mood.service";
import { useDatabase } from "~/db/provider";

interface MoodSelectorProps {
  log: any;
  setLog: (arg0: any) => void;
  setCurrentPage: (arg0: any) => void;
  onSelectMood: (selectedMood?: Mood) => void;
}

export default function MoodSelector({
  log,
  setLog,
  setCurrentPage,
  onSelectMood,
}: MoodSelectorProps) {
  const { db } = useDatabase();

  const { data: moods, error } = useQuery({
    queryKey: ["moods"],
    queryFn: async () => {
      if (db) {
        const response = await getAllMoods(db);
        if (response) {
          return response;
        } else {
          throw new Error("Failed to get moods");
        }
      } else {
        throw new Error("Database not initialized");
      }
    },
  });

  const [query, setQuery] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [emoji, setEmoji] = React.useState("😊");

  const [filteredMoods, setFilteredMoods] = React.useState<Mood[]>([]);

  function handleSearch(input: string) {
    setQuery(input);

    if (!moods) {
      throw new Error("moods are undefined");
    }

    // Simple search: case-insensitive match
    const filteredResults = moods.filter((item) =>
      item.mood.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredMoods(filteredResults);
  }

  React.useEffect(() => {
    // Pass the current values up to parent for handling
    if (query) {
      setLog((prevLog: any) => ({
        ...prevLog,
        pendingMood: {
          text: query,
          emoji: emoji,
        },
      }));
    }
  }, [query, emoji]);

  if (!moods) {
    return <Text>Error</Text>;
  }

  return (
    <View className="flex flex-col space-y-4 h-auto">
      {error ? <Text>Error: {error.message}</Text> : null}
      <Text className="text-primary text-3xl">How are you feeling?</Text>
      <View className="flex flex-row w-full">
        <View className="flex-1">
          <Input
            value={query}
            onChangeText={handleSearch}
            placeholder="Enter your mood"
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
          />
        </View>

        {query !== "" && (
          <View className="h-auto w-auto flex flex-row flex-wrap">
            {filteredMoods.length === 0 && (
              <View className="w-10 h-full rounded-md items-center pt-2 px-1 bg-background">
                <Text
                  className="text-3xl"
                  onPress={() => {
                    Keyboard.dismiss();
                    setShowModal(true);
                  }}
                >
                  {emoji}
                </Text>
              </View>
            )}

            {showModal && (
              <EmojiModal
                onPressOutside={() => setShowModal(false)}
                onEmojiSelected={(emoji: string) => {
                  setShowModal(false);
                  setEmoji(emoji);
                }}
              />
            )}
            <Button className="w-8 h-8 rounded-md" onPress={() => setQuery("")}>
              <X className="color-secondary" />
            </Button>
          </View>
        )}
      </View>
      {query === "" ? (
        <View>
          <Text>Here are some moods you have logged before:</Text>
          <View className="flex flex-row h-auto flex-wrap">
            {moods.map((mood: Mood) => (
              <Pressable
                onPress={() => onSelectMood(mood)}
                key={mood.id}
                className="p-2 border border-primary/40 rounded-lg mr-2"
              >
                <Text>{mood.mood}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : (
        <View>
          <View className="flex flex-row">
            {filteredMoods.length > 0 ? (
              filteredMoods.map((mood: Mood) => (
                <Pressable
                  onPress={() => onSelectMood(mood)}
                  key={mood.id}
                  className="p-2 border border-primary/40 rounded-lg mr-2"
                >
                  <Text>{mood.mood}</Text>
                </Pressable>
              ))
            ) : (
              <Button onPress={() => onSelectMood()} className="w-full mt-4">
                <Text>
                  Add {query} {emoji} as a new mood{" "}
                </Text>
              </Button>
            )}
          </View>
        </View>
      )}
    </View>
  );
}
