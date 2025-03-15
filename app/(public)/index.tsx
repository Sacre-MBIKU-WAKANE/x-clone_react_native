import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import useAuthUser from "@/states/authUser";

type Props = {};

const index = (props: Props) => {
	const navigation = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const authUser = useAuthUser((state: any) => state);

	const submit = () => {
		authUser?.login(username, password);
	};

	useEffect(() => {
		console.log({ isconnected: authUser?.isConnected });

		if (authUser?.isConnected === true) {
			navigation.navigate("/(tabs)");
		}
	}, [authUser?.isConnected]);

	return (
		<View
			style={[
				{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					gap: 30,
					paddingHorizontal: "10%",
				},
			]}
		>
			<Text>Connexion</Text>

			<View style={{ gap: 15, alignItems: "center", width: "100%" }}>
				<TextInput
					style={{
						borderWidth: 1,
						borderColor: "#1DA1F2",
						padding: 10,
						width: "100%",
					}}
					value={username}
					onChangeText={(currentValue: any) => {
						setUsername((prev: any) => currentValue);
					}}
					placeholder='Username'
				/>
				<TextInput
					style={{
						borderWidth: 1,
						borderColor: "#1DA1F2",
						padding: 10,
						width: "100%",
					}}
					value={password}
					onChangeText={(currentValue: any) => {
						setPassword((prev: any) => currentValue);
					}}
					placeholder='Password'
					secureTextEntry
				/>

				<TouchableOpacity
					style={{
						width: "100%",
						padding: 10,
						backgroundColor: "#1DA1F2",
					}}
					onPress={submit}
				>
					<Text style={{ color: "white", textAlign: "center" }}>
						Se connecter
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style={{ alignItems: "center" }}>
					<Text>Vous n'avez pas de compte ?</Text>
					<Text>Inscrivez-vous</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default index;
