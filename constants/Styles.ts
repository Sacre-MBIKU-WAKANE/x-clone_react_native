import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	flexRowContainer: {
		flexDirection: "row",
		gap: 15,
		alignItems: "center",
	},
	mainContainer: {
		paddingHorizontal: "5%",
		backgroundColor: "#f1f1f1",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 15,
		paddingVertical: 80,
	},
	element: { flex: 1 },
	firstElement: { backgroundColor: "red" },
	secondElement: { backgroundColor: "blue" },
});
export default styles;
