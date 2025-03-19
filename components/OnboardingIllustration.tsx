import React from "react";
import { View } from "react-native";
import Svg, { Circle, Path, G, Text as SvgText, TSpan } from "react-native-svg";

export function OnboardingIllustration() {
  return (
    <View className="w-full aspect-square max-w-md">
      <Svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
        {/* Background circles for depth */}
        <Circle cx="200" cy="200" r="180" fill="#E5E7EB" opacity="0.3" />
        <Circle cx="200" cy="200" r="150" fill="#D1D5DB" opacity="0.2" />
        {/* Central emoji face */}
        <Circle cx="200" cy="200" r="120" fill="#FDE68A" />
        <Circle cx="160" cy="170" r="15" fill="#1F2937" /> {/* Left eye */}
        <Circle cx="240" cy="170" r="15" fill="#1F2937" /> {/* Right eye */}
        <Path
          d="M160 230 Q200 270 240 230"
          stroke="#1F2937"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        {/* Floating mood emojis */}
        <G transform="translate(80,80)">
          <Circle r="25" fill="#FEE2E2" />
          <SvgText x="-12" y="8" fontSize="24">
            <TSpan>😊</TSpan>
          </SvgText>
        </G>
        <G transform="translate(320,80)">
          <Circle r="25" fill="#DBEAFE" />
          <SvgText x="-12" y="8" fontSize="24">
            <TSpan>😌</TSpan>
          </SvgText>
        </G>
        <G transform="translate(80,320)">
          <Circle r="25" fill="#E0E7FF" />
          <SvgText x="-12" y="8" fontSize="24">
            <TSpan>🎉</TSpan>
          </SvgText>
        </G>
        <G transform="translate(320,320)">
          <Circle r="25" fill="#FEF3C7" />
          <SvgText x="-12" y="8" fontSize="24">
            <TSpan>🙏</TSpan>
          </SvgText>
        </G>
        {/* Decorative lines */}
        <Path
          d="M50,200 Q100,150 150,200 T250,200 T350,200"
          stroke="#4B5563"
          strokeWidth="3"
          strokeDasharray="5,5"
          opacity="0.5"
          fill="none"
        />
      </Svg>
    </View>
  );
}
