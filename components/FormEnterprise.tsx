import { View, Text, TextInput } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputStyles from "@/constants/InputSyles";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import InputDropdown from "../atoms/InputDropdown";
import CTAMain from "../atoms/CTAMain";
import useGetData from "@/hooks/useGetData";
import MediaPicker from "./MediaPicker";
import useUser from "@/store/userData";
import usePostData from "@/hooks/usePostData";
import InputMultiSelect from "../atoms/InputMultiSelect";
import uploadImageCloudinary from "@/hooks/uploadImageCloudinary";
import CheckBox from "../atoms/CheckBox";
import { Sizes } from "@/constants/StylesSizes";
import InputDatePicker from "./InputDatePicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import useRenderToastMessage from "@/hooks/useRenderToastMessage";
import convertStringInputDateToTimestamp from "@/utils/convertStringInputDateToTimestamp";
import useUploadMedia from "@/hooks/useUploadMedia";
import { numberRules, urlRules } from "@/constants/formValidationRules";

type Props = {
	setOpen?: Dispatch<SetStateAction<boolean>>;
	setGetEnterpriseTrigger?: Dispatch<SetStateAction<any>>;
};

const FormEnterprise = ({ setOpen, setGetEnterpriseTrigger }: Props) => {
	const { userInfo } = useUser((state) => state);
	const [selectedCurrency, setSetSelectedCurrency] = useState<string>();
	const [formVisited, setFormVisited] = useState<boolean>(false);
	const [financementIsOpen, setFinancementIsOpen] = useState<boolean>(false);
	const [creationStepIsOpen, setCreationStepIsOpen] = useState<boolean>(false);
	const [selectedDate, setSetSelectedDate] = useState<string>();
	const [selectedFormJuridique, setSetSelectedFormJuridique] =
		useState<string>();
	const [selectedEffectif, setSetSelectedEffectif] = useState<string>();
	const [selectedOrganisations, setSetSelectedOrganisations] =
		useState<string>();
	const [selectedSector, setSetSelectedSector] = useState<string>();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [formCreateIsTrigger, setFormCreateIsTrigger] =
		useState<boolean>(false);
	const [companySteps, setCompanySteps] = useState<any>();
	const [submittedData, setSubmittedData] = useState<any>();
	const [formIsActive, setFormIsActive] = useState<boolean>(false);
	setFormIsActive;

	const [getSectorsTrigger, setGetSectorsTrigger] = useState<boolean>(false);
	const [uploadImageError, setUploadImageError] = useState<boolean>(false);
	const [formIsLoading, setFormIsLoading] = useState<boolean>(false);
	const [cover, setCover] = useState<any>();
	const [presentationCover, setPresentationCover] = useState<any>();
	const [coverType, setCoverType] = useState<string>();
	const [presentationCoverType, setPresentationCoverType] = useState<string>();
	const [sectors, setSectors] = useState<{ label: string; value: string }[]>(
		[]
	);
	const [sizes, setsizes] = useState<{ label: string; value: string }[]>([]);
	const [organisations, setorganisations] = useState<
		{ label: string; value: string }[]
	>([]);
	const [step, setstep] = useState<{ label: string; value: string }[]>([]);
	const [legalForms, setLegalForms] = useState<
		{ label: string; value: string }[]
	>([]);

	const {
		isLoading: sectorsLoading,
		error: sectorsLoadingError,
		dataInfoLoaded: sectorsLoaded,
		data: sectorsData,
	} = useGetData(getSectorsTrigger, setGetSectorsTrigger, "sectors");
	const {
		isLoading: currencyLoading,
		error: currencyLoadingError,
		dataInfoLoaded: currencyLoaded,
		data: currencyData,
	} = useGetData(getSectorsTrigger, setGetSectorsTrigger, "currencies");
	const {
		isLoading: formCreatedLoading,
		error: formCreatedLoadingError,
		dataInfoLoaded: formCreatedLoaded,
		data: formCreatedData,
		message: formCreatedMessage,
		setMessage: setformCreatedMessage,
		setError: setFormCreatedError,
	} = usePostData(
		formCreateIsTrigger,
		setFormCreateIsTrigger,
		"infos-user/user-entreprise/create",
		submittedData
	);
	const {
		isLoading: legalFormLoading,
		error: legalFormError,
		dataInfoLoaded: legalFormDataLoaded,
		data: legalFormData,
		message: legalFormMessage,
		setMessage: setLegalFormMessage,
		setError: setLegalFormError,
	} = usePostData(
		getSectorsTrigger,
		setGetSectorsTrigger,
		"infos-user/legal-form/get",
		{}
	);
	const {
		isLoading: organisationLoading,
		error: organisationError,
		dataInfoLoaded: organisationDataLoaded,
		data: organisationData,
		message: organisationMessage,
		setMessage: setorganisationMessage,
		setError: setorganisationError,
	} = usePostData(
		getSectorsTrigger,
		setGetSectorsTrigger,
		"infos-user/organisation/get",
		{}
	);

	const {
		isLoading: stepLoading,
		error: stepError,
		dataInfoLoaded: stepDataLoaded,
		data: stepData,
		message: stepMessage,
		setMessage: setstepMessage,
		setError: setstepError,
	} = usePostData(
		getSectorsTrigger,
		setGetSectorsTrigger,
		"infos-user/entreprise-level/get",
		{}
	);

	const {
		isLoading: sizeLoading,
		error: sizeError,
		dataInfoLoaded: sizeDataLoaded,
		data: sizeData,
		message: sizeMessage,
		setMessage: setsizeMessage,
		setError: setsizeError,
	} = usePostData(
		getSectorsTrigger,
		setGetSectorsTrigger,
		"infos-user/entreprise-size/get",
		{}
	);

	useRenderToastMessage(
		formCreatedLoadingError,
		formCreatedData,
		formCreatedMessage,
		setFormCreatedError,
		setformCreatedMessage
	);
	const { data: skillsData } = useGetData(
		getSectorsTrigger,
		setGetSectorsTrigger,
		"skills"
	);
	const { loading, mediaType, mediaUri, pickMedia, uploadMedia, media } =
		useUploadMedia();
	const {
		loading: presentationLoading,
		mediaType: presentationMediaType,
		mediaUri: presentationMediaURI,
		pickMedia: presentationPickMedia,
		uploadMedia: presentationUploadMedia,
		media: presentationMedia,
	} = useUploadMedia();

	useEffect(() => {
		setGetSectorsTrigger(true);
	}, []);

	useEffect(() => {
		if (formCreatedData && setGetEnterpriseTrigger) {
			setGetEnterpriseTrigger(true);
		}
	}, [formCreatedData]);

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

	useEffect(() => {
		if (sizeData && sizeData.data) {
			setsizes((prev: any) =>
				sizeData.data.map((sector: any) => ({
					label: sector.name,
					value: sector.id,
				}))
			);
		}
	}, [sizeData]);

	useEffect(() => {
		if (organisationData && organisationData.data) {
			setorganisations((prev: any) =>
				organisationData.data.map((sector: any) => ({
					label: sector.name,
					value: sector.id,
				}))
			);
		}
	}, [organisationData]);

	useEffect(() => {
		if (legalFormData && legalFormData.data) {
			setLegalForms((prev) =>
				legalFormData.data.map((item: any) => ({
					label: item.name,
					value: item.id,
				}))
			);
		}
	}, [legalFormData]);

	useEffect(() => {
		if (coverType && selectedCurrency && selectedCurrency) {
			setFormIsActive(true);
		}
	}, [coverType, selectedCurrency, selectedCurrency]);

	const onSubmit = async (data: any) => {
		setFormIsLoading(true);
		setFormVisited(true);
		const uploadResponseURI = await uploadMedia(media);
		console.log({ uploadResponseURI });

		// setFormCreatedError(error || "L'image n'a pas été enregistrée");
		if (selectedDate && uploadResponseURI) {
			const timestamp = convertStringInputDateToTimestamp(selectedDate);

			let dataToSubmit: any = {
				name: data.title,
				cover: uploadResponseURI,
				coverType,
				owner: userInfo.id,
				startDate: timestamp,
				effectif: selectedEffectif,
				organisations: selectedOrganisations,
				sectors: selectedSector,
				legalForm: selectedFormJuridique,
				websiteLink: data.link,
				steps: companySteps,
			};
			if (financementIsOpen) {
				const uploadResponseURI = await uploadMedia(presentationMedia);
				dataToSubmit = {
					...dataToSubmit,
					videoPresentationLink: uploadResponseURI,
				};
			}
			setSubmittedData({ ...dataToSubmit });
			setFormCreateIsTrigger(true);
		}
		setFormIsLoading(false);
	};

	useEffect(() => {
		if (!formCreatedLoading && !formCreatedLoadingError && formVisited) {
			console.log({ formCreatedLoadingError });

			if (setOpen) {
				setOpen(false);
			}
		}
	}, [formCreatedLoading]);

	return (
		<View>
			<MediaPicker
				pickMedia={pickMedia}
				loading={loading}
				setCoverType={setCoverType}
				setCover={setCover}
				selectedImage={mediaUri}
				selectedImageType={mediaType}
			/>

			<Controller
				control={control}
				render={({ field }) => (
					<View style={InputStyles.inputContainerSecondary}>
						<TextInput
							style={InputStyles.inputSecondary}
							{...field}
							value={field.value}
							placeholder="Intitulé de l'entreprise*"
							onChangeText={field.onChange}
						/>
					</View>
				)}
				name='title'
				rules={{ required: "Renseignez le titre du projet" }}
			/>
			{errors.title &&
				errors.title.message &&
				typeof errors.title.message === "string" && (
					<Text style={InputStyles.error}>{errors.title.message}</Text>
				)}

			<Controller
				control={control}
				render={({ field }) => (
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
							{...field}
							value={field.value}
							placeholder='Description*'
							onChangeText={field.onChange}
							numberOfLines={6}
							multiline
						/>
					</View>
				)}
				name='description'
				rules={{ required: "Renseignez la description du projet" }}
			/>
			{errors.description &&
				errors.description.message &&
				typeof errors.description.message === "string" && (
					<Text style={InputStyles.error}>{errors.description.message}</Text>
				)}
			<InputDatePicker setSetSelectedDate={setSetSelectedDate} />

			<InputDropdown
				setSelectedValue={setSetSelectedEffectif}
				data={sizes}
				placeholder='Effectif'
			/>
			<InputMultiSelect
				leftIcon={() => (
					<SimpleLineIcons name='organization' size={20} color='black' />
				)}
				setSelectedValue={setSetSelectedSector}
				data={sectors}
				placeholder="Secteurs d'activités"
			/>

			<InputMultiSelect
				leftIcon={() => (
					<SimpleLineIcons name='organization' size={20} color='black' />
				)}
				setSelectedValue={setSetSelectedOrganisations}
				data={organisations}
				placeholder="Organisations d'appartenance"
			/>

			<Controller
				control={control}
				render={({ field }) => (
					<View style={InputStyles.inputContainerSecondary}>
						<TextInput
							style={InputStyles.inputSecondary}
							{...field}
							value={field.value}
							placeholder='Lien Site Web'
							onChangeText={field.onChange}
							keyboardType='url'
						/>
					</View>
				)}
				name='websiteLink'
			/>
			{errors.websiteLink &&
				errors.websiteLink.message &&
				typeof errors.websiteLink.message === "string" && (
					<Text style={InputStyles.error}>{errors.websiteLink.message}</Text>
				)}
			<InputDropdown
				setSelectedValue={setSetSelectedFormJuridique}
				data={legalForms}
				placeholder='Forme Juridique'
			/>

			<View>
				<View
					style={{
						marginVertical: 15,
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<Text style={{ fontSize: Sizes.fontSize.h4, fontWeight: "600" }}>
						Besoin en financement?
					</Text>
					<TouchableOpacity
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 6,
						}}
						onPress={() => setFinancementIsOpen((value) => !value)}
						activeOpacity={0.8}
					>
						<Ionicons
							name={financementIsOpen ? "chevron-up" : "chevron-down"}
							size={18}
						/>
					</TouchableOpacity>
				</View>
				{financementIsOpen && (
					<>
						<Controller
							control={control}
							render={({ field }) => (
								<View style={InputStyles.inputContainerSecondary}>
									<TextInput
										style={InputStyles.inputSecondary}
										{...field}
										value={field.value}
										placeholder='Valeur'
										onChangeText={field.onChange}
										keyboardType='numeric'
									/>
								</View>
							)}
							name='financementNeed'
							rules={numberRules}
						/>
						{errors.financementNeed &&
							errors.financementNeed.message &&
							typeof errors.financementNeed.message === "string" && (
								<Text style={InputStyles.error}>
									{errors.financementNeed.message}
								</Text>
							)}
						<Controller
							control={control}
							render={({ field }) => (
								<View style={InputStyles.inputContainerSecondary}>
									<TextInput
										style={InputStyles.inputSecondary}
										{...field}
										value={field.value}
										placeholder='Motivation*'
										onChangeText={field.onChange}
										numberOfLines={6}
									/>
								</View>
							)}
							name='financementMotivation'
						/>
						<Controller
							control={control}
							render={({ field }) => (
								<View style={InputStyles.inputContainerSecondary}>
									<TextInput
										style={InputStyles.inputSecondary}
										{...field}
										value={field.value}
										placeholder='Lien Pitchdeck (Présentation slides)'
										onChangeText={field.onChange}
										keyboardType='url'
									/>
								</View>
							)}
							name='pitchDeckLink'
							rules={urlRules}
						/>
						{errors.pitchDeckLink &&
							errors.pitchDeckLink.message &&
							typeof errors.pitchDeckLink.message === "string" && (
								<Text style={InputStyles.error}>
									{errors.pitchDeckLink.message}
								</Text>
							)}
						<Text
							style={{
								fontSize: Sizes.fontSize.importantText,
								fontWeight: "600",
								marginVertical: 15,
							}}
						>
							Vidéo de présentation
						</Text>
						<MediaPicker
							pickMedia={presentationPickMedia}
							loading={presentationLoading}
							setCoverType={setPresentationCoverType}
							setCover={setPresentationCover}
							selectedImage={presentationMediaURI}
							selectedImageType={presentationMediaType}
						/>
					</>
				)}
			</View>
			<View>
				<View
					style={{
						marginVertical: 15,
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<Text style={{ fontSize: Sizes.fontSize.h4, fontWeight: "600" }}>
						En cours de création ?
					</Text>
					<TouchableOpacity
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 6,
						}}
						onPress={() => setCreationStepIsOpen((value) => !value)}
						activeOpacity={0.8}
					>
						<Ionicons
							name={creationStepIsOpen ? "chevron-up" : "chevron-down"}
							size={18}
						/>
					</TouchableOpacity>
				</View>
				{creationStepIsOpen && (
					<>
						<View style={{ gap: 15, marginBottom: 25 }}>
							<Text
								style={{
									fontSize: Sizes.fontSize.importantText,
									fontWeight: "600",
								}}
							>
								Étapes de création
							</Text>
							{stepData?.data &&
								stepData?.data?.map((step: any) => (
									<CheckBox
										key={step.id}
										id={step.id}
										title={step.name}
										setCompanySteps={setCompanySteps}
									/>
								))}
						</View>
					</>
				)}
			</View>

			<CTAMain
				loading={formCreatedLoading || formIsLoading}
				disable={formCreatedLoading || formIsActive || formIsLoading}
				title='Envoyer'
				action={handleSubmit(onSubmit)}
			/>
		</View>
	);
};

export default FormEnterprise;
