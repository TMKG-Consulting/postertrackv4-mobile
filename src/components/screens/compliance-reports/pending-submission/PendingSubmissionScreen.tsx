import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import AppText from "@/src/components/shared/AppText";
import AppButton from "@/src/components/shared/AppButton";
import ChevronIcon from "@/src/assets/images/ChevronIcon.svg";
import { shadowStyles } from "@/src/constants/stylesheets";
import { router } from "expo-router";

export default function PendingSubmissionScreen() {
	return (
		<View className="flex-1 bg-white px-[15px]">
			<ScrollView>
				<View className="pt-[20px] border-t border-t-[#E7E7E7] flex-row justify-between w-full">
					<AppText weight="ExtraBold" className="text-[25px]">
						ABC Limited
					</AppText>
				</View>
				<View className="gap-y-[20px] mt-[30px]">
					<TouchableOpacity
						onPress={() => router.push("/compliance-reports/submit-report")}
						style={shadowStyles.shadow}
						className="w-full rounded-[10px] border border-[#D3D3D3] bg-white">
						<View className="p-[10px] border-b border-[#D3D3D3]">
							<AppText className="text-[17px] text-bgBlack">
								17, Progress road, off Success junction, Lagos state.
							</AppText>
						</View>
						<View className="w-full p-[10px] py-[20px] flex-row items-center justify-between">
							<View className="max-w-[50%]">
								<AppText className="text-[#7b7b7b] text-[17px]">
									Media Type
								</AppText>
								<AppText weight="SemiBold" className="text-bgBlack text-[17px]">
									Eye catcher
								</AppText>
							</View>
							<View className="w-[160px]">
								<AppButton
									disabled
									className="!rounded-full items-center !h-[45px] gap-[5px]">
									<AppText className="text-white text-[17px]">
										Submit Report
									</AppText>
									<View className="shrink-0 rotate-[-90deg]">
										<ChevronIcon fill={"white"} />
									</View>
								</AppButton>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}
