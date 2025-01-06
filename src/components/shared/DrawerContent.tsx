import React from "react";
import { Pressable, View, TouchableOpacity } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import CloseIcon from "@/src/assets/images/XIcon.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import AppText from "./AppText";
import Avatar from "./Avatar";
import { shadowStyles } from "@/src/constants/stylesheets";

export default function DrawerContent(props: DrawerContentComponentProps) {
	const { top } = useSafeAreaInsets();

	return (
		<View className="flex-1 px-[15px]">
			<View style={{ height: top + 30 }}></View>
			<View>
				<TouchableOpacity
					onPress={() => {
						props.navigation.closeDrawer();
					}}
					style={shadowStyles.shadow}
					className="w-[45px] h-[45px] items-center justify-center bg-white rounded-full">
					<CloseIcon />
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
			</View>
			<Link asChild href={"/"}>
				<TouchableOpacity className="mt-[30px] pt-[15px] border-t border-t-[#D1D1D1]">
					<View className="flex-row items-center justify-between">
						<View className="flex-row items-center gap-x-[10px]">
							<Avatar
								size={50}
								src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							/>
							<AppText
								className="text-[17px] w-[180px]"
								numberOfLines={1}
								ellipsizeMode="tail"
								weight="SemiBold">
								Adams Muhammed
							</AppText>
						</View>
					</View>
				</TouchableOpacity>
			</Link>
		</View>
	);
}
