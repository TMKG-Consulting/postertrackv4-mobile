import React from "react";
import { ScrollView, View } from "react-native";
import AppText from "@/src/components/shared/AppText";
import useRootStore from "@/src/hooks/stores/useRootstore";
import { SiteUploadData } from "./SubmitReportForm";
import { useQueryClient } from "@tanstack/react-query";
import { AssetInfo } from "expo-media-library";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import XIcon from "@/src/assets/images/XIcon.svg";
import AppButton from "@/src/components/shared/AppButton";
import Loader from "@/src/components/shared/Loader";
import { useFormikContext } from "formik";

export default function SubmissionReview({
	submission,
	images,
}: {
	submission: SiteUploadData;
	images: AssetInfo[];
}) {
	const queryClient = useQueryClient();
	const { isSubmitting, isValidating, handleSubmit } = useFormikContext();

	return (
		<View className="p-[10px] bg-[#f5f5f5] rounded-[10px] gap-y-[20px]">
			<View className="flex flex-row items-center  justify-between pb-[10px] border-b  border-b-[#949494]">
				<AppText weight="Medium" className="text-[17px]">
					Structure
				</AppText>
				<AppText weight="ExtraBold" className="text-[17px]">
					{(() => {
						const data: any = queryClient.getQueryData([
							"entities",
							"structures",
						]);

						return data?.find(
							(d: any) => Number(d.id) === Number(submission.structureId)
						).name;
					})()}
				</AppText>
			</View>
			<View className="flex flex-row items-center  justify-between pb-[10px] border-b  border-b-[#949494]">
				<AppText weight="Medium" className="text-[17px]">
					Poster
				</AppText>
				<AppText weight="ExtraBold" className="text-[17px]">
					{(() => {
						const data: any = queryClient.getQueryData(["entities", "posters"]);

						return data?.find(
							(d: any) => Number(d.id) === Number(submission.posterId)
						).name;
					})()}
				</AppText>
			</View>
			<View className="flex flex-row items-center  justify-between pb-[10px] border-b  border-b-[#949494]">
				<AppText weight="Medium" className="text-[17px]">
					Illumination
				</AppText>
				<AppText weight="ExtraBold" className="text-[17px]">
					{(() => {
						const data: any = queryClient.getQueryData([
							"entities",
							"illuminations",
						]);

						return data?.find(
							(d: any) => Number(d.id) === Number(submission.illuminationId)
						).name;
					})()}
				</AppText>
			</View>
			<View className="flex flex-row items-center  justify-between pb-[10px] border-b  border-b-[#949494]">
				<AppText weight="Medium" className="text-[17px]">
					Route
				</AppText>
				<AppText weight="ExtraBold" className="text-[17px]">
					{submission.mediaOwner}
				</AppText>
			</View>
			<View className="flex flex-row items-center  justify-between pb-[10px]  border-b  border-b-[#949494]">
				<AppText weight="Medium" className="text-[17px]">
					Side
				</AppText>
				<AppText weight="ExtraBold" className="text-[17px]">
					{(() => {
						const data: any = queryClient.getQueryData(["entities", "sides"]);

						return data?.find(
							(d: any) => Number(d.id) === Number(submission.illuminationId)
						).name;
					})()}
				</AppText>
			</View>
			<View className="flex   justify-between pb-[10px]  border-b  border-b-[#949494]">
				<AppText weight="Medium" className="text-[17px]">
					Message
				</AppText>
				<AppText weight="ExtraBold" className="text-[17px]">
					{submission.message}
				</AppText>
			</View>
			<View className="flex   justify-between pb-[10px]  border-b  border-b-[#949494]">
				<AppText weight="Medium" className="text-[17px]">
					Comment
				</AppText>
				<AppText weight="ExtraBold" className="text-[17px]">
					{submission.comment}
				</AppText>
			</View>
			{images.length > 0 && (
				<ScrollView showsHorizontalScrollIndicator={false} horizontal>
					<View className="flex-row h-[200px] items-center">
						{images.map((image, i) => (
							<TouchableOpacity
								style={{ marginRight: 20 }}
								className="relative"
								key={i}>
								<Image
									style={{
										width: 145,
										height: 148,
										borderRadius: 10,
									}}
									source={image.localUri}
								/>
							</TouchableOpacity>
						))}
					</View>
				</ScrollView>
			)}

			<AppButton
				onPress={() => {
					handleSubmit();
				}}>
				{!isSubmitting && (
					<AppText className="text-[17px] text-white">Submit</AppText>
				)}
				{isSubmitting && !isValidating && <Loader useWhite />}
			</AppButton>
		</View>
	);
}
