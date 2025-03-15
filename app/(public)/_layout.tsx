import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

type Props = {};

const _layout = (props: Props) => {
	return (
		<Stack
			screenOptions={{
				title: "Connexion",
				headerShown: true,
				headerBackground: () => (
					<View
						style={{
							backgroundColor: "#1DA1F2",
							height: 100,
						}}
					/>
				),
			}}
		>
			<Stack.Screen name='index' options={{}} />
		</Stack>
	);
};

export default _layout;
