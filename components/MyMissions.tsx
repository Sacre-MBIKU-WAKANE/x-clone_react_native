import { Colors } from "@/constants/Colors";
import { Sizes } from "@/constants/StylesSizes";
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import WonMissionDetails from "./WonMissionDetails";
import PublishedMissions from "./PublishedMissions";

// Dummy data
const wonMissions = [
	{
		id: "1",
		title: "Développement d'une application mobile",
		sector: "Technologie",
		status: "En cours",
		budget: 5000,
		deadline: "2024-12-31",
		client: {
			name: "Jean Dupont",
			image: "https://randomuser.me/api/portraits/men/1.jpg",
		},
	},
	{
		id: "2",
		title: "Rénovation de bureaux",
		sector: "Construction",
		status: "Terminé",
		budget: 20000,
		deadline: "2024-10-15",
		client: {
			name: "Sophie Bernard",
			image: "https://randomuser.me/api/portraits/women/2.jpg",
		},
	},
];

const publishedMissions = [
	{
		id: "1",
		title: "Création d'une identité visuelle",
		sector: "Design",
		status: "En attente",
		budget: 800,
		images: [
			"https://via.placeholder.com/400x200",
			"https://via.placeholder.com/400x200?text=Image+2",
		],
		candidates: 5,
	},
	{
		id: "2",
		title: "Campagne publicitaire digitale",
		sector: "Marketing",
		status: "En cours",
		budget: 1500,
		images: [
			"https://via.placeholder.com/400x200",
			"https://via.placeholder.com/400x200?text=Image+2",
		],
		provider: {
			name: "Alice Martin",
			image: "https://randomuser.me/api/portraits/women/3.jpg",
		},
	},
];

