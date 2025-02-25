import React, { useState } from "react";
import {
	Pressable,
	TextInput,
	StyleSheet,
	KeyboardTypeOptions,
} from "react-native";
import { View } from "react-native";
import AppText from "./AppText";
import Eye from "@/src/assets/images/Eye.svg";
import EyeX from "@/src/assets/images/EyeX.svg";

type Props = {
	label: string;
	placeholder: string;
	errorMessage?: string;
	fullyRounded?: boolean;
	value?: string | number;
	keyboardType?: KeyboardTypeOptions;
	secureTextEntry?: boolean;
	onChange?: (val: string) => void;
};

export default function AppInput({
	label,
	placeholder,
	errorMessage,
	fullyRounded,
	value = "",
	secureTextEntry,
	onChange,
	keyboardType,
}: Props) {
	return (
		<View className="w-full gap-y-[10px]">
			<AppText className="text-[16px] text-textBlack" weight="Medium">
				{label}
			</AppText>
			<TextInput
				className={`bg-[#F5F5F5] h-[50px] p-3 ${
					fullyRounded ? "rounded-full" : "rounded-[10px]"
				} focus:border-primary border-[1.5px] border-transparent text-[15px]`}
				placeholder={placeholder}
				value={String(value)}
				style={styles.input}
				keyboardType={keyboardType}
				secureTextEntry={secureTextEntry}
				onChangeText={(text) => {
					if (onChange) {
						onChange(text);
					}
				}}
			/>
			{errorMessage && (
				<AppText className="text-[13px] text-red-500" weight="Regular">
					{errorMessage}
				</AppText>
			)}
		</View>
	);
}

AppInput.ForPassword = ({
	label,
	placeholder,
	errorMessage,
	fullyRounded,
	value = "",
	onChange,
}: Props) => {
	const [focused, setFocused] = useState(false);
	const [showText, setShowText] = useState(false);

	return (
		<View className="w-full gap-y-[10px]">
			<AppText className="text-[16px] text-textBlack" weight="Medium">
				{label}
			</AppText>
			<View
				className={`bg-[#F5F5F5] h-[50px] flex-row items-center ${
					fullyRounded ? "rounded-full" : "rounded-[10px]"
				}  border-[1.5px] ${
					focused ? "border-primary" : "border-transparent"
				}`}>
				<TextInput
					className="h-full p-3 text-[15px] grow max-w-[90%]"
					placeholder={placeholder}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					secureTextEntry={!showText ? true : false}
					autoCapitalize="none"
					value={String(value)}
					style={styles.input}
					keyboardType={"default"}
					onChangeText={(text) => {
						if (onChange) {
							onChange(text);
						}
					}}
				/>
				<Pressable
					className="w-[30px] h-full items-center justify-center"
					onPress={() => setShowText(!showText)}>
					{!showText && <Eye />}
					{showText && <EyeX />}
				</Pressable>
			</View>
			{errorMessage && (
				<AppText className="text-[13px] text-red-500" weight="Regular">
					{errorMessage}
				</AppText>
			)}
		</View>
	);
};

AppInput.TextArea = ({
	label,
	placeholder,
	errorMessage,
	fullyRounded,
	value = "",
	secureTextEntry,
	onChange,
	keyboardType,
}: Props) => {
	return (
		<View className="w-full gap-y-[10px]">
			<AppText className="text-[16px] text-textBlack" weight="Medium">
				{label}
			</AppText>
			<TextInput
				className={`bg-white h-[150px] p-3 ${
					fullyRounded ? "rounded-full" : "rounded-[10px]"
				} focus:border-primary border-[1.5px] border-transparent text-[15px]`}
				placeholder={placeholder}
				value={String(value)}
				style={styles.input}
				keyboardType={keyboardType}
				secureTextEntry={secureTextEntry}
				onChangeText={(text) => {
					if (onChange) {
						onChange(text);
					}
				}}
				textAlignVertical="top"
			/>
			{errorMessage && (
				<AppText className="text-[13px] text-red-500" weight="Regular">
					{errorMessage}
				</AppText>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		fontFamily: "CatamaranRegular",
	},
});
