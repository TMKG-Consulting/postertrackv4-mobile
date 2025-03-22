import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import SelectStructure from "./structure/SelectStructure";
import { ScrollView } from "react-native-gesture-handler";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import useAlert from "@/src/hooks/useAlert";
import StructureList from "./structure/StructureList";
import {
	launchImageLibraryAsync,
	launchCameraAsync,
	requestMediaLibraryPermissionsAsync,
	requestCameraPermissionsAsync,
	getMediaLibraryPermissionsAsync,
	getCameraPermissionsAsync,
} from "expo-image-picker";
import {
	AssetInfo,
	createAssetAsync,
	getAssetInfoAsync,
	requestPermissionsAsync,
	getPermissionsAsync,
} from "expo-media-library";
import SelectPoster from "./poster/SelectPoster";
import PosterList from "./poster/PosterList";
import SelectIllumination from "./illumination/SelectIllumination";
import IlluminationList from "./illumination/IlluminationList";
import SelectRoute from "./route/SelectRoute";
import RouteList from "./route/RouteList";
import SelectSide from "./side/SelectSide";
import SideList from "./side/SideList";
import AppInput from "@/src/components/shared/AppInput";
import ImageIcon from "@/src/assets/images/ImageIcon.svg";
import XIcon from "@/src/assets/images/XIcon.svg";
import CameraIcon from "@/src/assets/images/CameraIcon.svg";
import AppButton from "@/src/components/shared/AppButton";
import AppText from "@/src/components/shared/AppText";
import {
	requestForegroundPermissionsAsync,
	getForegroundPermissionsAsync,
} from "expo-location";
import { Image } from "expo-image";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import useRootStore from "@/src/hooks/stores/useRootstore";
import Loader from "@/src/components/shared/Loader";
import mime from "mime";
import ApiInstance from "@/src/utils/api-instance";
import SubmissionReview from "./SubmissionReview";
import { Modal } from "react-native";
import CustomImagePicker from "@/src/components/shared/CustomImagePicker";
import { readAsync } from "@lodev09/react-native-exify";

const schema = Yup.object().shape({
	siteCode: Yup.string().required().label("Site Code"),
	campaignId: Yup.string().required().label("Campaign"),
	advertiser: Yup.string().required().label("Advertiser"),
	brand: Yup.string().required().label("Brand"),
	boardType: Yup.string().required().label("Board Type"),
	mediaOwner: Yup.string().required().label("Media Owner"),
	message: Yup.string().required().label("Message"),
	comment: Yup.string().required().label("Comment"),
	structureId: Yup.mixed().required().label("Structure"),
	posterId: Yup.mixed().required().label("Poster"),
	illuminationId: Yup.mixed().required().label("illumination"),
	routeId: Yup.mixed().required().label("Route"),
	sideId: Yup.mixed().required().label("Side"),
	address: Yup.string().required().label("Address"),
	city: Yup.string().required().label("City"),
});

export interface SiteUploadData {
	siteCode: string;

	campaignId: number | string;

	advertiser: string;

	brand: string;

	boardType: string;

	mediaOwner: string;

	message: string;

	comment: string;

	structureId: number | string;

	posterId: number | string;

	illuminationId: number | string;

	routeId: number | string;

	sideId: number | string;

	address: string;

	city: string;
	state: string;
}

