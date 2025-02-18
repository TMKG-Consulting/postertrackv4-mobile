import React, { useCallback, useEffect } from "react";
import { Pressable, View } from "react-native";
import AppText from "../../shared/AppText";
import CalendarIcon from "@/src/assets/images/Calendar.svg";
import ChevronIcon from "@/src/assets/images/ChevronIcon.svg";
import { router, useFocusEffect } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import ApiInstance from "@/src/utils/api-instance";
import Loader from "../../shared/Loader";
import { AuditSite } from "@/src/types";
import useRootStore from "@/src/hooks/stores/useRootstore";

export default function ComplianceReportScreen() {
	const {
		pendingSites,
		approvedSites,
		disapprovedSites,
		pendingApprovalSites,
		setPendingSites,
		setApprovedSites,
		setDisapprovedSites,
		setPendingApprovalSites,
	} = useRootStore();

	const { data, isLoading, refetch, isRefetching } = useQuery({
		queryKey: ["compliance-sites"],
		queryFn: async () => {
			const response = await ApiInstance.get("/get-assigned-sites");
			return response.data.assignedSites;
		},
		retry: false,
		gcTime: 0,
	});

	const {
		data: pendingSitesData,
		isLoading: isLoadingPendingSites,
		refetch: refetchPending,
		isRefetching: isRefetchingPending,
	} = useQuery({
		queryKey: ["pending-approval"],
		queryFn: async () => {
			const response = await ApiInstance.get("/site-pending-approval");
			return response.data.pendingApprovals;
		},
		retry: false,
		gcTime: 0,
		enabled: data !== undefined,
	});

	useFocusEffect(
		useCallback(() => {
			refetch();
			refetchPending();
		}, [])
	);

	useEffect(() => {
		if (data && pendingSitesData) {
			const pending = data.filter((site: AuditSite) => {
				const isPendingApproval = pendingSitesData.find(
					(d: any) => d.siteCode === site.siteCode
				);
				return site.status === "pending" && !isPendingApproval;
			});

			const approved = data.filter((d: AuditSite) => d.status === "approved");
			const disapproved = data.filter(
				(d: AuditSite) => d.status === "disapproved"
			);

			setPendingSites(pending);
			setApprovedSites(approved);
			setDisapprovedSites(disapproved);
			setPendingApprovalSites(pendingSitesData);
		}
	}, [data, pendingSitesData]);

	if (
		isLoading ||
		isLoadingPendingSites ||
		isRefetching ||
		isRefetchingPending
	) {
		return (
			<View className="flex-1 items-center justify-center bg-white">
				<Loader />
			</View>
		);
	}

	return (
		<View className="flex-1 bg-white px-[15px]">
			<View className="pt-[20px] border-t border-t-[#E7E7E7] flex-row justify-between w-full">
				<AppText weight="ExtraBold" className="text-[25px]">
					{data?.length} Sites
				</AppText>
				{/* <Pressable className="h-[45px] w-[190px] p-[10px] rounded-[10px] border-[#E3E3E3] border flex-row items-center justify-between">
					<View className="flex-row items-center gap-[10px]">
						<CalendarIcon />
						<AppText className="text-[15px]" weight="Medium">
							January 2024
						</AppText>
					</View>
					<ChevronIcon fill={"#140100"} />
				</Pressable> */}
			</View>
			<View className="mt-[30px] flex-row flex-wrap justify-between gap-y-[15px]">
				<Pressable
					onPress={() => router.push("/compliance-reports/all-sites")}
					className="w-[48%] h-[170px] rounded-[15px] bg-[#1E80D0] items-center justify-center">
					<AppText weight="ExtraBold" className="text-[50px] text-white">
						{pendingSites.length}
					</AppText>
					<AppText weight="SemiBold" className="text-[17px] text-white">
						Pending Sites
					</AppText>
				</Pressable>
				<Pressable
					onPress={() => router.push("/compliance-reports/approved")}
					className="w-[48%] h-[170px] rounded-[15px] bg-[#089527] items-center justify-center">
					<AppText weight="ExtraBold" className="text-[50px] text-white">
						{approvedSites.length}
					</AppText>
					<AppText weight="SemiBold" className="text-[17px] text-white">
						Approved sites
					</AppText>
				</Pressable>
				<Pressable
					onPress={() => router.push("/compliance-reports/pending-approval")}
					className="w-[48%] h-[170px] rounded-[15px] bg-[#E85C16] items-center justify-center">
					<AppText weight="ExtraBold" className="text-[50px] text-white">
						{pendingApprovalSites.length}
					</AppText>
					<AppText weight="SemiBold" className="text-[17px] text-white">
						Pending Approval
					</AppText>
				</Pressable>
				<Pressable
					onPress={() => router.push("/compliance-reports/disapproved")}
					className="w-[48%] h-[170px] rounded-[15px] bg-[#E81640] items-center justify-center">
					<AppText weight="ExtraBold" className="text-[50px] text-white">
						{disapprovedSites.length}
					</AppText>
					<AppText weight="SemiBold" className="text-[17px] text-white">
						Disapproved sites
					</AppText>
				</Pressable>
			</View>
		</View>
	);
}
