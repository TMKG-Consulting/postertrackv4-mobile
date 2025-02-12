import React from "react";
import { View } from "react-native";
import AppText from "@/src/components/shared/AppText";
import useRootStore from "@/src/hooks/stores/useRootstore";

export default function SiteInfo() {
	const { siteAuditToUpload } = useRootStore();

	return (
		<View className="p-[10px] bg-[#f5f5f5] rounded-[10px] gap-y-[20px]">
			<View className="flex flex-row items-center  justify-between pb-[10px] border-b  border-b-[#949494]">
				<AppText weight="Medium" className="text-[17px]">
					Brand
				</AppText>
				<AppText weight="ExtraBold" className="text-[17px]">
					{siteAuditToUpload?.brand}
				</AppText>
			</View>
			<View className="flex flex-row items-center  justify-between pb-[10px] border-b  border-b-[#949494]">
				<AppText weight="Medium" className="text-[17px]">
					State
				</AppText>
				<AppText weight="ExtraBold" className="text-[17px]">
					{siteAuditToUpload?.state}
				</AppText>
			</View>
			<View className="flex flex-row items-center  justify-between pb-[10px] border-b  border-b-[#949494]">
				<AppText weight="Medium" className="text-[17px]">
					City
				</AppText>
				<AppText weight="ExtraBold" className="text-[17px]">
					{siteAuditToUpload?.city}
				</AppText>
			</View>
			<View className="flex flex-row items-center  justify-between pb-[10px] border-b  border-b-[#949494]">
				<AppText weight="Medium" className="text-[17px]">
					Media Owner
				</AppText>
				<AppText weight="ExtraBold" className="text-[17px]">
					{siteAuditToUpload?.mediaOwner}
				</AppText>
			</View>
			<View className="flex flex-row items-center  justify-between pb-[10px]">
				<AppText weight="Medium" className="text-[17px]">
					Media Type
				</AppText>
				<AppText weight="ExtraBold" className="text-[17px]">
					{siteAuditToUpload?.boardType}
				</AppText>
			</View>
		</View>
	);
}
