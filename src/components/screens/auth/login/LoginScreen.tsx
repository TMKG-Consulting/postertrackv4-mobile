import AppButton from "@/src/components/shared/AppButton";
import AppInput from "@/src/components/shared/AppInput";
import AppText from "@/src/components/shared/AppText";
import React from "react";
import { View } from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import useAlert from "@/src/hooks/useAlert";
import { AxiosError } from "axios";
import ApiInstance from "@/src/utils/api-instance";
import * as SecureStore from "expo-secure-store";
import Loader from "@/src/components/shared/Loader";
import { router } from "expo-router";
import useRootStore from "@/src/hooks/stores/useRootstore";

const schema = Yup.object().shape({
	email: Yup.string().required().email().label("Email"),
	password: Yup.string().required().label("Password"),
});

interface LoginData {
	email: string;
	password: string;
}

export default function LoginScreen() {
	const { showAndHideAlert } = useAlert();
	const { setUserDetails } = useRootStore();

	const initialValues: LoginData = {
		email: "",
		password: "",
	};

	const submitHandler = async (
		values: LoginData,
		{ setSubmitting }: FormikHelpers<LoginData>
	) => {
		try {
			const response = await ApiInstance.post("/login", values);

			await SecureStore.setItemAsync("accessToken", response.data.token);

			const response2 = await ApiInstance.get("/user/detail");
			setUserDetails(response2.data);

			showAndHideAlert({
				message: "Logged In Successfully",
				type: "success",
			});

			router.replace("/home");
		} catch (error) {
			const err = error as AxiosError<any>;

			showAndHideAlert({
				message:
					err.response?.data.message ?? err.message ?? "An error occurred",
				type: "error",
			});
			setSubmitting(false);
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={submitHandler}>
			{({
				isSubmitting,
				isValidating,
				values,
				errors,
				setFieldValue,
				handleSubmit,
			}) => (
				<View className="flex-1 pt-[70px] px-[10px] bg-white">
					<AppText weight="ExtraBold" className="text-[30px] text-bgBlack">
						Login to your account
					</AppText>
					<AppText weight="Regular" className="text-[17px] text-textGray">
						Welcome back! Please login to proceed
					</AppText>
					<View className="mt-[30px] gap-y-[20px]">
						<AppInput
							label="Email Address"
							placeholder="Enter email address"
							keyboardType="email-address"
							value={values.email}
							errorMessage={errors.email}
							onChange={(val) => setFieldValue("email", val)}
						/>
						<View>
							<AppInput.ForPassword
								label="Password"
								placeholder="Enter password"
								value={values.password}
								errorMessage={errors.password}
								onChange={(val) => setFieldValue("password", val)}
							/>
							<View className="flex-row items-center justify-end">
								<AppText
									className="text-[15px] text-primary mt-[10px]"
									weight="Medium">
									Forgot Password ?
								</AppText>
							</View>
						</View>
						<AppButton onPress={handleSubmit}>
							{!isSubmitting && (
								<AppText className="text-white text-[17px]" weight="Medium">
									Login
								</AppText>
							)}
							{isSubmitting && !isValidating && <Loader useWhite />}
						</AppButton>
					</View>
				</View>
			)}
		</Formik>
	);
}
