import PostItemLastReaction from "@/components/atoms/PostItemLastReaction";
import PostItem from "@/components/molecules/PostItem";
import styles from "@/constants/Styles";
import { View, Button, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
	return (
		<View style={styles.mainContainer}>
			<PostItem />
		</View>
	);
}
