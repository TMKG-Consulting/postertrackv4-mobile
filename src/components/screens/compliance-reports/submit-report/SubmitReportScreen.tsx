import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";
import AppText from "@/src/components/shared/AppText";

export default function SubmitReportScreen() {
	return (
		<View className="flex-1 bg-white px-[15px]">
			<ScrollView>
				<View className="pt-[20px] border-t border-t-[#E7E7E7] flex-row justify-between w-full">
					<AppText weight="ExtraBold" className="text-[25px]">
						Audit Code - 2386
					</AppText>
				</View>
				<View></View>
			</ScrollView>
		</View>
	);
}
