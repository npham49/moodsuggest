import React from "react";
import { View } from "react-native";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";

export default function SubjectLocation({
  log,
  setLog,
  setCurrentPage,
}: {
  log: any;
  setLog: (arg0: any) => void;
  setCurrentPage: (arg0: any) => void;
}) {
  const [subject, setSubject] = React.useState("");
  const [location, setLocation] = React.useState("");

  React.useEffect(() => {
    // Pass the current values up to parent for handling
    setLog((prevLog: any) => ({
      ...prevLog,
      pendingSubject: subject || undefined,
      pendingLocation: location || undefined,
    }));
  }, [subject, location]);

  return (
    <View className="flex flex-col space-y-4 h-auto">
      <Text className="text-primary text-3xl">
        Let's add some optional details to what you did
      </Text>
      <Text className="text-primary text-2xl mt-4">
        Who or what did you do this with?
      </Text>
      <View className="flex flex-row w-full">
        <View className="flex-1">
          <Input
            value={subject}
            onChangeText={setSubject}
            placeholder="Who or what did you do this with?"
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
          />
        </View>
      </View>
      <Text className="text-primary text-2xl mt-4">
        Where did you do this at?
      </Text>
      <View className="flex flex-row w-full">
        <View className="flex-1">
          <Input
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
          />
        </View>
      </View>
    </View>
  );
}
