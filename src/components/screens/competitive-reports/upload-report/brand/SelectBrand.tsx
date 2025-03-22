import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import AppText from "@/src/components/shared/AppText";
import ChevronIcon from "@/src/assets/images/ChevronIcon.svg";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function SelectBrand({
	val = "",
	errorMessage = "",
	brandRef,
}: {
	val?: string | number;
	errorMessage?: string;
	brandRef?: React.RefObject<BottomSheetModal>;
}) {
	const [value, setValue] = useState("");

	useEffect(() => {
		if (val !== "") {
			setValue(String(val));
		}
	}, [val]);

	return (
		<Pressable
			onPress={() => {
				brandRef?.current?.present();
			}}
			className="w-full gap-y-[10px]">
			<AppText className="text-[16px] text-textBlack" weight="Medium">
				Brand
			</AppText>
			<View className="bg-white h-[50px] flex-row items-center justify-between rounded-[10px] px-[10px] border border-[#ececec]">
				{value === "" && (
					<AppText className="text-[17px] text-[#8d8d8d]">Select Brand</AppText>
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
