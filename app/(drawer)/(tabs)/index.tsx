import PostItemLastReaction from "@/components/atoms/PostItemLastReaction";
import PostItem from "@/components/molecules/PostItem";
import styles from "@/constants/Styles";
import useAuthUser from "@/states/authUser";
import useTweets from "@/states/tweets";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
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
	const authUser = useAuthUser((state: any) => state);

	useEffect(() => {
		console.log("Le composant est monté");
		if (!authUser?.isConnected) {
			navigation.navigate("/(public)");
		}
	}, [authUser?.isConnected]);

	return (
		<View style={styles.mainContainer}>
			<TouchableOpacity
				onPress={() => {
					authUser?.logout();
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
