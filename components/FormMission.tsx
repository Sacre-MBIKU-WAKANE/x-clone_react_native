import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
	FlatList,
	Alert,
	ScrollView,
	Modal,
	TouchableWithoutFeedback,
	ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import InputStyles from "@/constants/InputSyles";
import { Colors } from "@/constants/Colors";
import CTAMain from "../atoms/CTAMain";
import InputDatePicker from "./InputDatePicker";
import useGetData from "@/hooks/useGetData";
import InputDropdown from "../atoms/InputDropdown";
import Loader from "../atoms/Loader";
import InputMultiSelect from "../atoms/InputMultiSelect";
import { parseDate } from "./FormEvent";
import { uploadMedia } from "@/utils/uploadMedia";
import usePostData from "@/hooks/usePostData";
import useUser from "@/store/userData";
import { Sizes } from "@/constants/StylesSizes";

type Props = {
	setOpen?: Dispatch<SetStateAction<boolean>>;
	setGetDataTrigger: Dispatch<SetStateAction<boolean>>;
	itemToUpdate: any;
	formType: "create" | "update";
	setPostFormClosed?: any;
};

const FormMission = ({
	setOpen,
	formType,
	itemToUpdate,
	setGetDataTrigger,
	setPostFormClosed,
}: Props) => {
	const { userInfo } = useUser((state) => state);

	const [media, setMedia] = useState<
		Array<{ uri: string; type: string; base64: any }>
	>([]);
	const [collaborators, setCollaborators] = useState<any[]>([]);
	const [isMediaLoading, setIsMediaLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [searchText, setSearchText] = useState("");
	const { control, handleSubmit, reset } = useForm();
	const [formIsTrigger, setFormIsTrigger] = useState<boolean>(false);
	const [getIsTrigger, setGetIsTrigger] = useState<boolean>(true);
	const [skills, setSkills] = useState<{ label: string; value: string }[]>([]);
	const [selectedSkill, setSetSelectedSkill] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);
	const [submittedData, setSubmittedData] = useState<any>(null);

	const { data: skillsData } = useGetData(
		getIsTrigger,
		setGetIsTrigger,
		"skills"
	);
	const {
		isLoading: formLoading,
		error: formLoadingError,
		dataInfoLoaded: formLoaded,
		data: formData,
		message: formMessage,
		setError: setFormError,
		setMessage: setFormMessage,
	} = usePostData(
		formIsTrigger,
		setFormIsTrigger,
		"infos-user/user-diffusion/create",
		submittedData
	);

	useEffect(() => {
		if (skillsData && skillsData.data && skillsData.data.length) {
			setSkills((prev) =>
				skillsData.data.map(({ id, name }: { id: string; name: string }) => {
					return {
						value: id,
						label: name,
					};
				})
			);
		}
	}, [skillsData]);

	useEffect(() => {
		if (formData && formData?.data && setPostFormClosed) {
			Alert.alert("Mission créée avec succès");
			setPostFormClosed("");
		}
	}, [formLoadingError, formData]);

	const pickImageOrVideo = async () => {
		setIsMediaLoading(true);
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsMultipleSelection: true,
			quality: 1,
			base64: true,
		});

		if (!result.canceled) {
			setMedia([
				...media,
				...result.assets.map((asset) => ({
					uri: asset.uri,
					type: asset.type || "unknown",
					base64: asset.base64,
				})),
			]);
		}
		setIsMediaLoading(false);
	};

	const onSubmit = async (data: any) => {
		setIsLoading(true);
		const images = await Promise.all(
			media.map(async (image) => {
				const url = await uploadMedia(image);

				return url;
			})
		);
		const isoStringFirst = parseDate(data.startDate);
		const isoStringSecond = parseDate(data.endDate);
		const payload = {
			name: data.title,
			title: data.title,
			description: data.description,
			startDate: isoStringFirst,
			deadline: isoStringSecond,
			owner: userInfo.id,
			pictures: images,
			selectedSkill,
			cover: images[0] || "",
			minPrice: data.budget,
			type: "service",
		};
		setSubmittedData(payload);
		setFormIsTrigger(true);
		reset();
		setMedia([]);
		setCollaborators([]);
		setIsLoading(false);
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Controller
				control={control}
				name='title'
				rules={{ required: "Le titre est obligatoire" }}
				render={({ field: { onChange, value } }) => (
					<View style={InputStyles.inputContainerSecondary}>
						<TextInput
							style={InputStyles.inputSecondary}
							placeholder='Titre de la mission'
							value={value}
							onChangeText={onChange}
						/>
					</View>
				)}
			/>

			<Controller
				control={control}
				name='description'
				rules={{ required: "La description est obligatoire" }}
				render={({ field: { onChange, value } }) => (
					<View style={InputStyles.inputContainerSecondary}>
						<TextInput
							style={[
								InputStyles.inputSecondary,
								{ alignSelf: "flex-start", height: 100 },
							]}
							placeholder='Description détaillée de la mission'
							value={value}
							onChangeText={onChange}
							multiline
						/>
					</View>
				)}
			/>

			{skills && skills.length ? (
				<InputMultiSelect
					leftIcon={() => (
						<SimpleLineIcons name='organization' size={20} color='black' />
					)}
					setSelectedValue={setSetSelectedSkill}
					data={skills}
					placeholder='Compétences requises'
				/>
			) : (
				<Loader />
			)}

			<Controller
				control={control}
				name='startDate'
				render={({ field: { onChange, value } }) => (
					<View style={styles.dateInputContainer}>
						<Text style={styles.label}>Date de début</Text>
						<InputDatePicker
							placeholder='Date de début'
							setSetSelectedDate={onChange}
						/>
					</View>
				)}
			/>

			<Controller
				control={control}
				name='endDate'
				render={({ field: { onChange, value } }) => (
					<View style={styles.dateInputContainer}>
						<Text style={styles.label}>Date de fin</Text>
						<InputDatePicker
							placeholder='Date de fin'
							setSetSelectedDate={onChange}
						/>
					</View>
				)}
			/>

			<Controller
				control={control}
				name='budget'
				render={({ field: { onChange, value } }) => (
					<View style={InputStyles.inputContainerSecondary}>
						<TextInput
							style={InputStyles.inputSecondary}
							placeholder='Budget (en $)'
							value={value}
							onChangeText={onChange}
							keyboardType='numeric'
						/>
					</View>
				)}
			/>

			<TouchableOpacity style={styles.imagePicker} onPress={pickImageOrVideo}>
				<Text style={styles.imagePickerText}>Ajouter des médias</Text>
			</TouchableOpacity>
			{isMediaLoading ? (
				<ActivityIndicator size='large' color={Colors.light.red} />
			) : (
				<FlatList
					data={media}
					keyExtractor={(item, index) => `${item.uri}-${index}`}
					horizontal
					style={{ paddingBottom: 15 }}
					renderItem={({ item }) => (
						<Image source={{ uri: item.uri }} style={styles.mediaPreview} />
					)}
				/>
			)}

			<CTAMain
				loading={isLoading || formLoading}
				disable={isLoading || formLoading}
				title='Créer la mission'
				action={handleSubmit(onSubmit)}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		marginBottom: Sizes.padding.screenVertical * 6,
	},
	imagePicker: {
		marginVertical: 15,
		backgroundColor: "#f0f0f0",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
	},
	imagePickerText: {
		color: Colors.light.red,
		fontWeight: "bold",
	},
	mediaPreview: {
		width: 100,
		height: 100,
		borderRadius: 8,
		marginRight: 8,
	},
	label: {
		fontSize: 16,
		marginVertical: 12,
	},
	addCollaboratorButton: {
		backgroundColor: Colors.light.red,
		padding: 10,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 10,
	},
	addCollaboratorText: {
		color: "#fff",
		fontWeight: "bold",
	},
	collaboratorItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
		justifyContent: "space-between", // Pour aligner les éléments
		paddingHorizontal: 10,
	},
	collaboratorAvatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 8,
	},
	collaboratorName: {
		flex: 1,
		fontSize: 16,
	},

	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: "#fff",
		margin: 20,
		padding: 20,
		borderRadius: 8,
	},
	searchInput: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
		marginBottom: 10,
	},
	userItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	userAvatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 10,
	},
	userName: {
		fontSize: 16,
	},
	dateContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 10,
	},

	dateInputContainer: {
		flex: 1,
		marginHorizontal: 5,
	},

	dateInput: {
		borderWidth: 1,
		borderColor: Colors.light.gray,
		borderRadius: 8,
		padding: 20,
		backgroundColor: "#fff",
		color: Colors.dark.text,
		fontSize: 14,
	},
});

export default FormMission;
