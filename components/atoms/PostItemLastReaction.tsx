import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const PostItemLastReaction = (props: Props) => {
	return (
		<View>
			<Text style={styles.textStyle}>Zack John Liked</Text>
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
