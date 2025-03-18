import AppText from "@/src/components/shared/AppText";
import BottomSheet from "@/src/components/shared/BottomSheet";
import useRootStore from "@/src/hooks/stores/useRootstore";
import ApiInstance from "@/src/utils/api-instance";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetFlashList } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";

export default function SideList({
	sheetRef,
	selectedSide,
}: {
	sheetRef: React.RefObject<BottomSheetModal>;
	selectedSide: number | string;
}) {
	const { setFieldValue } = useFormikContext();
	const { side, setSide } = useRootStore();

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["entities", "sides"],
		queryFn: async () => {
			const response = await ApiInstance.get("/entities");
			return response.data.data.sides;
		},
		gcTime: 0,
	});

	useEffect(() => {
		if (data) {
			setSide(data);
		}
	}, [data, side]);

	useEffect(() => {
		if (side.length === 0 && !isLoading) {
			refetch();
		}
	}, [side, isLoading]);

	return (
		<BottomSheet
			useBackdrop
			sheetRef={sheetRef}
			snapPoints={["50%", "50%"]}
			snapIndex={0}>
			<View className=" flex-1">
				<BottomSheetFlashList
					data={isLoading ? [] : side}
					estimatedItemSize={200}
					renderItem={({ item }: { item: { id: number; name: string } }) => (
						<TouchableOpacity
							onPress={() => {
								setFieldValue("sideId", item.id);
								sheetRef.current?.dismiss();
							}}
							className="w-full p-[10px] py-[15px] flex-row items-center gap-[7px]">
							<View
								className={`w-[15px] h-[15px] rounded-full bg-[#ececec] items-center justify-center`}>
								{Number(selectedSide) === item.id && (
									<View
										className={`w-[8px] h-[8px] rounded-full bg-primary items-center justify-center`}></View>
								)}
							</View>
							<AppText className="text-[17px]">{item.name}</AppText>
						</TouchableOpacity>
					)}
				/>
			</View>
		</BottomSheet>
	);
}
