import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const PostItemLastReaction = ({
	lastUserReacted,
}: {
	lastUserReacted: string;
}) => {
	return (
		<View>
			<Text style={styles.textStyle}>{lastUserReacted}</Text>
		</View>
	);
};

export default PostItemLastReaction;

const styles = StyleSheet.create({
	textStyle: {
		fontWeight: "400",
		color: "gray",
	},
});
