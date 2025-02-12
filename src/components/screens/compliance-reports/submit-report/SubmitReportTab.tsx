import AppText from "@/src/components/shared/AppText";
import React from "react";
import { Pressable, View } from "react-native";

export default function SubmitReportTab({
	currentTab,
	setCurrentTab,
}: {
	currentTab: "info" | "submit";
	setCurrentTab(currentTab: "info" | "submit"): void;
}) {
	return (
		<View className="bg-[#f5f5f5] h-[60px] rounded-[10px] flex-row px-[10px] items-center">
			<Pressable
				onPress={() => setCurrentTab("info")}
				className={`w-1/2 h-[42px] rounded-[5px] items-center justify-center ${
					currentTab === "info" ? "bg-primary" : "bg-transparent"
				}`}>
				<AppText
					className={`text-[17px] ${
						currentTab === "info" ? "text-white" : "text-textBlack"
					}`}>
					Site Info
				</AppText>
			</Pressable>
			<Pressable
				onPress={() => setCurrentTab("submit")}
				className={`w-1/2 h-[42px] rounded-[5px] items-center justify-center ${
					currentTab === "submit" ? "bg-primary" : "bg-transparent"
				}`}>
				<AppText
					className={`text-[17px] ${
						currentTab === "submit" ? "text-white" : "text-textBlack"
					}`}>
					Submit Report
				</AppText>
			</Pressable>
		</View>
	);
}
