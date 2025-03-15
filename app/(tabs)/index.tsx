import PostItemLastReaction from "@/components/atoms/PostItemLastReaction";
import PostItem from "@/components/molecules/PostItem";
import styles from "@/constants/Styles";
import useTweets from "@/states/tweets";
import { View, Button, Text, StyleSheet, FlatList } from "react-native";

export default function HomeScreen() {
	const tweetsStates = useTweets((state) => state);
	return (
		<View style={styles.mainContainer}>
			<FlatList
				data={tweetsStates.tweets}
				renderItem={({ item }: any) => (
					<PostItem key={Math.random()} lastUserReacted={item} likeValue={12} />
				)}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}
