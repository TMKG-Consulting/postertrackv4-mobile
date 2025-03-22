import AppHeader from "@/src/components/shared/AppHeader";
import DrawerContent from "@/src/components/shared/DrawerContent";
import { usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";

export default function _layout() {
	const pathname = usePathname();

	return (
		<Drawer
			screenOptions={{
				drawerStyle: {
					width: "100%",
				},
				header: (props) => <AppHeader {...props} />,
			}}
			drawerContent={(props) => <DrawerContent {...props} />}>
			<Drawer.Screen
				name="compliance-reports"
				options={{
					title: "Compliance Audit",
					headerShown: pathname.startsWith("/compliance"),
				}}
			/>
			<Drawer.Screen
				name="competitive-reports"
				options={{
					title: "Competitive Audit",
					headerShown: pathname.startsWith("/competitive"),
				}}
			/>
			<Drawer.Screen name="home" />
			<Drawer.Screen name="profile" options={{ title: "Profile" }} />
		</Drawer>
	);
}
