import { TextInput, View } from "react-native";
import React from "react";
import SearchIcon from "@/src/assets/images/SearchIcon.svg";

type Props = {
	placeholder: string;
	onChange: (value: string) => void;
	value?: string;
	defaultValue?: string;
	onFocus?: () => void;
};

export default function SearchBrand({
	placeholder,
	onChange,
	value,
	defaultValue,
	onFocus,
}: Props) {
	return (
		<View className="bg-[#F5F5F5] w-full h-[50px] rounded-2xl flex-row items-center gap-[5px] px-[10px] overflow-hidden">
			{/* <SearchIcon width={22} height={22} fill={"#33333360"} /> */}
			<View className="overflow-hidden w-[90%] h-full flex-row">
				<TextInput
					placeholder={placeholder}
					placeholderTextColor={"#d3d3d3"}
					style={{ fontFamily: "CatamaranMedium", overflow: "hidden" }}
					className="h-full text-[14px] w-full"
					onChangeText={(text) => onChange(text)}
					value={value}
					defaultValue={defaultValue}
					onFocus={onFocus}
				/>
			</View>
		</View>
	);
}
