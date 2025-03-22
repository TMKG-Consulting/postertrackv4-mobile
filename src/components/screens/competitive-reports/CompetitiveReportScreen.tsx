import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";
import AppText from "../../shared/AppText";
import PlusIcon from "@/src/assets/images/PlusIcon.svg";
import { router } from "expo-router";
import { Pressable } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import ApiInstance from "@/src/utils/api-instance";

export default function CompetitiveReportScreen() {
	const { data, error } = useQuery({
		queryKey: ["uploads"],
		queryFn: async () => {
			const response = await ApiInstance.get("/competitive-report");
			return response.data;
		},
		retry: false,
		gcTime: 0,
	});

	return (
		<View className="flex-1 bg-white px-[10px] relative">
			<Pressable
				onPress={() => {
					router.push("/competitive-reports/upload-report");
				}}
				style={{
					width: 60,
					height: 60,
					position: "absolute",
					bottom: 30,
					right: 15,
					backgroundColor: "#ED3237",
					borderRadius: 999,
					alignItems: "center",
					justifyContent: "center",
				}}>
				<PlusIcon />
			</Pressable>
			<FlashList
				ListHeaderComponent={() => (
					<View>
						<AppText className="text-[20px]" weight="Bold">
							Uploads History
						</AppText>
					</View>
				)}
				data={[]}
				renderItem={() => {
					return <View></View>;
				}}
			/>
		</View>
	);
}
