import React from "react";
import { Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import AppText from "@/src/components/shared/AppText";
import ChevronIcon from "@/src/assets/images/ChevronIcon.svg";
import { shadowStyles } from "@/src/constants/stylesheets";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { AuditSite } from "@/src/types";
import useRootStore from "@/src/hooks/stores/useRootstore";
export default function AllSitesScreen() {
	const { pendingSites } = useRootStore();
	const categorizedSites: Record<string, any> = {};

	pendingSites?.forEach((site) => {
		if (categorizedSites[site.advertiser.name]) {
			categorizedSites[site.advertiser.name].push(site);
		} else {
			categorizedSites[site.advertiser.name] = [site];
		}
	});

	return (
		<View className="flex-1 bg-white px-[15px]">
			<ScrollView>
				<View className="pt-[20px] border-t border-t-[#E7E7E7] flex-row justify-between w-full">
					<AppText weight="ExtraBold" className="text-[25px]">
						{pendingSites?.length} Sites
					</AppText>
				</View>
				<View className="mt-[25px] gap-y-[15px]">
					{Object.keys(categorizedSites).map((key, i) => (
						<TouchableOpacity
							key={i}
							style={shadowStyles.shadow}
							onPress={() =>
								router.push(
									`/compliance-reports/pending-submission?advertiser=${key}`
								)
							}
							className="w-full h-[123px] bg-[#F5F5F5] rounded-[10px] p-[10px] items-center flex-row gap-[5px]">
							<View className="w-[90px] h-[90px] rounded-[10px] bg-primary items-center justify-center">
								<AppText
									weight="ExtraBold"
									className="text-[30px] text-white text-center">
									{categorizedSites[key].length}
								</AppText>
								<AppText
									weight="SemiBold"
									className="text-[15px] text-white text-center">
									Sites
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
											{key}
										</AppText>
									</View>
									<AppText
										className="text-[17px] text-[#7B7B7B]"
										weight="SemiBold">
										Uploaded{" "}
										{new Date(
											categorizedSites[key][0].uploadedAt
										).toLocaleDateString()}
									</AppText>
								</View>
								<View className="shrink-0 rotate-[-90deg]">
									<ChevronIcon fill={"black"} />
								</View>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</View>
	);
}
