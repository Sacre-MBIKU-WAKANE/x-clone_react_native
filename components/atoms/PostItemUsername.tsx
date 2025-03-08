import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Styles from "@/constants/Styles";

type Props = {};

const PostItemUsername = (props: Props) => {
	return (
		<View style={Styles.flexRowContainer}>
			<Text style={styles.username}>Maximmilian</Text>
			<Text style={styles.usernameDescription}>@maxjacobson</Text>
			<Text style={styles.usernameDescription}> 3h</Text>
		</View>
	);
};

export default PostItemUsername;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 15,
	},
	username: {
		fontWeight: "bold",
	},
	usernameDescription: {
		fontWeight: "500",
		color: "gray",
	},
});
