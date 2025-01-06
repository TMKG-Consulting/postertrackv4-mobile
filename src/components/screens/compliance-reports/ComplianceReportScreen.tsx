import React from "react";
import { Pressable, View } from "react-native";
import AppText from "../../shared/AppText";
import CalendarIcon from "@/src/assets/images/Calendar.svg";
import ChevronIcon from "@/src/assets/images/ChevronIcon.svg";
import { router } from "expo-router";

export default function ComplianceReportScreen() {
	return (
		<View className="flex-1 bg-white px-[15px]">
			<View className="pt-[20px] border-t border-t-[#E7E7E7] flex-row justify-between w-full">
				<AppText weight="ExtraBold" className="text-[25px]">
					100 Sites
				</AppText>
				<Pressable className="h-[45px] w-[190px] p-[10px] rounded-[10px] border-[#E3E3E3] border flex-row items-center justify-between">
					<View className="flex-row items-center gap-[10px]">
						<CalendarIcon />
						<AppText className="text-[15px]" weight="Medium">
							January 2024
						</AppText>
					</View>
					<ChevronIcon fill={"#140100"} />
				</Pressable>
			</View>
			<View className="mt-[30px] flex-row flex-wrap justify-between gap-y-[15px]">
				<Pressable
					onPress={() => router.push("/compliance-reports/all-sites")}
					className="w-[48%] h-[170px] rounded-[15px] bg-[#1E80D0] items-center justify-center">
					<AppText weight="ExtraBold" className="text-[50px] text-white">
						100
					</AppText>
					<AppText weight="SemiBold" className="text-[17px] text-white">
						All Sites
					</AppText>
				</Pressable>
				<Pressable className="w-[48%] h-[170px] rounded-[15px] bg-[#089527] items-center justify-center">
					<AppText weight="ExtraBold" className="text-[50px] text-white">
						20
					</AppText>
					<AppText weight="SemiBold" className="text-[17px] text-white">
						Approved sites
					</AppText>
				</Pressable>
				<Pressable className="w-[48%] h-[170px] rounded-[15px] bg-[#E85C16] items-center justify-center">
					<AppText weight="ExtraBold" className="text-[50px] text-white">
						14
					</AppText>
					<AppText weight="SemiBold" className="text-[17px] text-white">
						Pending Approval
					</AppText>
				</Pressable>
				<Pressable className="w-[48%] h-[170px] rounded-[15px] bg-[#E81640] items-center justify-center">
					<AppText weight="ExtraBold" className="text-[50px] text-white">
						6
					</AppText>
					<AppText weight="SemiBold" className="text-[17px] text-white">
						Disapproved sites
					</AppText>
				</Pressable>
			</View>
		</View>
	);
}
