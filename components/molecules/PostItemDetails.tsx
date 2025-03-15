import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PostItemAvatar from "../atoms/PostItemAvatar";
import PostItemUsername from "../atoms/PostItemUsername";
import styles from "@/constants/Styles";
import PostItemDescription from "../atoms/PostItemDescription";

type Props = {
	likeValue: number;
};

const PostItemDetails = ({ likeValue }: Props) => {
	return (
		<View style={styles.flexRowContainer}>
			<PostItemAvatar />
			<View style={{ gap: 15 }}>
				<PostItemUsername />
				<PostItemDescription likeValue={likeValue} />
			</View>
		</View>
	);
};

export default PostItemDetails;
