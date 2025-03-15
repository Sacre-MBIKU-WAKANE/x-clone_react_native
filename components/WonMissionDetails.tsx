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

type WonMissionDetailsProps = {
	mission: {
		id: string;
		title: string;
		sector: string;
		status: string;
		budget: number;
		deadline: string;
		description: string;
		client: {
			name: string;
			image: string;
		};
	};
	onMarkComplete: () => void;
	onAdditionalOptions: () => void;
	setUnVisible: () => void;
};

const WonMissionDetails: React.FC<WonMissionDetailsProps> = ({
	mission,
	onMarkComplete,
	onAdditionalOptions,
	setUnVisible,
}) => {
	return (
		<ScrollView style={styles.container}>
			<TouchableOpacity
				onPress={setUnVisible}
				style={{
					backgroundColor: Colors.light.grayBackground,
					width: 34,
					height: 34,
					alignItems: "center",
					justifyContent: "center",
					borderRadius: Sizes.radius.middile,
					marginBottom: 15,
				}}
			>
				<Ionicons name='chevron-back-outline' size={24} color='black' />
			</TouchableOpacity>
			<Text style={styles.title}>{mission.title}</Text>

			<View style={styles.clientSection}>
				<Image
					source={{ uri: mission.client.image }}
					style={styles.clientImage}
				/>
				<View>
					<Text style={styles.clientName}>{mission.client.name}</Text>
					<Text style={styles.clientSector}>Secteur : {mission.sector}</Text>
				</View>
			</View>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%",
				}}
			>
				<Text style={styles.budget}>Budget : {mission.budget}€</Text>
				<View style={styles.statusRow}>
					<Text
						style={[
							styles.statusValue,
							mission.status.toLowerCase() === "en attente"
								? styles.status_en_attente
								: mission.status.toLowerCase() === "en cours"
									? styles.status_en_cours
									: styles.status_terminé,
						]}
					>
						{mission.status}
					</Text>
				</View>
			</View>

			<Text style={styles.deadline}>Deadline : {mission.deadline}</Text>

			<View style={styles.descriptionSection}>
				<Text style={styles.descriptionTitle}>Description :</Text>
				<Text style={styles.descriptionText}>{mission.description}</Text>
			</View>

			<View style={styles.buttonRow}>
				<TouchableOpacity
					style={styles.completeButton}
					onPress={onMarkComplete}
				>
					<Text style={styles.completeButtonText}>Marquer comme terminée</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.optionsButton}
					onPress={onAdditionalOptions}
				>
					<Text style={styles.optionsButtonText}>Options supplémentaires</Text>
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
	clientSection: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	clientImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 15,
	},
	clientName: {
		fontSize: Sizes.fontSize.importantText,
		fontWeight: "bold",
		color: Colors.light.text,
	},
	clientSector: {
		fontSize: 12,
		color: Colors.light.gray,
	},
	statusRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	statusLabel: {
		fontSize: 14,
		color: Colors.light.gray,
		fontWeight: "600",
		marginRight: 5,
	},
	statusValue: {
		fontSize: 12,
		fontWeight: "bold",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 15,
		textAlign: "center",
	},
	status_en_cours: {
		backgroundColor: Colors.light.orange,
		color: Colors.light.white,
	},
	status_terminé: {
		backgroundColor: Colors.light.green,
		color: Colors.light.white,
	},
	status_en_attente: {
		backgroundColor: Colors.light.grayBackground,
		color: Colors.light.white,
	},
	budget: {
		fontSize: 14,
		fontWeight: "600",
		color: Colors.light.red,
		marginBottom: 10,
	},
	deadline: {
		fontSize: 12,
		color: Colors.light.gray,
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
	completeButton: {
		backgroundColor: Colors.light.green,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 8,
	},
	completeButtonText: {
		color: Colors.light.white,
		fontWeight: "bold",
		fontSize: Sizes.fontSize.text,
	},
	optionsButton: {
		backgroundColor: Colors.light.redDisable,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 8,
	},
	optionsButtonText: {
		color: Colors.light.white,
		fontWeight: "bold",
		fontSize: Sizes.fontSize.text,
	},
});

export default WonMissionDetails;
