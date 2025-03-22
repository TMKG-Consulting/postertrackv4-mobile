import BottomSheet from "@/src/components/shared/BottomSheet";
import {
	BottomSheetFlashList,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/src/components/shared/Loader";
import ApiInstance from "@/src/utils/api-instance";
import useRootStore from "@/src/hooks/stores/useRootstore";
import { ActivityIndicator } from "react-native";
import { Brand } from "@/src/types";
import AppText from "@/src/components/shared/AppText";
import CheckMark from "@/src/assets/images/checkmark.svg";
import { useFormikContext } from "formik";
import { CompetitiveReportUpload } from "../UploadReportScreen";

export default function BoardTypeList({
	sheetRef,
}: {
	sheetRef: React.RefObject<BottomSheetModal>;
}) {
	const { setFieldValue, values } = useFormikContext<CompetitiveReportUpload>();
	const { boardTypes, setBoardTypes } = useRootStore();

	const { data, error, isLoading } = useQuery({
		queryKey: ["boardtype"],
		queryFn: async () => {
			const response = await ApiInstance.get(`/api/board`);
			return response.data;
		},
		gcTime: 0,
		retry: false,
	});

	useEffect(() => {
		if (data) {
			setBoardTypes(data);
		}
	}, [data]);

	return (
		<BottomSheet
			canClose
			useBackdrop
			sheetRef={sheetRef}
			snapPoints={["40%"]}
			snapIndex={0}>
			<BottomSheetView className="flex-1">
				<BottomSheetFlashList
					estimatedItemSize={200}
					data={isLoading ? [] : boardTypes}
					renderItem={({ item }: { item: { id: number; name: string } }) => {
						return (
							<Pressable
								onPress={() => {
									setFieldValue("boardType", item.id, false);
									sheetRef.current?.dismiss();
								}}
								className="flex-row justify-between items-center py-[15px] px-[10px] border-b-[#d2d2d2] border-b">
								<AppText className="text-[15px]" weight="Medium">
									{item.name}
								</AppText>
								{values.brand === item.name && (
									<CheckMark fill={"green"} width={20} height={20} />
								)}
							</Pressable>
						);
					}}
				/>
			</BottomSheetView>
		</BottomSheet>
	);
}
