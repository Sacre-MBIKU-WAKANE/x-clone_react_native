import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Sizes } from "@/constants/StylesSizes";
import { Ionicons } from "@expo/vector-icons";

type PublishedMissionDetailsProps = {
	mission: {
		id: string;
		title: string;
		category: string;
		status: string;
		budget: number;
		deadline: string;
		description: string;
		applicants: number;
		publishedDate: string;
		client: {
			name: string;
			image: string;
		};
	};
	onEditMission: () => void;
	onCloseMission: () => void;
	onBack: () => void;
};

const PublishedMissionDetails: React.FC<PublishedMissionDetailsProps> = ({
	mission,
	onEditMission,
	onCloseMission,
	onBack,
}) => {
	return (
		<ScrollView style={styles.container}>
			<TouchableOpacity onPress={onBack} style={styles.backButton}>
				<Ionicons name='chevron-back-outline' size={24} color='black' />
			</TouchableOpacity>

			<Text style={styles.title}>{mission.title}</Text>

			<View style={styles.posterSection}>
				<Image
					source={{ uri: mission.client.image }}
					style={styles.posterImage}
				/>
				<View>
					<Text style={styles.posterName}>{mission.client.name}</Text>
					<Text style={styles.category}>Catégorie : {mission.category}</Text>
				</View>
			</View>

			<View style={styles.infoRow}>
				<Text style={styles.budget}>Budget : {mission.budget}€</Text>
				<View style={styles.statusContainer}>
					<Text
						style={[
							styles.statusText,
							mission.status.toLowerCase() === "ouverte"
								? styles.status_open
								: styles.status_closed,
						]}
					>
						{mission.status}
					</Text>
				</View>
			</View>

			<Text style={styles.deadline}>Deadline : {mission.deadline}</Text>
			<Text style={styles.publishedDate}>
				Publiée le : {mission.publishedDate}
			</Text>

			<Text style={styles.applicants}>
				Nombre de candidatures : {mission.applicants}
			</Text>

			<View style={styles.descriptionSection}>
				<Text style={styles.descriptionTitle}>Description :</Text>
				<Text style={styles.descriptionText}>{mission.description}</Text>
			</View>

			<View style={styles.buttonRow}>
				<TouchableOpacity style={styles.editButton} onPress={onEditMission}>
					<Text style={styles.editButtonText}>Modifier la mission</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.closeButton} onPress={onCloseMission}>
					<Text style={styles.closeButtonText}>Fermer la mission</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.white,
		paddingVertical: 20,
		paddingHorizontal: 15,
	},
	backButton: {
		backgroundColor: Colors.light.grayBackground,
		width: 34,
		height: 34,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: Sizes.radius.middile,
		marginBottom: 15,
	},
	title: {
		fontSize: Sizes.fontSize.h2,
		fontWeight: "bold",
		color: Colors.light.text,
		marginBottom: 25,
		paddingBottom: 10,
		borderBottomColor: Colors.light.grayBackground,
		borderBottomWidth: 1,
	},
	posterSection: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	posterImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 15,
	},
	posterName: {
		fontSize: Sizes.fontSize.importantText,
		fontWeight: "bold",
		color: Colors.light.text,
	},
	category: {
		fontSize: 12,
		color: Colors.light.gray,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
	},
	budget: {
		fontSize: 14,
		fontWeight: "600",
		color: Colors.light.red,
	},
	deadline: {
		fontSize: 12,
		color: Colors.light.gray,
		marginBottom: 10,
	},
	publishedDate: {
		fontSize: 12,
		color: Colors.light.gray,
		marginBottom: 20,
	},
	statusContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	statusText: {
		fontSize: 12,
		fontWeight: "bold",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 15,
		textAlign: "center",
	},
	status_open: {
		backgroundColor: Colors.light.green,
		color: Colors.light.white,
	},
	status_closed: {
		backgroundColor: Colors.light.red,
		color: Colors.light.white,
	},
	applicants: {
		fontSize: 14,
		color: Colors.light.text,
		fontWeight: "600",
		marginBottom: 20,
	},
	descriptionSection: {
		marginBottom: 20,
	},
	descriptionTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: Colors.light.text,
		marginBottom: 5,
	},
	descriptionText: {
		fontSize: 14,
		color: Colors.light.gray,
		lineHeight: 20,
	},
	buttonRow: {
		flexDirection: "row",
		marginTop: 20,
		gap: 20,
		width: "100%",
	},
	editButton: {
		backgroundColor: Colors.light.orange,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 8,
	},
	editButtonText: {
		color: Colors.light.white,
		fontWeight: "bold",
		fontSize: Sizes.fontSize.text,
	},
	closeButton: {
		backgroundColor: Colors.light.redDisable,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 8,
	},
	closeButtonText: {
		color: Colors.light.white,
		fontWeight: "bold",
		fontSize: Sizes.fontSize.text,
	},
});

export default PublishedMissionDetails;
