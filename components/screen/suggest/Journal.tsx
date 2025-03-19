import React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Textarea } from "~/components/ui/textarea";

export default function Journal({
  log,
  setLog,
  setCurrentPage,
}: {
  log: any;
  setLog: (arg0: any) => void;
  setCurrentPage: (arg0: any) => void;
}) {
  const [journal, setJournal] = React.useState("");
  const [rating, setRating] = React.useState(0);

  React.useEffect(() => {
    // Pass the current values up to parent for handling
    setLog((prevLog: any) => ({
      ...prevLog,
      pendingJournal: journal || undefined,
      pendingRating: rating || undefined,
    }));
  }, [journal, rating]);

  return (
    <View className="flex flex-col space-y-4 h-auto">
      <Text className="text-primary text-3xl">
        Review and add your comments! This can also be done later
      </Text>
      <Textarea
        value={journal}
        onChangeText={setJournal}
        placeholder="Write your thoughts here"
        aria-labelledby="inputLabel"
        aria-errormessage="inputError"
      />
    </View>
  );
}
