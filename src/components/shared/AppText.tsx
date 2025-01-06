import React, { PropsWithChildren } from "react";
import { Text, TextProps, StyleProp, TextStyle } from "react-native";

type Props = {
	className?: string;
	style?: StyleProp<TextStyle>;
	weight?:
		| "Thin"
		| "ExtraLight"
		| "Light"
		| "Regular"
		| "Medium"
		| "SemiBold"
		| "Bold"
		| "ExtraBold";
} & PropsWithChildren &
	TextProps;

export default function AppText({
	children,
	weight = "Regular",
	className,
	style,
	...props
}: Props) {
	return (
		<Text
			{...props}
			className={`${className}`}
			style={[{ fontFamily: `Catamaran${weight}` }, style]}>
			{children}
		</Text>
	);
}
