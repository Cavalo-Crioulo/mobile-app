import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { ViewProps } from "react-native";

type Props = ViewProps & { variant?: "fade" | "slide" };

export function ScreenTransition({ children, variant = "fade", ...rest }: Props) {
  if (variant === "slide") {
    return (
      <Animated.View
        entering={SlideInRight.duration(220)}
        exiting={SlideOutLeft.duration(180)}
        className="flex-1"
        {...rest}
      >
        {children}
      </Animated.View>
    );
  }
  return (
    <Animated.View entering={FadeIn.duration(220)} exiting={FadeOut.duration(180)} className="flex-1" {...rest}>
      {children}
    </Animated.View>
  );
}
