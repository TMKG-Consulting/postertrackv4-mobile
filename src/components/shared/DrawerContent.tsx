import React from "react";
import { Pressable, View } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import CloseIcon from "@/src/assets/images/XIcon.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import AppText from "./AppText";
import Avatar from "./Avatar";
import { shadowStyles } from "@/src/constants/stylesheets";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppButton from "./AppButton";
import * as SecureStore from "expo-secure-store";
import useRootStore from "@/src/hooks/stores/useRootstore";

export default function DrawerContent(props: DrawerContentComponentProps) {
	const { top } = useSafeAreaInsets();
	const { setIsAuthenticated, userDetails } = useRootStore();

	async function logout() {
		try {
			await SecureStore.deleteItemAsync("accessToken");
			setIsAuthenticated(false);
			router.replace("/auth/login");
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<View className="flex-1 px-[15px]">
			<View style={{ height: top + 30 }}></View>
			<View
				style={shadowStyles.shadow}
				className="w-[45px] h-[45px] items-center justify-center bg-white rounded-full">
				<TouchableOpacity
					onPress={() => {
						props.navigation.closeDrawer();
					}}>
					<CloseIcon fill={"#000000"} />
				</TouchableOpacity>
			</View>
			<View className="mt-[30px] gap-y-[25px]">
				<Link href={"/compliance-reports"} asChild>
					<Pressable>
						<AppText className="text-[33px]" weight="ExtraBold">
							Compliance Reports
						</AppText>
					</Pressable>
				</Link>
				<Link href={"/compliance-reports"} asChild>
					<Pressable>
						<AppText className="text-[33px]" weight="ExtraBold">
							Competitive Reports
						</AppText>
					</Pressable>
				</Link>
				<AppButton onPress={logout} className="!w-[150px] !h-[50px]">
					<AppText className="text-[15px] text-white" weight="Medium">
						Log Out
					</AppText>
				</AppButton>
			</View>
			<Link asChild href={"/profile"}>
				<TouchableOpacity>
					<View className="flex-row items-center justify-between mt-[30px] pt-[15px] border-t border-t-[#D1D1D1]">
						<View className="flex-row items-center gap-x-[10px]">
							<Avatar size={50} src={userDetails?.profilePicture ?? ""} />
							<AppText
								className="text-[17px] w-[180px]"
								numberOfLines={1}
								ellipsizeMode="tail"
								weight="SemiBold">
								{userDetails?.firstname} {userDetails?.lastname}
							</AppText>
						</View>
					</View>
				</TouchableOpacity>
			</Link>
		</View>
	);
}
