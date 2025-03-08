import { View, Text } from "react-native";
import PostItemLastReaction from "../atoms/PostItemLastReaction";
const PostItem = () => {
	return (
		<View>
			<PostItemLastReaction />
			<View>
				<Text>Deuxième composant</Text>
			</View>
		</View>
	);
};

export default PostItem;
