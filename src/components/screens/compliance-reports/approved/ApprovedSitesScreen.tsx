import React from "react";
import { Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import AppText from "@/src/components/shared/AppText";
import AppButton from "@/src/components/shared/AppButton";
import CheckIcon from "@/src/assets/images/check.svg";
import { shadowStyles } from "@/src/constants/stylesheets";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import useRootStore from "@/src/hooks/stores/useRootstore";

export default function ApprovedSitesScreen() {
	const { setSiteAuditToUpload, approvedSites } = useRootStore();

	return (
		<View className="flex-1 bg-white px-[15px]">
			<ScrollView>
				<View className="pt-[20px] border-t border-t-[#E7E7E7] flex-row justify-between w-full">
					<AppText weight="ExtraBold" className="text-[25px]">
						Approved Sites
					</AppText>
				</View>
				<View className="mt-[30px]">
					<FlashList
						data={approvedSites}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => {
							return (
								<Pressable
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
												className="!rounded-full items-center !h-[45px] gap-[5px] !bg-[#089527]">
												<AppText className="text-white text-[17px]">
													Approved
												</AppText>
												<View className="shrink-0">
													<CheckIcon fill={"white"} />
												</View>
											</AppButton>
										</View>
									</View>
								</Pressable>
							);
						}}
						estimatedItemSize={200}
					/>
				</View>
			</ScrollView>
		</View>
	);
}