const MyMissions = () => {
	const [activeTab, setActiveTab] = useState<"won" | "published">("won");
	const [missionDetailsVisible, setMissionDetailsVisible] =
		useState<boolean>(false);
	const [myMissionDetailsVisible, setMyMissionDetailsVisible] =
		useState<boolean>(false);
	const [selectedWonMission, setSelectdMission] = useState<any>();
	const [selectedPublishedWonMission, setSelectdPublishedMission] =
		useState<any>();

	const handleMarkComplete = () => {
		alert("Mission marquée comme terminée !");
	};

	const handleAdditionalOptions = () => {
		alert("Options supplémentaires ouvertes !");
	};
	const handleEditMission = () => alert("Modifier la mission !");
	const handleCloseMission = () => alert("Mission fermée !");

	const renderWonMissionCard = ({
		item,
	}: {
		item: (typeof wonMissions)[0];
	}) => (
		<View style={styles.card}>
			<View style={styles.cardHeader}>
				<Text style={styles.cardTitle}>{item.title}</Text>
				<Text
					style={[
						styles.status,
						item.status.toLowerCase() === "en attente"
							? styles.status_en_attente
							: item.status.toLowerCase() === "en cours"
								? styles.status_en_cours
								: styles.status_terminé,
					]}
				>
					{item.status}
				</Text>
			</View>
			<View style={styles.cardRow}>
				<Image
					source={{ uri: item.client.image }}
					style={styles.profileImage}
				/>
				<Text style={styles.cardClient}>{item.client.name}</Text>
			</View>
			<Text style={styles.cardSector}>Secteur : {item.sector}</Text>
			<Text style={styles.cardBudget}>Budget : {item.budget}$</Text>
			<Text style={styles.cardDeadline}>Deadline : {item.deadline}</Text>
			<TouchableOpacity
				onPress={() => setSelectdMission(item)}
				style={styles.detailsButton}
			>
				<Text style={styles.detailsButtonText}>Voir détails</Text>
			</TouchableOpacity>
		</View>
	);

	useEffect(() => {
		if (selectedWonMission) {
			setMissionDetailsVisible(true);
		}
	}, [selectedWonMission]);

	useEffect(() => {
		if (selectedPublishedWonMission) {
			setMyMissionDetailsVisible(true);
		}
	}, [selectedPublishedWonMission]);

	const renderPublishedMissionCard = ({
		item,
	}: {
		item: (typeof publishedMissions)[0];
	}) => (
		<View style={styles.card}>
			<View style={styles.cardHeader}>
				<Text style={styles.cardTitle}>{item.title}</Text>
				<Text
					style={[
						styles.status,
						item.status.toLowerCase() === "en attente"
							? styles.status_en_attente
							: item.status.toLowerCase() === "en cours"
								? styles.status_en_cours
								: styles.status_terminé,
					]}
				>
					{item.status}
				</Text>
			</View>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{item.images.map((img, index) => (
					<Image key={index} source={{ uri: img }} style={styles.coverImage} />
				))}
			</ScrollView>
			<Text style={styles.cardSector}>Secteur : {item.sector}</Text>
			<Text style={styles.cardBudget}>Budget : {item.budget}$</Text>
			{item.provider ? (
				<View style={styles.cardRow}>
					<Image
						source={{ uri: item.provider.image }}
						style={styles.profileImage}
					/>
					<Text style={styles.cardClient}>{item.provider.name}</Text>
				</View>
			) : (
				<Text style={styles.cardCandidates}>{item.candidates} candidats</Text>
			)}
			<TouchableOpacity
				onPress={() => setSelectdPublishedMission(item)}
				style={styles.detailsButton}
			>
				<Text style={styles.detailsButtonText}>Voir détails</Text>
			</TouchableOpacity>
		</View>
	);

	const data = activeTab === "won" ? wonMissions : publishedMissions;

	return missionDetailsVisible ? (
		<WonMissionDetails
			mission={selectedWonMission}
			onMarkComplete={handleMarkComplete}
			onAdditionalOptions={handleAdditionalOptions}
			setUnVisible={() => {
				setMissionDetailsVisible(false);
			}}
		/>
	) : myMissionDetailsVisible ? (
		<PublishedMissions
			mission={selectedWonMission}
			onEditMission={handleEditMission}
			onCloseMission={handleCloseMission}
			onBack={() => {
				setMyMissionDetailsVisible(false);
			}}
		/>
	) : (
		<View style={styles.container}>
			<View style={styles.tabs}>
				<TouchableOpacity
					style={[styles.tab, activeTab === "won" && styles.activeTab]}
					onPress={() => setActiveTab("won")}
				>
					<Text
						style={[
							styles.tabText,
							activeTab === "won" && styles.activeTabText,
						]}
					>
						Missions gagnées
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tab, activeTab === "published" && styles.activeTab]}
					onPress={() => setActiveTab("published")}
				>
					<Text
						style={[
							styles.tabText,
							activeTab === "published" && styles.activeTabText,
						]}
					>
						Missions publiées
					</Text>
				</TouchableOpacity>
			</View>

			<FlatList
				data={data}
				renderItem={
					activeTab === "won"
						? renderWonMissionCard
						: renderPublishedMissionCard
				}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={
					<Text style={styles.empty}>
						Aucune mission trouvée dans cette catégorie.
					</Text>
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 20,
	},
	tabs: {
		flexDirection: "row",
		marginBottom: 15,
		gap: 15,
	},
	tab: {
		flex: 1,
		padding: 10,
		alignItems: "center",
		backgroundColor: Colors.light.grayBackground,
		borderRadius: 8,
	},
	activeTab: {
		backgroundColor: Colors.light.red,
	},
	tabText: {
		fontSize: Sizes.fontSize.text,
		color: Colors.light.text,
	},
	activeTabText: {
		color: Colors.light.white,
		fontWeight: "bold",
	},
	card: {
		backgroundColor: Colors.light.white,
		borderRadius: 8,
		padding: 15,
		marginBottom: 15,
		borderWidth: 1,
		borderColor: Colors.light.grayBackground,
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	cardTitle: {
		fontSize: Sizes.fontSize.importantText,
		fontWeight: "bold",
		color: Colors.light.text,
		width: "75%",
	},
	status: {
		fontSize: 12,
		paddingVertical: 4,
		paddingHorizontal: 10,
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
	cardSector: {
		fontSize: 12,
		color: Colors.light.gray,
		fontWeight: "bold",
		marginBottom: 5,
	},
	cardBudget: {
		fontSize: 14,
		color: Colors.light.red,
		fontWeight: "600",
		marginBottom: 10,
	},
	cardDeadline: {
		fontSize: 12,
		color: Colors.light.gray,
		marginBottom: 10,
	},
	cardRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
	profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
	cardClient: { fontSize: 14, color: Colors.light.text },
	coverImage: { width: 200, height: 100, borderRadius: 8, marginRight: 10 },
	cardCandidates: {
		fontSize: 12,
		color: Colors.light.gray,
		marginBottom: 10,
	},
	detailsButton: {
		backgroundColor: Colors.light.red,
		paddingVertical: 10,
		borderRadius: 8,
		alignItems: "center",
	},
	detailsButtonText: { color: Colors.light.white, fontWeight: "bold" },
	empty: { textAlign: "center", color: "#888", marginTop: 20, fontSize: 16 },
});

export default MyMissions;
