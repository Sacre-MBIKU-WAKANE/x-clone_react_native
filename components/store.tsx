import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Image,
	useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import InputMultiSelect from "@/components/atoms/InputMultiSelect";
import { Colors } from "@/constants/Colors";
import { Sizes } from "@/constants/StylesSizes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useUser from "@/store/userData";
import Pricing from "@/components/molecules/Pricing";
import { useRouter } from "expo-router";
import CTAMain from "@/components/atoms/CTAMain";
import usePostData from "@/hooks/usePostData";
import { cleanAndTrimHTML } from "@/components/atoms/HtmlRenderer";
import RenderHTML from "react-native-render-html";

type Props = {};
// Types principaux
type Organization = {
	id: string;
	name: string;
};

type Sector = {
	id: string;
	name: string;
};

type Category = {
	id: string;
	name: string;
};

type FundCall = {
	id: string;
	title: string;
	organizationId: string;
	sectorId: string;
	categoryId: string;
	amount: string;
	deadline: string;
	description: string;
	cover: string;
};

type EnrichedFundCall = FundCall & {
	organizationName: string;
	sectorName: string;
	categoryName: string;
};

const organizations: Organization[] = [
	{ id: "1", name: "Organisation A" },
	{ id: "2", name: "Organisation B" },
	{ id: "3", name: "Organisation C" },
];

const sectors: Sector[] = [
	{ id: "1", name: "Agriculture" },
	{ id: "2", name: "Technologie" },
	{ id: "3", name: "Énergies renouvelables" },
];

const categories: Category[] = [
	{ id: "1", name: "Subventions" },
	{ id: "2", name: "Investissements" },
	{ id: "3", name: "Concours" },
];

const fundCalls: FundCall[] = [
	{
		id: "1",
		title: "Appel à projets innovants 2024",
		organizationId: "1",
		sectorId: "2",
		categoryId: "1",
		amount: "Jusqu'à 50 000 USD",
		deadline: "2024-12-15",
		description:
			"Soutien aux startups technologiques pour développer des solutions innovantes.",
		cover:
			"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
	},
	{
		id: "2",
		title: "Fonds pour l'agriculture durable",
		organizationId: "2",
		sectorId: "1",
		categoryId: "2",
		amount: "15 000 USD",
		deadline: "2024-11-30",
		description:
			"Programme de financement pour les entrepreneurs agricoles en Afrique.",
		cover:
			"https://images.unsplash.com/photo-1542744095-291d1f67b221?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
	},
	{
		id: "3",
		title: "Concours pour les énergies renouvelables",
		organizationId: "3",
		sectorId: "3",
		categoryId: "3",
		amount: "20 000 USD + accompagnement",
		deadline: "2025-01-10",
		description:
			"Compétition internationale pour des projets en énergies renouvelables.",
		cover:
			"https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
	},
];

