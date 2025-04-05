import { router } from "expo-router";
import React from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionSelector from "~/components/screen/suggest/Action";
import Journal from "~/components/screen/suggest/Journal";
import MoodSelector from "~/components/screen/suggest/Mood";
import SubjectLocation from "~/components/screen/suggest/SubjectLocation";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useDatabase } from "~/db/provider";
import { createNewLocation } from "~/db/services/location.service";
import { createNewLog } from "~/db/services/log.service";
import { createNewSubject } from "~/db/services/subject.service";
import { createNewSuggestion } from "~/db/services/suggestion.service";
import { createNewMood } from "~/db/services/mood.service";
import { createNewActionWithMoodId } from "~/db/services/action.service";
import {
  locationsTable,
  subjectsTable,
  moodsTable,
  actionsTable,
} from "~/db/schema";

type Location = typeof locationsTable.$inferSelect;
type Subject = typeof subjectsTable.$inferSelect;
type Mood = typeof moodsTable.$inferSelect;
type Action = typeof actionsTable.$inferSelect;

interface LogState {
  mood: Partial<Mood>;
  action: Partial<Action>;
  location: Partial<Location>;
  subject: Partial<Subject>;
  pendingLocation?: string;
  pendingSubject?: string;
  pendingJournal?: string;
  pendingRating?: number;
  pendingMood?: {
    text: string;
    emoji: string;
  };
  pendingAction?: string;
}

export default function Page() {
  const { db } = useDatabase();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [log, setLog] = React.useState<LogState>({
    mood: {},
    action: {},
    location: {},
    subject: {},
  });

  function handleNext() {
    if (currentPage === 1 && !log.mood?.id && !log.pendingMood) {
      return false;
    }
    if (currentPage === 2 && !log.action?.id && !log.pendingAction) {
      return false;
    }
    return true;
  }

  async function handleSubmitAll() {
    if (!db) return;

    try {
      // Create mood if pending
      let moodData = log.mood;
      if (!moodData.id && log.pendingMood) {
        const response = await createNewMood(
          db,
          log.pendingMood.text + " " + log.pendingMood.emoji
        );
        moodData = Array.isArray(response) ? response[0] : response;
      }

      // Create action if pending
      let actionData = log.action;
      if (!actionData.id && log.pendingAction && moodData.id) {
        const response = await createNewActionWithMoodId(db, moodData.id, {
          action: log.pendingAction,
          moodId: moodData.id,
          reason: "",
        });
        actionData = Array.isArray(response) ? response[0] : response;
      }

      // Create location if pending
      let locationData = log.location;
      if (!locationData.id && log.pendingLocation && actionData.id) {
        const response = await createNewLocation(db, {
          actionId: actionData.id,
          name: log.pendingLocation,
        });
        locationData = response[0];
      }

      // Create subject if pending
      let subjectData = log.subject;
      if (!subjectData.id && log.pendingSubject && actionData.id) {
        const response = await createNewSubject(db, {
          actionId: actionData.id,
          name: log.pendingSubject,
          locationId: locationData?.id,
        });
        subjectData = response[0];
      }

      // Create log entry
      const logData = await createNewLog(db, {
        note: log.pendingJournal,
        ratings: log.pendingRating,
        moodId: moodData.id!,
        actionId: actionData.id!,
        subjectId: subjectData?.id,
        locationId: locationData?.id,
      });

      // Create suggestion if we have all required fields
      if (subjectData?.id && locationData?.id) {
        await createNewSuggestion(db, {
          moodId: moodData.id!,
          actionId: actionData.id!,
          subjectId: subjectData.id,
          locationId: locationData.id,
        });
      }

      setLog({
        mood: {},
        action: {},
        location: {},
        subject: {},
      });

      // Navigate back to home
      router.replace("/(tabs)/logs");
    } catch (error) {
      console.error("Error submitting:", error);
    }
  }

  function handleMoodSelect(selectedMood?: Mood) {
    if (selectedMood) {
      setLog((prevLog) => ({
        ...prevLog,
        mood: selectedMood,
        pendingMood: undefined,
      }));
    }
    setCurrentPage(2);
  }

  function handleActionSelect(selectedAction?: Action) {
    if (selectedAction) {
      setLog((prevLog) => ({
        ...prevLog,
        action: selectedAction,
        pendingAction: undefined,
      }));
    }
    setCurrentPage(3);
  }

  function handleSubjectLocationNext() {
    setCurrentPage(4);
  }

  async function onNextPress() {
    if (currentPage === 1) {
      handleMoodSelect();
    } else if (currentPage === 2) {
      handleActionSelect();
    } else if (currentPage === 3) {
      handleSubjectLocationNext();
    } else if (currentPage === 4) {
      await handleSubmitAll();
    } else {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="p-4 flex flex-col justify-between h-full">
        <Text className="text-primary text-xl">
          {log.mood?.mood ||
            (log.pendingMood &&
              `${log.pendingMood.text} ${log.pendingMood.emoji}`)}
          {(log.action?.action || log.pendingAction) && " -> "}
          {log.action?.action || log.pendingAction}
          {(log.subject?.name || log.pendingSubject) &&
            ` with ${log.subject?.name || log.pendingSubject}`}
          {(log.location?.name || log.pendingLocation) &&
            ` at ${log.location?.name || log.pendingLocation}`}
        </Text>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          {currentPage === 1 ? (
            <MoodSelector
              log={log}
              setLog={setLog}
              setCurrentPage={setCurrentPage}
              onSelectMood={handleMoodSelect}
            />
          ) : currentPage === 2 ? (
            <ActionSelector
              log={log}
              setLog={setLog}
              setCurrentPage={setCurrentPage}
              onSelectAction={handleActionSelect}
            />
          ) : currentPage === 3 ? (
            <SubjectLocation
              log={log}
              setLog={setLog}
              setCurrentPage={setCurrentPage}
            />
          ) : currentPage === 4 ? (
            <Journal
              log={log}
              setLog={setLog}
              setCurrentPage={setCurrentPage}
            />
          ) : null}
        </KeyboardAwareScrollView>
        <View className="flex flex-col items-center justify-between w-full gap-4">
          <View className="flex flex-row justify-between w-full">
            <Button
              onPress={() =>
                currentPage > 1
                  ? setCurrentPage(currentPage - 1)
                  : router.back()
              }
            >
              <Text>Back</Text>
            </Button>
            <View className="flex flex-row gap-2 h-full justify-center items-center">
              {[1, 2, 3, 4].map((pageNum) => (
                <View
                  key={pageNum}
                  className={`w-2 h-2 rounded-full ${
                    pageNum === currentPage ? "bg-gray-800" : "bg-gray-300"
                  }`}
                />
              ))}
            </View>
            <Button onPress={onNextPress} disabled={!handleNext()}>
              <Text>{currentPage === 4 ? "Submit" : "Next"}</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
