import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { Redirect } from "expo-router";
import ApiInstance from "@/src/utils/api-instance";
import useRootStore from "@/src/hooks/stores/useRootstore";

export default function IndexScreen() {
	const [loaded, setLoaded] = useState(false);
	const { setIsAuthenticated, isAuthenticated, setUserDetails } =
		useRootStore();

	useEffect(() => {
		const init = async () => {
			try {
				const response = await ApiInstance.get("/user/detail");
				setUserDetails(response.data);
				setIsAuthenticated(true);
			} catch (error) {
				console.log(error);
				setIsAuthenticated(false);
			} finally {
				setLoaded(true);
			}
		};
		init();
	}, []);

	if (loaded && !isAuthenticated) {
		return <Redirect href={"/auth/login"} />;
	}

	if (loaded && isAuthenticated) {
		return <Redirect href={"/home"} />;
	}

	return (
		<View className="flex-1 items-center justify-center bg-bgBlack">
			<Image
				source={require("@/src/assets/images/poster-track-logo.png")}
				style={{ width: 100, height: 100 }}
			/>
		</View>
	);
}
