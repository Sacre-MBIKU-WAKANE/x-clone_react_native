import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PostItemAvatar from "../atoms/PostItemAvatar";
import PostItemUsername from "../atoms/PostItemUsername";
import styles from "@/constants/Styles";

type Props = {};

const PostItemDetails = (props: Props) => {
	return (
		<View style={styles.flexRowContainer}>
			<PostItemAvatar />
			<View>
				<PostItemUsername />
			</View>
		</View>
	);
};

export default PostItemDetails;