const Store = (props: Props) => {
	const router = useRouter();
	const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
	const [selectedOrganization, setSelectedOrganization] = useState<
		string | null
	>(null);
	const { width } = useWindowDimensions();
	const [selectedSectors, setSelectedSectors] = useState<string>();
	const [selectedCategories, setSelectedCategories] = useState<string>();
	const { paid } = useUser((state) => state);
	const [getDiffusionsTrigger, setGetDiffusionsTrigger] =
		useState<boolean>(false);
	const { isLoading: diffusionLoading, data: diffusionData } = usePostData(
		getDiffusionsTrigger,
		setGetDiffusionsTrigger,
		"infos-user/connection/get",
		{}
	);

	useEffect(() => {
		setGetDiffusionsTrigger(true);
	}, []);

	const renderTab = ({ item }: { item: (typeof organizations)[0] }) => (
		<TouchableOpacity
			style={[styles.tab, selectedOrganization === item.id && styles.tabActive]}
			onPress={() =>
				setSelectedOrganization(
					selectedOrganization === item.id ? null : item.id
				)
			}
		>
			<Text
				style={[
					styles.tabText,
					selectedOrganization === item.id && styles.tabTextActive,
				]}
			>
				{item.name}
			</Text>
		</TouchableOpacity>
	);

	// Exemple d'appel

	const ListHeaderComponent = () => (
		<View style={styles.headerContainer}>
			{/* Onglets des organisations */}
			<FlatList
				data={organizations}
				renderItem={renderTab}
				keyExtractor={(item) => item.id.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.tabsContainer}
			/>

			{/* Multi-Select pour les secteurs */}
			<InputMultiSelect
				data={sectors.map((sector) => ({
					value: sector.id,
					label: sector.name,
				}))}
				placeholder='Secteurs'
				setSelectedValue={setSelectedSectors}
			/>
			<InputMultiSelect
				data={categories.map((sector) => ({
					value: sector.id,
					label: sector.name,
				}))}
				placeholder='Catégories'
				setSelectedValue={setSelectedCategories}
			/>
		</View>
	);
	return (
		<View
			style={{
				paddingVertical: Sizes.padding.screenVertical / 2,
				backgroundColor: Colors.light.white,
				flex: 1,
			}}
		>
			{paid ? (
				<>
					<View
						style={{
							paddingHorizontal: Sizes.padding.screenHorizontal,
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							paddingBottom: 14,
						}}
					>
						<Text style={{ fontSize: Sizes.fontSize.h5, fontWeight: "600" }}>
							Branchement
						</Text>
						<TouchableOpacity
							onPress={() => setIsFilterVisible((prev) => !prev)}
							style={{
								gap: 5,
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: Colors.light.gray,
								paddingVertical: 5,
								paddingHorizontal: 10,
								borderRadius: 12,
							}}
						>
							<Text style={{ color: Colors.light.white, fontWeight: "700" }}>
								Filtres
							</Text>
							<MaterialCommunityIcons
								name='filter'
								size={18}
								color={Colors.light.white}
							/>
						</TouchableOpacity>
					</View>

					{diffusionData?.data && (
						<FlatList
							showsVerticalScrollIndicator={false}
							data={diffusionData.data}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => {
										router.navigate({
											pathname: "/(tabs)/fund_details",
											params: {
												id: item?.id,
											},
										});
									}}
									style={styles.card}
								>
									<View style={styles.cardDescriptionContainer}>
										<Image
											borderRadius={8}
											source={{ uri: item.cover }}
											width={100}
										/>
										<View style={{ maxWidth: "70%", gap: 8 }}>
											<Text style={styles.cardTitle}>{item.name}</Text>
											<Text style={styles.amount}>{item.minPrice}$</Text>
											{/* <Text style={styles.cardSubtitle}>
												{
													organizations.find(
														(org) => org.id === item.organizationId
													)?.name
												}{" "}
												|{" "}
												{
													sectors.find((sector) => sector.id === item.sectorId)
														?.name
												}
											</Text> */}
											<RenderHTML
												contentWidth={width}
												source={{
													html: cleanAndTrimHTML(item.resume || "", 50),
												}}
												// defaultTextProps={{ style: styles.text }}
											/>
											{/* <Text style={styles.cardDescription}>
											{cleanAndTrimHTML(item.description || "")}
										</Text> */}
											<View style={{ flexDirection: "row" }}>
												<Text style={styles.cardDescription}>
													Date limite :
												</Text>
												<Text
													style={[
														styles.cardDescription,
														{ fontWeight: "800" },
													]}
												>
													{item.deadline || "2025-01-10"}
												</Text>
											</View>
										</View>
									</View>
									<TouchableOpacity style={{ marginTop: 5 }}>
										<Text
											style={{
												fontSize: Sizes.fontSize.importantText,
												textDecorationLine: "underline",
												fontWeight: "600",
											}}
										>
											Candidater
										</Text>
									</TouchableOpacity>
								</TouchableOpacity>
							)}
							ListHeaderComponent={
								isFilterVisible ? (
									ListHeaderComponent
								) : (
									<View style={{ marginTop: 20 }} />
								)
							}
							contentContainerStyle={{ paddingBottom: 20 }}
						/>
					)}
				</>
			) : (
				<Pricing />
			)}
		</View>
	);
};

export default Store;

const styles = StyleSheet.create({
	headerContainer: {
		padding: 16,
		backgroundColor: Colors.light.white,
	},
	tabsContainer: {
		marginBottom: 16,
	},
	tab: {
		padding: 10,
		borderRadius: 20,
		backgroundColor: Colors.light.grayBackground,
		marginRight: 10,
	},
	tabActive: {
		backgroundColor: Colors.light.red,
	},
	tabText: {
		color: "#000",
	},
	tabTextActive: {
		color: Colors.light.white,
	},
	multiSelect: {
		marginBottom: 16,
	},
	card: {
		paddingVertical: 16,
		paddingHorizontal: 8,
		margin: 10,
		backgroundColor: "#f9f9f9",
		borderRadius: 8,
		gap: 10,
	},
	cardDescriptionContainer: {
		flexDirection: "row",
		gap: 10,
	},
	cardTitle: {
		fontWeight: "bold",
		fontSize: 14,
	},
	cardSubtitle: {
		color: "#555",
		fontSize: 13,
		marginVertical: 4,
	},
	cardDescription: {
		color: "#777",
		fontSize: 12,
	},
	amount: {
		color: Colors.light.red,
		fontSize: 14,
		fontWeight: "600",
	},
});
