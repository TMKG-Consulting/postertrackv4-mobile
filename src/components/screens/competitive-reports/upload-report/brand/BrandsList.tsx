import BottomSheet from "@/src/components/shared/BottomSheet";
import {
	BottomSheetFlashList,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import ApiInstance from "@/src/utils/api-instance";
import { ActivityIndicator } from "react-native";
import { Brand } from "@/src/types";
import AppText from "@/src/components/shared/AppText";
import CheckMark from "@/src/assets/images/checkmark.svg";
import { useFormikContext } from "formik";
import { CompetitiveReportUpload } from "../UploadReportScreen";
import SearchBrand from "./SearchBrand";
import { debounce } from "@/src/utils/debounce";
import AppButton from "@/src/components/shared/AppButton";

export default function BrandsList({
	sheetRef,
}: {
	sheetRef: React.RefObject<BottomSheetModal>;
}) {
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [displayedBrands, setDisplayedBrands] = useState<Brand[]>([]);
	const { setFieldValue, values } = useFormikContext<CompetitiveReportUpload>();
	const [totalItems, setTotalItems] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [isSearching, setIsSearching] = useState(false);

	const searchBrandHandler = debounce(
		async (input: string, page: number, displayedBrandsCurr: Brand[]) => {
			const response = await ApiInstance.get(
				`/brands?page=${page}&search=${input}`
			);

			setTotalItems(response.data.total);
			setTotalPages(response.data.totalPages);

			setIsSearching(false);

			if (displayedBrandsCurr.length > 0) {
				setDisplayedBrands((prev) => [...prev, ...response.data.data]);
			} else {
				setDisplayedBrands((prev) => [...response.data.data]);
			}
		},
		100
	);

	return (
		<BottomSheet
			useBackdrop
			sheetRef={sheetRef}
			snapPoints={["80%"]}
			snapIndex={0}>
			<BottomSheetView className="flex-1">
				<View className="px-[10px]">
					<SearchBrand
						placeholder="Enter brand name"
						onChange={(val) => {
							setDisplayedBrands([]);
							setIsSearching(true);
							setCurrentPage(1);
							searchBrandHandler(val, 1, displayedBrands);
							setSearch(val);
						}}
					/>
				</View>
				<BottomSheetFlashList
					estimatedItemSize={200}
					data={isSearching ? [1, 2, 3, 4] : [...displayedBrands]}
					renderItem={({ item }: { item: number | Brand }) => {
						if (isSearching && displayedBrands.length === 0) {
							return (
								<View className="border-b border-b-[#e1e1e1] gap-[4px] pb-[15px] px-[10px] mt-[20px] last:border-b-0">
									<View className="h-[7px] rounded-full w-full bg-[#d3d3d3] animate-pulse"></View>
									<View className="h-[7px] rounded-full w-[30%] bg-[#d3d3d3] animate-pulse"></View>
									<View className="h-[7px] rounded-full w-1/2 bg-[#d3d3d3] animate-pulse"></View>
								</View>
							);
						}

						if (!isSearching && typeof item !== "number") {
							return (
								<TouchableOpacity
									onPress={() => {
										setFieldValue("brand", item.name, false);
										setFieldValue("category", item.categoryId, false);
										setFieldValue("advertiser", item.advertiser?.name, false);
										sheetRef.current?.dismiss();
									}}
									className="flex-row justify-between items-center py-[15px] px-[10px] border-b-[#d2d2d2] border-b">
									<AppText className="text-[15px]" weight="Medium">
										{item.name}
									</AppText>
									{values.brand === item.name && (
										<CheckMark fill={"green"} width={20} height={20} />
									)}
								</TouchableOpacity>
							);
						}

						return <View></View>;
					}}
					onEndReachedThreshold={1}
					onEndReached={async () => {
						const hasNextPage = currentPage < totalPages;
						if (hasNextPage && displayedBrands.length < totalItems) {
							setCurrentPage(currentPage + 1);
							searchBrandHandler(search, currentPage + 1, displayedBrands);
						}
					}}
					ListHeaderComponent={
						!isSearching && displayedBrands.length > 0 ? (
							<View className="px-[10px] py-[10px]">
								<AppText
									className="text-[20px] text-[#333333]"
									weight="SemiBold">
									Suggestions
								</AppText>
							</View>
						) : null
					}
					ListFooterComponent={
						<View className="flex items-center justify-center py-[15px]">
							{isSearching && <ActivityIndicator size={"small"} />}
						</View>
					}
				/>
				<View className="px-[10px] pb-[10px]">
					<AppButton
						onPress={() => {
							setFieldValue("brand", search, false);
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
