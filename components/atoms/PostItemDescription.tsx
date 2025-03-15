import { View, Text } from "react-native";
import React from "react";
import Like from "./Like";

type Props = {
	likeValue: number;
};

const PostItemDescription = ({ likeValue }: Props) => {
	return (
		<View>
			<Text>PostItemDescription</Text>
			<Like value={likeValue} />
		</View>
	);
};

export default PostItemDescription;
