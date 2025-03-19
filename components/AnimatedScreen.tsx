import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";

interface AnimatedScreenProps {
  children: React.ReactNode;
}

export function AnimatedScreen({ children }: AnimatedScreenProps) {
  const [isReady, setIsReady] = React.useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(isReady ? 0 : 50, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
      opacity: withTiming(isReady ? 1 : 0, {
        duration: 300,
      }),
    };
  });

  React.useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      {children}
    </Animated.View>
  );
}
