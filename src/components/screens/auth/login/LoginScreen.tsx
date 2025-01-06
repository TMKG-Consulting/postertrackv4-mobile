import AppButton from "@/src/components/shared/AppButton";
import AppInput from "@/src/components/shared/AppInput";
import AppText from "@/src/components/shared/AppText";
import React from "react";
import { View } from "react-native";

export default function LoginScreen() {
	return (
		<View className="flex-1 pt-[70px] px-[10px] bg-white">
			<AppText weight="ExtraBold" className="text-[30px] text-bgBlack">
				Login to your account
			</AppText>
			<AppText weight="Regular" className="text-[17px] text-textGray">
				Welcome back! Please login to proceed
			</AppText>
			<View className="mt-[30px] gap-y-[20px]">
				<AppInput label="Email Address" placeholder="Enter email address" />
				<View>
					<AppInput.ForPassword label="Password" placeholder="Enter password" />
					<View className="flex-row items-center justify-end">
						<AppText
							className="text-[15px] text-primary mt-[10px]"
							weight="Medium">
							Forgot Password ?
						</AppText>
					</View>
				</View>
				<AppButton>
					<AppText className="text-white text-[17px]" weight="Medium">
						Login
					</AppText>
				</AppButton>
			</View>
		</View>
	);
}
