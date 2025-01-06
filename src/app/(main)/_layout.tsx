import AppHeader from "@/src/components/shared/AppHeader";
import DrawerContent from "@/src/components/shared/DrawerContent";
import { Drawer } from "expo-router/drawer";
import React from "react";

export default function _layout() {
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
				options={{ title: "Compliance Audit" }}
			/>
			<Drawer.Screen name="competitive-reports" />
			<Drawer.Screen name="home" />
		</Drawer>
	);
}
