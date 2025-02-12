import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="all-sites" />
			<Stack.Screen name="pending-submission" />
			<Stack.Screen name="approved" />
			<Stack.Screen name="pending-approval" />
			<Stack.Screen name="disapproved" />
			<Stack.Screen name="submit-report" />
		</Stack>
	);
}
