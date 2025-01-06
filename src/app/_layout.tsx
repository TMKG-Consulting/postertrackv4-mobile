import { useFonts } from "expo-font";
import { Href, Slot, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import useRootStore from "../hooks/stores/useRootstore";
import "../../globals.css";

SplashScreen.preventAutoHideAsync();

// SplashScreen.setOptions({
// 	duration: 1000,
// 	fade: true,
// });

export default function RootLayout() {
	const [loaded] = useFonts({
		CatamaranExtraLight: require("../assets/fonts/Catamaran-ExtraLight.ttf"),
		CatamaranLight: require("../assets/fonts/Catamaran-Light.ttf"),
		CatamaranThin: require("../assets/fonts/Catamaran-Thin.ttf"),
		CatamaranRegular: require("../assets/fonts/Catamaran-Regular.ttf"),
		CatamaranMedium: require("../assets/fonts/Catamaran-Medium.ttf"),
		CatamaranSemiBold: require("../assets/fonts/Catamaran-SemiBold.ttf"),
		CatamaranBold: require("../assets/fonts/Catamaran-Bold.ttf"),
		CatamaranExtraBold: require("../assets/fonts/Catamaran-ExtraBold.ttf"),
		CatamaranBlack: require("../assets/fonts/Catamaran-Black.ttf"),
	});
	const pathname = usePathname();
	const { statusBarStyle, setStatusBarStyle } = useRootStore();

	useEffect(() => {
		const lightRoutes = ["/auth/welcome", "/"];
		
		if (lightRoutes.includes(pathname)) {
			setStatusBarStyle("light");
		} else {
			setStatusBarStyle("dark");
		}
	}, [pathname]);

	const onLayoutRootView = useCallback(async () => {
		if (loaded) {
			await SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<SafeAreaProvider style={{ backgroundColor: "#140100" }}>
			<GestureHandlerRootView>
				<StatusBar style={statusBarStyle} />
				<View onLayout={onLayoutRootView}></View>
				<Slot />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}
