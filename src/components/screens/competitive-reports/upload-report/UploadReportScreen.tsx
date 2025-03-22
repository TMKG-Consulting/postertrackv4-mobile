import React, { useCallback, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BrandsList from "./brand/BrandsList";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Formik, FormikHelpers } from "formik";
import SelectBrand from "./brand/SelectBrand";
import * as Yup from "yup";
import SelectBoard from "./board-type/SelectBoard";
import BoardTypeList from "./board-type/BoardTypeList";
import useRootStore from "@/src/hooks/stores/useRootstore";
import StateList from "./states/StateList";
import SelectState from "./states/SelectState";
import CitiesList from "./city/CitiesList";
import SelectCity from "./city/SelectCity";
import useAlert from "@/src/hooks/useAlert";
import { AxiosError } from "axios";
import {
	requestForegroundPermissionsAsync,
	getForegroundPermissionsAsync,
} from "expo-location";
import {
	launchCameraAsync,
	requestCameraPermissionsAsync,
	getCameraPermissionsAsync,
} from "expo-image-picker";
import {
	AssetInfo,
	createAssetAsync,
	getAssetInfoAsync,
	requestPermissionsAsync,
	getPermissionsAsync,
} from "expo-media-library";
import { router, useFocusEffect } from "expo-router";
import { Modal } from "react-native";
import CustomImagePicker from "@/src/components/shared/CustomImagePicker";
import { readAsync } from "@lodev09/react-native-exify";
import ImageIcon from "@/src/assets/images/ImageIcon.svg";
import XIcon from "@/src/assets/images/XIcon.svg";
import CameraIcon from "@/src/assets/images/CameraIcon.svg";
import { Image } from "expo-image";
import AppButton from "@/src/components/shared/AppButton";
import AppText from "@/src/components/shared/AppText";
import ApiInstance from "@/src/utils/api-instance";
import Loader from "@/src/components/shared/Loader";
import mime from "mime";
import SelectCategory from "./category/SelectCategory";
import CategoryList from "./category/CategoryList";
import SelectAdvertiser from "./advertiser/SelectAdvertiser";
import AdvertiserList from "./advertiser/AdvertisersList";

export interface CompetitiveReportUpload {
	brand: string;
	advertiser: string;
	category: number | string;
	boardType: number | string;
	region: number | string;
	state: number | string;
	city: number | string;
}

const schema = Yup.object().shape({
	brand: Yup.string().required(),
	advertiser: Yup.string().required(),
	category: Yup.mixed().required(),
	boardType: Yup.mixed().required(),
	region: Yup.mixed().required(),
	state: Yup.mixed().required(),
	city: Yup.mixed().required(),
});

