import React from "react";
import { View } from "react-native";
import Splash from "@/src/assets/images/Splash.svg";
import AppButton from "@/src/components/shared/AppButton";
import AppText from "@/src/components/shared/AppText";
import { router } from "expo-router";

export default function WelcomeScreen() {
	return (
		<View className="flex-1 bg-bgBlack items-center justify-center gap-[20px]">
			<Splash />
			<AppText className="text-[30px] text-white text-center" weight="Bold">
				Specialists in Billboard Tracking
			</AppText>
			<AppButton
				onPress={() => router.push("/auth/login")}
				className="!w-[90%] mt-[35px]">
				<AppText className="text-white text-[17px] " weight="Medium">
					Continue
				</AppText>
			</AppButton>
		</View>
	);
}
