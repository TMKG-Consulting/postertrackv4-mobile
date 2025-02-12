import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import AppText from "@/src/components/shared/AppText";
import ChevronIcon from "@/src/assets/images/ChevronIcon.svg";
import useRootStore from "@/src/hooks/stores/useRootstore";
import { useQueryClient } from "@tanstack/react-query";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function SelectRoute({
	val = "",
	errorMessage = "",
	routeRef,
}: {
	val?: string | number;
	errorMessage?: string;
	routeRef?: React.RefObject<BottomSheetModal>;
}) {
	const queryClient = useQueryClient();
	const [value, setValue] = useState("");

	useEffect(() => {
		const data = queryClient.getQueryData(["entities", "routes"]);

		if (val !== "") {
			// @ts-ignore
			setValue(data?.find((d) => Number(d.id) === Number(val)).name);
		}
	}, [val]);

	return (
		<Pressable
			onPress={() => {
				routeRef?.current?.present();
			}}
			className="w-full gap-y-[10px]">
			<AppText className="text-[16px] text-textBlack" weight="Medium">
				Route
			</AppText>
			<View className="bg-white h-[50px] flex-row items-center justify-between rounded-[10px] px-[10px] border border-[#ececec]">
				{value === "" && (
					<AppText className="text-[17px] text-[#8d8d8d]">Select Route</AppText>
				)}

				{value !== "" && <AppText className="text-[15px]">{value}</AppText>}
				<View>
					<ChevronIcon fill={"#8d8d8d"} />
				</View>
			</View>
			{errorMessage !== "" && (
				<AppText className="text-[13px] text-red-500" weight="Regular">
					{errorMessage}
				</AppText>
			)}
		</Pressable>
	);
}
