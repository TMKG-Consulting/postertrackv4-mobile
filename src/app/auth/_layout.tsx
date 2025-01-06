import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
	return (
		<Stack screenOptions={{ animation: "none" }}>
			<Stack.Screen name="welcome" options={{ headerShown: false }} />
			<Stack.Screen name="login" options={{ headerShown: false }} />
		</Stack>
	);
}