export default function UploadReportScreen() {
	const brandsRef = useRef<BottomSheetModal>(null);
	const boardRef = useRef<BottomSheetModal>(null);
	const stateRef = useRef<BottomSheetModal>(null);
	const cityRef = useRef<BottomSheetModal>(null);
	const categoryRef = useRef<BottomSheetModal>(null);
	const advertiserRef = useRef<BottomSheetModal>(null);
	const { boardTypes, states, cities, categories, advertisers } =
		useRootStore();
	const [siteImages, setSiteImages] = useState<AssetInfo[]>([]);
	const [isPickingImage, setIsPickingImage] = useState(false);

	const { showAndHideAlert } = useAlert();

	const initialValues: CompetitiveReportUpload = {
		brand: "",
		advertiser: "",
		category: "",
		boardType: "",
		region: "",
		state: "",
		city: "",
	};

	async function ShowCamera() {
		const result = await launchCameraAsync({
			exif: true,
		});

		if (result.canceled) {
			return;
		}

		const savedAssets = await Promise.all(
			result.assets.map(async (asset) => {
				console.log(asset);
				const localAsset = await createAssetAsync(asset.uri);
				const assetInfo = await getAssetInfoAsync(localAsset);
				return assetInfo;
			})
		);

		setSiteImages((prev) => [...prev, ...savedAssets]);
	}

	async function TakeShot() {
		const { granted } = await getCameraPermissionsAsync();
		if (!granted) {
			const { granted: mediaGranted } = await requestCameraPermissionsAsync();
			if (mediaGranted) {
				ShowCamera();
			}
		} else {
			ShowCamera();
		}
	}

	function removeSiteImage(index: number) {
		const newImages = siteImages.filter((image, i) => index !== i);
		setSiteImages(newImages);
	}

	useFocusEffect(
		useCallback(() => {
			getForegroundPermissionsAsync().then(({ granted }) => {
				if (!granted) {
					requestForegroundPermissionsAsync().then(({ granted }) => {
						if (granted) {
							getPermissionsAsync().then(({ granted }) => {
								if (!granted) {
									console.log("not granted requesting...");
									requestPermissionsAsync().then(({ granted }) => {
										if (granted) {
											return;
										}
									});
								}
							});
						}
					});
				}
			});
		}, [])
	);

	const submitHandler = async (
		values: CompetitiveReportUpload,
		{ setSubmitting }: FormikHelpers<CompetitiveReportUpload>
	) => {
		try {
			if (siteImages.length === 0) {
				throw new AxiosError("Please upload site images.");
			}

			const data = new FormData();

			Object.keys(values).forEach((key) => {
				// @ts-ignore
				data.append(key, values[key]);
			});

			siteImages.forEach((image) => {
				console.log(image, "lll");
				// @ts-ignore
				data.append("images", {
					// @ts-ignore
					uri: image.uri,
					name: image.filename,
					// @ts-ignore
					type: mime.getType(image.uri),
				});
			});

			await ApiInstance.post("/competitive-report", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			showAndHideAlert({ message: "Upload successful.", type: "success" });

			router.replace("/competitive-reports");
		} catch (error) {
			const err = error as AxiosError<any>;
			console.error(err);
			showAndHideAlert({
				message:
					err.response?.data.message ??
					err.response?.data.error ??
					err.message ??
					"An error occurred",
				type: "error",
			});
			setSubmitting(false);
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={submitHandler}>
			{({ values, errors, handleSubmit, isValidating, isSubmitting }) => (
				<View className="flex-1 bg-white">
					{isPickingImage ? (
						<Modal visible={isPickingImage}>
							<CustomImagePicker
								visible={true}
								cancel={() => {
									setIsPickingImage(false);
								}}
								callback={async (assets) => {
									try {
										const ras = await getAssetInfoAsync(assets[0]);
										const tags = await readAsync(ras.localUri ?? "");
										console.log(ras, tags);
										setSiteImages((prev) => [...prev, ...assets]);
									} catch (error) {
										console.log(error);
									}
								}}
							/>
						</Modal>
					) : (
						<ScrollView className="px-[10px]">
							<View className="gap-y-5">
								<SelectBrand
									val={values.brand}
									errorMessage={errors.brand}
									brandRef={brandsRef}
								/>
								<SelectAdvertiser
									val={values.advertiser}
									errorMessage={errors.advertiser}
									advertiserRef={advertiserRef}
								/>
								<SelectCategory
									val={
										categories.find(
											(b) => Number(b.id) === Number(values.category)
										)?.name
									}
									errorMessage={errors.category}
									categoryRef={categoryRef}
								/>
								<SelectBoard
									val={
										boardTypes.find(
											(b) => Number(b.id) === Number(values.boardType)
										)?.name
									}
									errorMessage={errors.boardType}
									boardRef={boardRef}
								/>
								<SelectState
									val={
										states.find((b) => Number(b.id) === Number(values.state))
											?.name
									}
									errorMessage={errors.state}
									stateRef={stateRef}
								/>
								<SelectCity
									val={
										cities.find((b) => Number(b.id) === Number(values.city))
											?.name
									}
									errorMessage={errors.city}
									cityRef={cityRef}
								/>
								<View className="w-full gap-y-[10px]">
									<View className="flex-row items-center justify-between">
										<AppButton
											onPress={() => {
												setIsPickingImage(true);
											}}
											className="!w-[49%] !bg-white border border-[#ececec] gap-[10px]">
											<ImageIcon />
											<AppText className="text-[17px] text-[#8d8d8d]">
												Select Image
											</AppText>
										</AppButton>
										<AppButton
											onPress={TakeShot}
											className="!w-[49%] !bg-white border border-[#ececec] gap-[10px]">
											<CameraIcon />
											<AppText className="text-[17px] text-[#8d8d8d]">
												Take Photo
											</AppText>
										</AppButton>
									</View>
								</View>

								{siteImages.length > 0 && (
									<ScrollView showsHorizontalScrollIndicator={false} horizontal>
										<View className="flex-row h-[200px] items-center">
											{siteImages.map((image, i) => (
												<TouchableOpacity
													style={{ marginRight: 20 }}
													className="relative"
													onPress={() => {
														removeSiteImage(i);
													}}
													key={i}>
													<View className="absolute w-[25px] h-[25px] bg-red-400 rounded-full top-[-5px] right-[-10px] z-[999999] items-center justify-center">
														<XIcon width={12} fill={"white"} />
													</View>
													<Image
														style={{
															width: 145,
															height: 148,
															borderRadius: 10,
														}}
														source={image.uri}
													/>
												</TouchableOpacity>
											))}
										</View>
									</ScrollView>
								)}
								<View className="pb-[20px]">
									<AppButton
										disabled={!isValidating && isSubmitting}
										onPress={handleSubmit}>
										{!isValidating && isSubmitting ? (
											<Loader useWhite />
										) : (
											<AppText className="text-[17px] font-semibol text-white">
												Submit
											</AppText>
										)}
									</AppButton>
								</View>
							</View>
						</ScrollView>
					)}

					<BrandsList sheetRef={brandsRef} />
					<BoardTypeList sheetRef={boardRef} />
					<StateList sheetRef={stateRef} />
					<CitiesList sheetRef={cityRef} />
					<CategoryList sheetRef={categoryRef} />
					<AdvertiserList sheetRef={advertiserRef} />
				</View>
			)}
		</Formik>
	);
}
