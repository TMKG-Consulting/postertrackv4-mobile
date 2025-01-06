import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { Redirect } from "expo-router";

export default function IndexScreen() {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setLoaded(true);
		}, 1000);
	}, []);

	if (loaded) {
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
