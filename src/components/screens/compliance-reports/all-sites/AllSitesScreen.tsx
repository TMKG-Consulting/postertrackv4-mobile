import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import AppText from "@/src/components/shared/AppText";
import ChevronIcon from "@/src/assets/images/ChevronIcon.svg";
import { shadowStyles } from "@/src/constants/stylesheets";
import { router } from "expo-router";
export default function AllSitesScreen() {
	return (
		<View className="flex-1 bg-white px-[15px]">
			<ScrollView>
				<View className="pt-[20px] border-t border-t-[#E7E7E7] flex-row justify-between w-full">
					<AppText weight="ExtraBold" className="text-[25px]">
						80 Sites
					</AppText>
				</View>
				<View className="mt-[25px] gap-y-[15px]">
					<Pressable
						style={shadowStyles.shadow}
						onPress={() =>
							router.push(`/compliance-reports/pending-submission`)
						}
						className="w-full h-[123px] bg-[#F5F5F5] rounded-[10px] p-[10px] items-center flex-row gap-[5px]">
						<View className="w-[90px] h-[90px] rounded-[10px] bg-primary items-center justify-center">
							<AppText
								weight="ExtraBold"
								className="text-[30px] text-white text-center">
								100
							</AppText>
							<AppText
								weight="SemiBold"
								className="text-[15px] text-white text-center">
								All Sites
							</AppText>
						</View>
						<View className="grow flex-row items-center justify-between">
							<View className="max-w-[80%] gap-y-[3px]">
								<View className="w-[80%]">
									<AppText
										numberOfLines={1}
										ellipsizeMode="tail"
										className="text-[20px]"
										weight="ExtraBold">
										Prime Limited
									</AppText>
								</View>
								<AppText
									className="text-[17px] text-[#7B7B7B]"
									weight="SemiBold">
									Uploaded August 1, 2024
								</AppText>
							</View>
							<View className="shrink-0 rotate-[-90deg]">
								<ChevronIcon fill={"black"} />
							</View>
						</View>
					</Pressable>
					<Pressable
						style={shadowStyles.shadow}
						onPress={() =>
							router.push(`/compliance-reports/pending-submission`)
						}
						className="w-full h-[123px] bg-[#F5F5F5] rounded-[10px] p-[10px] items-center flex-row gap-[5px]">
						<View className="w-[90px] h-[90px] rounded-[10px] bg-primary items-center justify-center">
							<AppText
								weight="ExtraBold"
								className="text-[30px] text-white text-center">
								100
							</AppText>
							<AppText
								weight="SemiBold"
								className="text-[15px] text-white text-center">
								All Sites
							</AppText>
						</View>
						<View className="grow flex-row items-center justify-between">
							<View className="max-w-[80%] gap-y-[3px]">
								<View className="w-[80%]">
									<AppText
										numberOfLines={1}
										ellipsizeMode="tail"
										className="text-[20px]"
										weight="ExtraBold">
										ABC Limited
									</AppText>
								</View>
								<AppText
									className="text-[17px] text-[#7B7B7B]"
									weight="SemiBold">
									Uploaded August 1, 2024
								</AppText>
							</View>
							<View className="shrink-0 rotate-[-90deg]">
								<ChevronIcon fill={"black"} />
							</View>
						</View>
					</Pressable>
				</View>
			</ScrollView>
		</View>
	);
}
