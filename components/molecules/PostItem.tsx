import { View, Text } from "react-native";
import PostItemLastReaction from "../atoms/PostItemLastReaction";
import PostItemDetails from "./PostItemDetails";
const PostItem = ({
	lastUserReacted,
	likeValue,
}: {
	lastUserReacted: string;
	likeValue: number;
}) => {
	return (
		<View style={{ gap: 15 }}>
			<PostItemLastReaction lastUserReacted={lastUserReacted || ""} />
			<PostItemDetails likeValue={likeValue} />
		</View>
	);
};

export default PostItem;
