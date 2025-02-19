import React, { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";
import AppText from "@/src/components/shared/AppText";
import SubmitReportTab from "./SubmitReportTab";
import SiteInfo from "./SiteInfo";
import SubmitReportForm from "./SubmitReportForm";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export default function SubmitReportScreen() {
	const [currentTab, setCurrentTab] = useState<"info" | "submit">("info");

	const params = useLocalSearchParams();
	const siteCode = params.siteCode;

	return (
		<View className="flex-1 bg-white">
			<View className="px-[15px] pt-[20px] border-t border-t-[#E7E7E7] flex-row justify-between w-full">
				<AppText weight="ExtraBold" className="text-[25px]">
					Audit Code - {siteCode}
				</AppText>
			</View>
			<View className="px-[15px] mt-[20px]">
				<SubmitReportTab
					currentTab={currentTab}
					setCurrentTab={setCurrentTab}
				/>
			</View>
			<View className="flex-1 mt-[20px]">
				{currentTab === "info" && (
					<View className="px-[15px]">
						<SiteInfo />
					</View>
				)}
				{currentTab === "submit" && <SubmitReportForm />}
			</View>
		</View>
	);
}
