import PostItemLastReaction from "@/components/atoms/PostItemLastReaction";
import PostItem from "@/components/molecules/PostItem";
import styles from "@/constants/Styles";
import useTweets from "@/states/tweets";
import { Link, useRouter } from "expo-router";
import {
	View,
	Button,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from "react-native";

export default function HomeScreen() {
	const tweetsStates = useTweets((state) => state);
	const navigation = useRouter();
	return (
		<View style={styles.mainContainer}>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("/(public)");
				}}
			>
				<Text>Se déconnecter</Text>
			</TouchableOpacity>

			<FlatList
				data={tweetsStates?.tweets}
				renderItem={({ item }: any) => (
					<PostItem
						key={Math.random()}
						lastUserReacted={item.like}
						likeValue={12}
					/>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}