export default function SubmitReportForm() {
	const structureRef = useRef<BottomSheetModal>(null);
	const posterRef = useRef<BottomSheetModal>(null);
	const illuminationRef = useRef<BottomSheetModal>(null);
	const routeRef = useRef<BottomSheetModal>(null);
	const sideRef = useRef<BottomSheetModal>(null);

	const params = useLocalSearchParams();
	const siteCode = params.siteCode;

	const [siteImages, setSiteImages] = useState<AssetInfo[]>([]);
	const { showAndHideAlert } = useAlert();
	const { siteAuditToUpload } = useRootStore();

	const [showReview, setShowReview] = useState(false);
	const [isPickingImage, setIsPickingImage] = useState(false);

	if (!siteAuditToUpload) {
		return <Redirect href={"/(main)/home"} />;
	}

	const initialValues: SiteUploadData = {
		siteCode: siteCode as string,
		campaignId: siteAuditToUpload?.mainCampaignId,
		advertiser: siteAuditToUpload.advertiser.name,
		brand: siteAuditToUpload.brand,
		boardType: siteAuditToUpload.boardType,
		mediaOwner: siteAuditToUpload.mediaOwner,
		message: "",
		comment: "",
		structureId: "",
		posterId: "",
		illuminationId: "",
		routeId: "",
		sideId: "",
		address: siteAuditToUpload.address,
		city: siteAuditToUpload.city,
		state: siteAuditToUpload.state,
	};

	async function showGallery() {
		const result = await launchImageLibraryAsync({
			allowsMultipleSelection: true,
			exif: true,
			allowsEditing: false,
			mediaTypes: ["images"],
			legacy: true,
		});

		if (result.canceled) {
			return;
		} else {
			try {
				const savedAssets = await Promise.all(
					result.assets.map(async (asset) => {
						console.log(asset);
						const localAsset = await createAssetAsync(asset.uri);
						const assetInfo = await getAssetInfoAsync(localAsset);
						return assetInfo;
					})
				);

				setSiteImages((prev) => [...prev, ...savedAssets]);
			} catch (error) {
				console.log(error);
			}
		}
	}

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

	async function PickImage() {
		const { granted } = await getMediaLibraryPermissionsAsync();

		if (!granted) {
			const { granted: mediaGranted } =
				await requestMediaLibraryPermissionsAsync();
			if (mediaGranted) {
				showGallery();
			}
		} else {
			showGallery();
		}
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

	const submitHandler = async function (
		values: SiteUploadData,
		{ setSubmitting }: FormikHelpers<SiteUploadData>
	) {
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
				data.append("imageUrls", {
					// @ts-ignore
					uri: image.uri,
					name: image.filename,
					// @ts-ignore
					type: mime.getType(image.uri),
				});
			});

			await ApiInstance.post(
				"/compliance-report/" + siteAuditToUpload.siteAssignmentId,
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			showAndHideAlert({ message: "Upload successful.", type: "success" });
			router.replace("/compliance-reports");
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

	useEffect(() => {
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
	}, []);

	return (
		<Formik
			validationSchema={schema}
			onSubmit={submitHandler}
			initialValues={initialValues}>
			{({ isSubmitting, isValidating, errors, values, setFieldValue }) =>
				isPickingImage ? (
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
					<View className="flex-1">
						<ScrollView>
							{showReview && (
								<SubmissionReview
									submission={values}
									images={siteImages}
									goBack={() => {
										setShowReview(false);
									}}
								/>
							)}
							{!showReview && (
								<View className="gap-y-[15px] p-[10px] bg-[#F5F5F5]">
									<SelectStructure
										structureRef={structureRef}
										val={values.structureId}
										errorMessage={errors.structureId}
									/>
									<SelectPoster
										posterRef={posterRef}
										val={values.posterId}
										errorMessage={errors.posterId}
									/>
									<SelectIllumination
										illuminationRef={illuminationRef}
										val={values.illuminationId}
										errorMessage={errors.illuminationId}
									/>
									<SelectRoute
										routeRef={routeRef}
										val={values.routeId}
										errorMessage={errors.routeId}
									/>
									<SelectSide
										sideRef={sideRef}
										val={values.sideId}
										errorMessage={errors.sideId}
									/>
									<AppInput.TextArea
										label="Message"
										value={values.message}
										placeholder="Message"
										errorMessage={errors.message}
										onChange={(val) => setFieldValue("message", val)}
									/>
									<AppInput.TextArea
										label="Comment"
										value={values.comment}
										placeholder="Comment"
										errorMessage={errors.comment}
										onChange={(val) => setFieldValue("comment", val)}
									/>
									<View className="gap-y-[10px]">
										<View className="flex-row items-center gap-[10px]">
											<AppButton
												onPress={() => {
													setIsPickingImage(true);
												}}
												className="!w-1/2 !bg-white border border-[#ececec] gap-[10px]">
												<ImageIcon />
												<AppText className="text-[17px] text-[#8d8d8d]">
													Select Image
												</AppText>
											</AppButton>
											<AppButton
												onPress={TakeShot}
												className="!w-1/2 !bg-white border border-[#ececec] gap-[10px]">
												<CameraIcon />
												<AppText className="text-[17px] text-[#8d8d8d]">
													Take Photo
												</AppText>
											</AppButton>
										</View>
									</View>

									{siteImages.length > 0 && (
										<ScrollView
											showsHorizontalScrollIndicator={false}
											horizontal>
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

									<AppButton
										onPress={() => {
											const allProvided = Object.values(values).every(
												(v) => v !== ""
											);

											if (!allProvided) {
												Object.keys(values).forEach((k) => {
													// @ts-ignore
													if (values[k] === "") {
														setFieldValue(k, "");
													}
												});
											} else {
												if (siteImages.length === 0) {
													showAndHideAlert({
														message: "Please upload site images.",
														type: "error",
													});
													return;
												}
												setShowReview(true);
											}
										}}>
										{!isSubmitting && (
											<AppText className="text-[17px] text-white">
												Continue
											</AppText>
										)}
										{isSubmitting && !isValidating && <Loader useWhite />}
									</AppButton>
								</View>
							)}
						</ScrollView>
						<StructureList
							sheetRef={structureRef}
							selectedStructure={values.structureId}
						/>
						<PosterList sheetRef={posterRef} selectedPoster={values.posterId} />
						<IlluminationList
							sheetRef={illuminationRef}
							selectedIllumination={values.illuminationId}
						/>
						<RouteList sheetRef={routeRef} selectedRouten={values.routeId} />
						<SideList sheetRef={sideRef} selectedSide={values.sideId} />
					</View>
				)
			}
		</Formik>
	);
}
