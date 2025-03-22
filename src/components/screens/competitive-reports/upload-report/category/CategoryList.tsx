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
import { Brand, Category } from "@/src/types";
import AppText from "@/src/components/shared/AppText";
import CheckMark from "@/src/assets/images/checkmark.svg";
import { useFormikContext } from "formik";
import { CompetitiveReportUpload } from "../UploadReportScreen";
// import SearchBrand from "./SearchBrand";
import { debounce } from "@/src/utils/debounce";

export default function CategoryList({
	sheetRef,
}: {
	sheetRef: React.RefObject<BottomSheetModal>;
}) {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [hasSearchResult, setHasSearchResult] = useState(false);
	const [displayedCategories, setDisplayedCategories] = useState<Category[]>(
		[]
	);
	const { setFieldValue, values } = useFormikContext<CompetitiveReportUpload>();
	const { setCategories, categories } = useRootStore();

	const { data, error, isFetching } = useQuery({
		queryKey: ["categories", currentPage, search],
		queryFn: async () => {
			const response = await ApiInstance.get(
				`/categories?page=${currentPage}&search=${search}`
			);
			return response.data;
		},
		gcTime: 0,
		retry: false,
	});

	useEffect(() => {
		if (data && search === "") {
			if (hasSearchResult) {
				setDisplayedCategories((prev) => [...data.data]);
			} else {
				setDisplayedCategories((prev) => [...prev, ...data.data]);
			}
			setHasSearchResult(false);
		} else if (data && search !== "") {
			setHasSearchResult(true);
			setDisplayedCategories(data.data);
		}
	}, [data, search, hasSearchResult]);

	useEffect(() => {
		setCategories(displayedCategories);
	}, [displayedCategories]);

	const searchCategoryHandler = debounce(async (input: string) => {
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
				<BottomSheetFlashList
					estimatedItemSize={200}
					data={[...displayedCategories]}
					renderItem={({ item }) => {
						return (
							<Pressable
								onPress={() => {
									setFieldValue("category", item.id, false);
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
						if (hasNextPage && displayedCategories.length < data?.total) {
							setCurrentPage((prev) => prev + 1);
						}
					}}
					ListFooterComponent={
						<View className="flex items-center justify-center py-[15px]">
							{isFetching && <ActivityIndicator size={"small"} />}
						</View>
					}
				/>
			</BottomSheetView>
		</BottomSheet>
	);
}
