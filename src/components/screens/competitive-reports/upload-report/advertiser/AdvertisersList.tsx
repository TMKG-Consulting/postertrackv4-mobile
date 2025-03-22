import BottomSheet from "@/src/components/shared/BottomSheet";
import {
	BottomSheetFlashList,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import ApiInstance from "@/src/utils/api-instance";
import useRootStore from "@/src/hooks/stores/useRootstore";
import { ActivityIndicator } from "react-native";
import { Advertiser } from "@/src/types";
import AppText from "@/src/components/shared/AppText";
import CheckMark from "@/src/assets/images/checkmark.svg";
import { useFormikContext } from "formik";
import { CompetitiveReportUpload } from "../UploadReportScreen";
import { debounce } from "@/src/utils/debounce";
import SearchAdvertiser from "./SearchAdvertiser";
import AppButton from "@/src/components/shared/AppButton";

export default function AdvertiserList({
	sheetRef,
}: {
	sheetRef: React.RefObject<BottomSheetModal>;
}) {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [hasSearchResult, setHasSearchResult] = useState(false);
	const [displayedAdvertisers, setDisplayedAdvertisers] = useState<
		Advertiser[]
	>([]);
	const { setFieldValue, values } = useFormikContext<CompetitiveReportUpload>();
	const { setAdvertisers } = useRootStore();

	const { data, error, isFetching } = useQuery({
		queryKey: ["advertisers", currentPage, search],
		queryFn: async () => {
			const response = await ApiInstance.get(
				`/advertisers?page=${currentPage}&search=${search}`
			);
			return response.data;
		},
		gcTime: 0,
		retry: false,
	});

	useEffect(() => {
		if (data && search === "") {
			if (hasSearchResult) {
				setDisplayedAdvertisers((prev) => [...data.data]);
			} else {
				setDisplayedAdvertisers((prev) => [...prev, ...data.data]);
			}
			setHasSearchResult(false);
		} else if (data && search !== "") {
			setHasSearchResult(true);
			setDisplayedAdvertisers(data.data);
		}
	}, [data, search, hasSearchResult]);

	useEffect(() => {
		setAdvertisers(displayedAdvertisers);
	}, [displayedAdvertisers]);

	const searchAdvertiserHandler = debounce(async (input: string) => {
		setCurrentPage(1);
		setSearch(input);
	}, 500);

	return (
		<BottomSheet
			canClose
			useBackdrop
			sheetRef={sheetRef}
			snapPoints={["80%"]}
			snapIndex={0}>
			<BottomSheetView className="flex-1">
				<View className="px-[10px]">
					<SearchAdvertiser
						placeholder="Enter advertiser name"
						onChange={(val) => {
							searchAdvertiserHandler(val);
						}}
					/>
				</View>
				<BottomSheetFlashList
					estimatedItemSize={200}
					data={[...displayedAdvertisers]}
					renderItem={({ item }) => {
						return (
							<Pressable
								onPress={() => {
									setFieldValue("advertiser", item.name, false);
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
					onEndReachedThreshold={1}
					onEndReached={() => {
						const hasNextPage = currentPage < data?.totalPages;
						if (hasNextPage && displayedAdvertisers.length < data?.total) {
							setCurrentPage((prev) => prev + 1);
						}
					}}
					ListHeaderComponent={
						!isFetching && displayedAdvertisers.length > 0 ? (
							<View className="px-[10px] pt-[20px]">
								<AppText
									className="text-[20px] text-[#333333]"
									weight="SemiBold">
									Existing Advertisers
								</AppText>
							</View>
						) : null
					}
					ListFooterComponent={
						<View className="flex items-center justify-center py-[15px]">
							{isFetching && <ActivityIndicator size={"small"} />}
						</View>
					}
				/>
				<View className="px-[10px] pb-[10px]">
					<AppButton
						onPress={() => {
							setFieldValue("advertiser", search, false);
							sheetRef.current?.dismiss();
						}}>
						<AppText className="text-white text-[17px]" weight="Bold">
							Done
						</AppText>
					</AppButton>
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
}
