import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import AppText from "@/src/components/shared/AppText";
import AppButton from "@/src/components/shared/AppButton";
import ChevronIcon from "@/src/assets/images/ChevronIcon.svg";
import { shadowStyles } from "@/src/constants/stylesheets";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { AuditSite } from "@/src/types";
import { FlashList } from "@shopify/flash-list";
import useRootStore from "@/src/hooks/stores/useRootstore";

export default function PendingSubmissionScreen() {
	const params = useLocalSearchParams();
	const { setSiteAuditToUpload, pendingSites } = useRootStore();

	const advertiser = params.advertiser;
	const data = pendingSites?.filter(
		(site) => site.advertiser.name === advertiser
	);

	return (
		<View className="flex-1 bg-white px-[15px]">
			<ScrollView>
				<View className="pt-[20px] border-t border-t-[#E7E7E7] flex-row justify-between w-full">
					<AppText weight="ExtraBold" className="text-[25px]">
						{advertiser}
					</AppText>
				</View>
				<View className="mt-[30px]">
					<FlashList
						data={data}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => {
							return (
								<TouchableOpacity
									onPress={() => {
										setSiteAuditToUpload(item);
										router.push(
											`/compliance-reports/submit-report?siteCode=${item.siteCode}`
										);
									}}
									style={shadowStyles.shadow}
									className="w-full rounded-[10px] border border-[#D3D3D3] bg-white mb-[15px]">
									<View className="p-[10px] border-b border-[#D3D3D3] ">
										<AppText className="text-[17px] text-bgBlack">
											{item.address}
										</AppText>
									</View>
									<View className="w-full p-[10px] py-[20px] flex-row items-center justify-between">
										<View className="max-w-[50%]">
											<AppText className="text-[#7b7b7b] text-[17px]">
												Media Type
											</AppText>
											<AppText
												weight="SemiBold"
												className="text-bgBlack text-[17px]">
												{item.boardType}
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
							);
						}}
						estimatedItemSize={200}
					/>
				</View>
			</ScrollView>
		</View>
	);
}
