import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Alert,
	Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { MultiSelect } from "react-native-element-dropdown";
import CTAMain from "../atoms/CTAMain";
import InputStyles from "@/constants/InputSyles";
import { Colors } from "@/constants/Colors";
import InputMultiSelect from "../atoms/InputMultiSelect";
import { SimpleLineIcons } from "@expo/vector-icons";
import InputDatePicker from "./InputDatePicker";
import { parseDate } from "./FormEvent";
import useUser from "@/store/userData";
import useUploadMedia from "@/hooks/useUploadMedia";
import MediaPicker from "./MediaPicker";
import usePostData from "@/hooks/usePostData";
import useGetData from "@/hooks/useGetData";
import { Sizes } from "@/constants/StylesSizes";

type Props = {
	setOpen?: Dispatch<SetStateAction<boolean>>;
	setGetDataTrigger: Dispatch<SetStateAction<boolean>>;
	itemToUpdate: any;
	formType: "create" | "update";
	setPostFormClosed?: any;
};

const FormOpportunies: React.FC<Props> = ({
	setOpen,
	formType,
	itemToUpdate,
	setGetDataTrigger,
	setPostFormClosed,
}) => {
	const { userInfo } = useUser((state) => state);
	const [startDate, setStartDate] = useState<string>();
	const [selectedSector, setSetSelectedSector] = useState<string>();
	const { control, handleSubmit, reset } = useForm<FormData>();
	const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
	const [coverImage, setCoverImage] = useState<string | null>(null);
	const [presentationCoverType, setPresentationCoverType] = useState<string>();
	const [presentationCover, setPresentationCover] = useState<any>();
	const [files, setFiles] = useState<DocumentPicker.DocumentPickerResult[]>([]);
	const [formIsTrigger, setFormIsTrigger] = useState<boolean>(false);
	const [submittedData, setSubmittedData] = useState<any>(null);
	const [getSectorsTrigger, setGetSectorsTrigger] = useState<boolean>(true);
	const [sectors, setSectors] = useState<{ label: string; value: string }[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState(false);

	const {
		loading: presentationLoading,
		mediaType: presentationMediaType,
		mediaUri: presentationMediaURI,
		pickMedia: presentationPickMedia,
		uploadMedia: presentationUploadMedia,
		media: presentationMedia,
	} = useUploadMedia();
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

	const {
		isLoading: sectorsLoading,
		error: sectorsLoadingError,
		dataInfoLoaded: sectorsLoaded,
		data: sectorsData,
	} = useGetData(getSectorsTrigger, setGetSectorsTrigger, "sectors");

	useEffect(() => {
		if (sectorsData && sectorsData.data) {
			setSectors((prev) =>
				sectorsData.data.map((sector: any) => ({
					label: sector.name,
					value: sector.id,
				}))
			);
		}
	}, [sectorsData]);

	interface FormData {
		title: string;
		description: string;
		budget: string;
	}

	useEffect(() => {
		console.log({
			formData: formData?.data,
			formLoadingError,
		});
		if (formData && formData?.data && setPostFormClosed) {
			Alert.alert("Offre créée avec succès");
			setPostFormClosed("");
		}
	}, [formLoadingError, formData]);

	const onSubmit = async (data: FormData) => {
		setIsLoading(true);
		const uploadResponseURI = await presentationUploadMedia(presentationMedia);
		const isoStringFirst = parseDate(startDate);
		const payload = {
			owner: userInfo.id,
			name: data.title,
			title: data.title,
			startDate: isoStringFirst,
			cover: uploadResponseURI,
			files,
			sectors: selectedSector,
			type: "callForTender",
			minPrice: data.budget,
			description: data?.description,
		};

		console.log("Appel d'offre soumis:", payload);
		setSubmittedData(payload);
		setFormIsTrigger(true);
		reset();
		setSelectedSectors([]);
		setCoverImage(null);
		setFiles([]);
		setIsLoading(false);
		setOpen && setOpen(false);
	};

	const handlePickFiles = async () => {
		const result = await DocumentPicker.getDocumentAsync({
			type: "*/*",
			multiple: true,
		});

		if (!result.canceled) {
			setFiles([...files, result]);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Controller
				control={control}
				name='title'
				rules={{ required: "Le titre est obligatoire." }}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<View style={InputStyles.inputContainerSecondary}>
						<TextInput
							style={InputStyles.inputSecondary}
							placeholder="Titre de l'appel d'offre"
							value={value}
							onChangeText={onChange}
						/>
						{error && <Text style={styles.errorText}>{error.message}</Text>}
					</View>
				)}
			/>

			<Controller
				control={control}
				name='description'
				rules={{ required: "La description est obligatoire." }}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<View style={InputStyles.inputContainerSecondary}>
						<TextInput
							style={[InputStyles.inputSecondary, styles.textArea]}
							placeholder="Description de l'appel d'offre"
							value={value}
							onChangeText={onChange}
							multiline
						/>
						{error && <Text style={styles.errorText}>{error.message}</Text>}
					</View>
				)}
			/>

			<View style={{ gap: 10 }}>
				<Text>Date limite de dépôt :</Text>
				<InputDatePicker setSetSelectedDate={setStartDate} />
			</View>

			<InputMultiSelect
				leftIcon={() => (
					<SimpleLineIcons name='organization' size={20} color='black' />
				)}
				setSelectedValue={setSetSelectedSector}
				data={sectors}
				placeholder='Secteurs concernés'
			/>

			<Controller
				control={control}
				name='budget'
				rules={{ required: "Le budget est obligatoire." }}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<View style={InputStyles.inputContainerSecondary}>
						<TextInput
							style={InputStyles.inputSecondary}
							placeholder='Budget'
							keyboardType='numeric'
							value={value}
							onChangeText={onChange}
						/>
						{error && <Text style={styles.errorText}>{error.message}</Text>}
					</View>
				)}
			/>

			<Text style={styles.label}>Image de couverture</Text>
			<MediaPicker
				pickMedia={presentationPickMedia}
				loading={presentationLoading}
				setCoverType={setPresentationCoverType}
				setCover={setPresentationCover}
				selectedImage={presentationMediaURI}
				selectedImageType={presentationMediaType}
			/>
			{coverImage && (
				<Image source={{ uri: coverImage }} style={styles.coverImage} />
			)}

			<Text style={styles.label}>Fichiers supplémentaires</Text>
			<TouchableOpacity style={styles.uploadButton} onPress={handlePickFiles}>
				<Text style={styles.uploadText}>Ajouter des fichiers</Text>
			</TouchableOpacity>
			{files.length > 0 &&
				files.map((file, index) => (
					<Text key={index} style={styles.fileName}>
						{"uri" in file
							? (
									file as DocumentPicker.DocumentPickerSuccessResult
								)?.assets[0]?.uri
									.split("/")
									.pop()
							: "Fichier non valide"}
					</Text>
				))}

			<CTAMain
				loading={isLoading || formLoading}
				disable={isLoading || formLoading}
				title="Créer l'appel d'offre"
				action={handleSubmit(onSubmit)}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		marginBottom: Sizes.padding.screenVertical * 7,
	},
	textArea: {
		alignSelf: "flex-start",
		justifyContent: "flex-start",
		paddingTop: 8,
		height: 120,
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
		color: Colors.light.text,
	},
	multiSelect: {
		backgroundColor: "#f0f0f0",
		borderRadius: 8,
		padding: 10,
		marginBottom: 16,
	},
	placeholderStyle: {
		fontSize: 14,
		color: "#aaa",
	},
	selectedTextStyle: {
		fontSize: 14,
		color: Colors.light.text,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 14,
	},
	errorText: {
		color: "red",
		fontSize: 12,
		marginTop: 4,
	},
	uploadButton: {
		backgroundColor: Colors.light.red,
		padding: 10,
		borderRadius: 8,
		marginBottom: 16,
	},
	uploadText: {
		color: "#fff",
		textAlign: "center",
		fontSize: 16,
	},
	coverImage: {
		width: "100%",
		height: 200,
		borderRadius: 8,
		marginBottom: 16,
	},
	fileName: {
		color: Colors.light.text,
		fontSize: 14,
		marginBottom: 8,
	},
});

export default FormOpportunies;
