import { View, Image } from "react-native";
import React from "react";

type Props = {};

const PostItemAvatar = (props: Props) => {
	return (
		<View>
			<Image
				height={100}
				width={100}
				borderRadius={100}
				source={{
					uri: "https://images.pexels.com/photos/28917763/pexels-photo-28917763/free-photo-of-femme-qui-travaille-sur-son-ordinateur.jpeg?auto=compress&cs=tinysrgb&w=1200",
				}}
			/>
		</View>
	);
};

export default PostItemAvatar;
