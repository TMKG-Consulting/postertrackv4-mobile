import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import Avatar from "../../shared/Avatar";
import AppText from "../../shared/AppText";
import HalfCircle from "../../shared/HalfCircle";
import useRootStore from "@/src/hooks/stores/useRootstore";
import AppInput from "../../shared/AppInput";
import AppButton from "../../shared/AppButton";
import ApiInstance from "@/src/utils/api-instance";
import {
	AssetInfo,
	getPermissionsAsync,
	requestPermissionsAsync,
	createAssetAsync,
	getAssetInfoAsync,
} from "expo-media-library";
import {
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
	getMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import useAlert from "@/src/hooks/useAlert";
import Loader from "../../shared/Loader";
import mime from "mime";

export default function ProfileScreen() {
	const { userDetails, setUserDetails } = useRootStore();
	const [file, setFile] = useState<AssetInfo | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const { showAndHideAlert } = useAlert();

	if (!userDetails) {
		return null;
	}

	async function profileUploadHandler() {
		try {
			if (!file) {
				return;
			}

			setIsUploading(true);

			const data = new FormData();

			if (userDetails) {
				Object.keys(userDetails).forEach((k) => {
					if (k !== "profilePicture") {
						console.log(k);
						if (k === "statesCovered") {
							userDetails[k].forEach((s) => {
								// @ts-ignore
								data.append(k, s.id);
							});
						}

						if (k === "firstname") {
							{
								// @ts-ignore
								data.append(k, userDetails[k]);
							}
						}

						if (k === "lastname") {
							{
								// @ts-ignore
								data.append(k, userDetails[k]);
							}
						}
					}
				});
			}

			// @ts-ignore
			data.append("profilePicture", {
				uri: file.localUri,
				name: file.filename,
				// @ts-ignore
				type: mime.getType(file.localUri),
			});

			const res = await ApiInstance.put("/api/users/" + userDetails?.id, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setUserDetails({ ...userDetails, ...res.data });

			console.log(res.data);
			showAndHideAlert({ message: "Profile Picture Updated", type: "success" });
			setIsUploading(false);
			setFile(null);
		} catch (error) {
			// @ts-ignore
			showAndHideAlert({ message: error.message, type: "error" });
			setIsUploading(false);
			setFile(null);
		}
	}

	async function showGallery() {
		const result = await launchImageLibraryAsync({
			allowsMultipleSelection: false,
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
						const localAsset = await createAssetAsync(asset.uri);
						const assetInfo = await getAssetInfoAsync(localAsset);
						return assetInfo;
					})
				);
				setFile(savedAssets[0]);
			} catch (error) {
				console.log(error);
			}
		}
	}

	async function PickImage() {
		getPermissionsAsync().then(async ({ granted: mediaGranted }) => {
			if (mediaGranted) {
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
			} else {
				requestPermissionsAsync().then(async ({ granted }) => {
					if (!granted) {
						const { granted: mediaGranted } =
							await requestMediaLibraryPermissionsAsync();
						if (mediaGranted) {
							showGallery();
						}
					} else {
						showGallery();
					}
				});
			}
		});
	}

	useEffect(() => {
		if (file) {
			profileUploadHandler();
		}
	}, [file]);

	return (
		<View className="flex-1 bg-white">
			<ScrollView>
				<View className="items-center my-[25px]">
					<TouchableOpacity
						onPress={PickImage}
						className="w-[90px] h-[90px] rounded-full overflow-hidden">
						{!isUploading && (
							<>
								<Avatar size={90} src={userDetails?.profilePicture ?? ""} />
								<View className="w-full h-full absolute z-[9999999999] justify-end items-center">
									<View className="relative top-[15px]">
										<HalfCircle />
									</View>
									<AppText className="absolute z-[100] top-[62px] text-white text-center">
										Edit
									</AppText>
								</View>
							</>
						)}

						{isUploading && (
							<View className="w-full h-full items-center justify-center">
								<Loader />
							</View>
						)}
					</TouchableOpacity>
				</View>
				<View className="px-[10px] gap-5 pb-[20px]">
					<View pointerEvents="none">
						<AppInput
							label="Full Name"
							value={userDetails.firstname + " " + userDetails.lastname}
							placeholder=""
						/>
					</View>
					<View pointerEvents="none">
						<AppInput label="Email" value={userDetails.email} placeholder="" />
					</View>
					<View pointerEvents="none">
						<AppInput
							label="Phone Number"
							value={userDetails.phone}
							placeholder=""
						/>
					</View>
					<View pointerEvents="none">
						<AppInput
							label="Address"
							value={userDetails.address}
							placeholder=""
						/>
					</View>
					<View className="gap-y-[10px]">
						<AppText className="text-[16px] text-textBlack" weight="Medium">
							States Covered
						</AppText>
						<View className="flex-row flex-wrap gap-[5px]">
							{userDetails.statesCovered &&
								userDetails.statesCovered.map((s) => (
									<View key={s.name} className="w-max">
										<AppButton className="rounded-full min-w-[100px] !bg-transparent border-[#d3d3d3] border-[1.5px]">
											<AppText className="text-[15px]" weight="Medium">
												{s.name}
											</AppText>
										</AppButton>
									</View>
								))}
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
