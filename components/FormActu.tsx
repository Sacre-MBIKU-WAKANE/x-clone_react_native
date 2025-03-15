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
	ActivityIndicator,
	Modal,
	TouchableWithoutFeedback,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import InputStyles from "@/constants/InputSyles";
import { Colors } from "@/constants/Colors";
import CTAMain from "../atoms/CTAMain";
import usePostData from "@/hooks/usePostData";
import { Sizes } from "@/constants/StylesSizes";
import useUploadMedia from "@/hooks/useUploadMedia";
import { uploadMedia } from "@/utils/uploadMedia";
import useUser from "@/store/userData";

type Props = {
	setOpen?: Dispatch<SetStateAction<boolean>>;
	setGetDataTrigger: Dispatch<SetStateAction<boolean>>;
	itemToUpdate: any;
	formType: "create" | "update";
	setPostFormClosed?: any;
};

const FormActu = ({
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
	const { control, handleSubmit, reset } = useForm();
	const [searchUser, setSearchUser] = useState<string>("");
	const [inputSearchIsActive, setInputSearchIsActive] =
		useState<boolean>(false);
	const [submittedData, setSubmittedData] = useState<any>(null);
	const [formIsTrigger, setFormIsTrigger] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(false);
	const {
		isLoading: userSearchLoading,
		error: userSearchLoadingError,
		dataInfoLoaded: userSearchLoaded,
		data: userSearchData,
		message: userSearchMessage,
		setError: setUserSearchError,
		setMessage: setUserSearchMessage,
	} = usePostData(
		inputSearchIsActive,
		setInputSearchIsActive,
		"infos-user/user/get",
		{
			name: searchUser,
		}
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
		if (formData && formData?.data && setPostFormClosed) {
			Alert.alert("Actualité créé avec succès");
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

	const removeCollaborator = (id: number) => {
		setCollaborators(collaborators.filter((collab) => collab.id !== id));
	};

	const onSubmit = async (data: any) => {
		setIsLoading(true);
		const images = await Promise.all(
			media.map(async (image) => {
				const url = await uploadMedia(image);
				console.log({ url });

				return url;
			})
		);

		const payload = {
			...data,
			images,
			type: "post",
			users: collaborators?.map((user) => user.id),
			owner: userInfo.id,
		};
		setSubmittedData(payload);
		setFormIsTrigger(true);
		reset();
		setMedia([]);
		setCollaborators([]);
		setIsLoading(true);
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
							placeholder="Titre de l'actualité"
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
								{
									alignSelf: "flex-start",
									justifyContent: "flex-start",
									paddingTop: 0,
									height: 100,
								},
							]}
							placeholder='Décrivez votre actualité en détail'
							value={value}
							onChangeText={onChange}
							multiline
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
					renderItem={({ item }) => (
						<Image source={{ uri: item.uri }} style={styles.mediaPreview} />
					)}
				/>
			)}

			<Text style={styles.sectionTitle}>Collaborateurs</Text>
			<View style={{ position: "relative", width: "100%" }}>
				<TextInput
					style={styles.input}
					placeholder='Nom'
					onBlur={() => {
						setSearchUser("");
						setInputSearchIsActive(true);
					}}
					value={searchUser}
					onChangeText={(value) => {
						setSearchUser((prev: string) => {
							if (prev !== value && value.length > 0) {
								setTimeout(() => setInputSearchIsActive(true), 1000);

								return value;
							}
							return value;
						});
					}}
				/>
				{userSearchLoading ? (
					<ActivityIndicator
						style={{
							position: "absolute",
							right: 10,
							top: 10,
						}}
						size='small'
						color={Colors.light.red}
					/>
				) : userSearchData &&
				  userSearchData?.data &&
				  userSearchData?.data?.length &&
				  searchUser.length > 0 ? (
					<FlatList
						style={{
							padding: 10,
							backgroundColor: Colors.light.grayBackground,
							marginBottom: 15,
							borderBottomLeftRadius: Sizes.radius.middile,
							borderBottomRightRadius: Sizes.radius.middile,
						}}
						data={userSearchData?.data?.length ? userSearchData.data : []}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={{
									padding: 10,
									flexDirection: "row",
									gap: 10,
									alignItems: "center",
								}}
								onPress={() => {
									setCollaborators((prev) => {
										const currentItem = prev?.findIndex(
											(currentItem) => currentItem.id === item.id
										);
										if (currentItem <= -1)
											return [
												...prev,
												{
													id: item.id,
													name: item.username,
													title: item.username,
													avatar: item.cover,
												},
											];
										return prev;
									});
								}}
							>
								<Image
									source={{ uri: item?.cover }}
									borderRadius={100}
									style={{
										width: 30,
										height: 30,
										backgroundColor: Colors.light.red,
									}}
								/>
								<Text>{item.username}</Text>
							</TouchableOpacity>
						)}
						keyExtractor={(item) => String(item.id)}
					/>
				) : (
					searchUser?.length > 0 && (
						<View
							style={{
								alignItems: "center",
								padding: 10,
								backgroundColor: Colors.light.grayBackground,
								borderRadius: Sizes.radius.small,
								marginBottom: 15,
							}}
						>
							<Text>Aucun utilisateur trouvé</Text>
						</View>
					)
				)}
			</View>
			<FlatList
				data={collaborators}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View style={styles.collaboratorItem}>
						<Image
							source={{ uri: item.avatar }}
							style={styles.collaboratorAvatar}
						/>
						<Text style={styles.collaboratorName}>{item.name}</Text>
						<TouchableOpacity onPress={() => removeCollaborator(item.id)}>
							<Ionicons name='close-circle-outline' size={24} color='red' />
						</TouchableOpacity>
					</View>
				)}
			/>

			<CTAMain
				loading={isLoading || formLoading}
				disable={isLoading || formLoading}
				title="Publier l'actualité"
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
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginVertical: 10,
	},
	input: {
		height: 50,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		marginBottom: 15,
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
});

export default FormActu;
