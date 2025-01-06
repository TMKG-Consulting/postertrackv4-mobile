import React, { useEffect } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Hamburger from "@/src/assets/images/Hamburger.svg";
import NotificationIcon from "@/src/assets/images/NotificationIcon.svg";
import ChevronIcon from "@/src/assets/images/ChevronIcon.svg";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { shadowStyles } from "@/src/constants/stylesheets";
import { router, usePathname } from "expo-router";
import AppText from "./AppText";

export default function AppHeader(props: DrawerHeaderProps) {
	const { top } = useSafeAreaInsets();
	const { navigation } = props;
	const pathname = usePathname();

	const isHome = pathname === "/home";

	return (
		<View className="bg-white px-[15px]">
			<View style={{ paddingTop: top }}></View>
			<View className=" w-full items-center flex-row justify-between h-[80px]">
				{isHome && (
					<Pressable
						style={shadowStyles.shadow}
						onPress={() => navigation.toggleDrawer()}
						className="w-[45px] h-[45px] rounded-full bg-white items-center justify-center">
						<Hamburger />
					</Pressable>
				)}
				{!isHome && (
					<Pressable
						style={shadowStyles.shadow}
						onPress={() => {
							if (router.canGoBack()) {
								router.back();
							} else {
								router.push("/home");
							}
						}}
						className="w-[45px] h-[45px] rounded-full bg-white items-center justify-center rotate-[90deg]">
						<ChevronIcon fill={"black"} />
					</Pressable>
				)}
				<AppText className="text-[22px]" weight="SemiBold">
					{props.options.title}
				</AppText>
				<Pressable className="w-[45px] h-[45px] rounded-full bg-white items-center justify-center">
					<NotificationIcon />
				</Pressable>
			</View>
		</View>
	);
}
