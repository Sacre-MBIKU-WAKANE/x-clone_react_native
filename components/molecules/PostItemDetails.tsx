import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PostItemAvatar from "../atoms/PostItemAvatar";

type Props = {};

const PostItemDetails = (props: Props) => {
	return (
		<View>
			<PostItemAvatar />
			<Text>PostItemDetails</Text>
		</View>
	);
};

export default PostItemDetails;

const styles = StyleSheet.create({});
