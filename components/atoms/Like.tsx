import { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import React from "react";

type Props = {
	value: number;
};

const Like = () => {
	const [likeValue, setLike] = useState(0);

	const incrementLikeValue = () => {
		setLike((value) => {
			const incrementValue = value + 1;
			return incrementValue;
		});
	};
	return (
		<TouchableOpacity
			onPress={incrementLikeValue}
			style={{
				paddingVertical: 5,
				paddingHorizontal: 15,
				backgroundColor: "#687684",
				width: 100,
				borderRadius: 12,
				marginTop: 15,
				alignItems: "center",
			}}
		>
			<Text style={{ color: "white" }}>Like : {likeValue}</Text>
		</TouchableOpacity>
	);
};

export default Like;
