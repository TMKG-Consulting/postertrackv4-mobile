import React from "react";
import Screen from "@/src/components/shared/Screen";
import ApprovedSitesScreen from "@/src/components/screens/compliance-reports/approved/ApprovedSitesScreen";

export default function approved() {
	return (
		<Screen>
			<ApprovedSitesScreen />
		</Screen>
	);
}
