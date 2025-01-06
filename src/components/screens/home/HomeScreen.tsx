import React, { useState } from "react";
import { Pressable, View } from "react-native";
import AppText from "../../shared/AppText";
import AppButton from "../../shared/AppButton";
import { router } from "expo-router";

export default function HomeScreen() {
	const [action, setAction] = useState<"compliance" | "competitive">(
		"compliance"
	);

	return (
		<View className="flex-1 bg-white px-[15px]">
			<AppText weight="ExtraBold" className="text-[30px] text-bgBlack">
				Hello John,
			</AppText>
			<AppText weight="Regular" className="text-[20px] text-textGray">
				What are you doing today ?
			</AppText>
			<View className="mt-[50px] gap-y-[25px]">
				<Pressable
					onPress={() => setAction("compliance")}
					className="bg-[#F6F6F6] h-[65px] rounded-[10px] justify-center px-[10px]">
					<View className="flex-row items-center gap-[10px]">
						<View
							className={`w-[24px] h-[24px] border-[1.5px] ${
								action === "compliance" ? "border-primary" : "border-[#868686]"
							} rounded-full items-center justify-center`}>
							{action === "compliance" && (
								<View className="w-[16px] h-[16px] bg-primary rounded-full"></View>
							)}
						</View>
						<AppText className="text-[20px]" weight="Medium">
							Compliance Audit
						</AppText>
					</View>
				</Pressable>
				<Pressable
					onPress={() => setAction("competitive")}
					className="bg-[#F6F6F6] h-[65px] rounded-[10px] justify-center px-[10px]">
					<View className="flex-row items-center gap-[10px]">
						<View
							className={`w-[24px] h-[24px] border-[1.5px] ${
								action === "competitive" ? "border-primary" : "border-[#868686]"
							} rounded-full items-center justify-center`}>
							{action === "competitive" && (
								<View className="w-[16px] h-[16px] bg-primary rounded-full"></View>
							)}
						</View>
						<AppText className="text-[20px]" weight="Medium">
							Competitive Audit
						</AppText>
					</View>
				</Pressable>
			</View>
			<AppButton
				onPress={() => {
					if (action === "compliance") {
						router.push("/(main)/compliance-reports");
					}
				}}
				className="mt-[30px]">
				<AppText className="text-white text-[17px] " weight="Medium">
					Proceed
				</AppText>
			</AppButton>
		</View>
	);
}
