import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";

type Props = {};

const _layout = (props: Props) => {
	return (
		<Drawer>
			<Drawer.Screen
				name='(tabs)'
				options={{
					title: "Accueil",
				}}
			/>
			<Drawer.Screen
				name='index'
				options={{
					title: "Profile",
				}}
			/>
		</Drawer>
	);
};

export default _layout;
