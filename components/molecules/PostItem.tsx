import { View, Text } from "react-native";
import PostItemLastReaction from "../atoms/PostItemLastReaction";
import PostItemDetails from "./PostItemDetails";
const PostItem = () => {
	return (
		<View>
			<PostItemLastReaction />
			<PostItemDetails />
		</View>
	);
};

export default PostItem;
