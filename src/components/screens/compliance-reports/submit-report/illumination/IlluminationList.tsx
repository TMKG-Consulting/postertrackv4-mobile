import AppText from "@/src/components/shared/AppText";
import BottomSheet from "@/src/components/shared/BottomSheet";
import ApiInstance from "@/src/utils/api-instance";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetFlashList } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import useRootStore from "@/src/hooks/stores/useRootstore";

export default function IlluminationList({
	sheetRef,
	selectedIllumination,
}: {
	sheetRef: React.RefObject<BottomSheetModal>;
	selectedIllumination: number | string;
}) {
	const { setFieldValue } = useFormikContext();
	const { illumination, setIllumination } = useRootStore();

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["entities", "illuminations"],
		queryFn: async () => {
			const response = await ApiInstance.get("/entities");
			return response.data.data.illuminations;
		},
		gcTime: 0,
	});

	useEffect(() => {
		if (data) {
			setIllumination(data);
		}
	}, [data, illumination]);

	useEffect(() => {
		if (illumination.length === 0 && !isLoading) {
			refetch();
		}
	}, [illumination, isLoading]);

	return (
		<BottomSheet
			useBackdrop
			sheetRef={sheetRef}
			snapPoints={["50%", "50%"]}
			snapIndex={0}>
			<View className=" flex-1">
				<BottomSheetFlashList
					data={isLoading ? [] : illumination}
					estimatedItemSize={200}
					renderItem={({ item }: { item: { id: number; name: string } }) => (
						<TouchableOpacity
							onPress={() => {
								setFieldValue("illuminationId", item.id);
								sheetRef.current?.dismiss();
							}}
							className="w-full p-[10px] py-[15px] flex-row items-center gap-[7px]">
							<View
								className={`w-[15px] h-[15px] rounded-full bg-[#ececec] items-center justify-center`}>
								{Number(selectedIllumination) === item.id && (
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
