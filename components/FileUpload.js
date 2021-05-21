import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import Unorderedlist from 'react-native-unordered-list';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchLoan } from '../store/actions/loans';
import { RNS3 } from 'react-native-s3-upload';
import { BUCKET, ACCESS_KEY, SECRET_KEY, BUSINESS_ID, URL } from '@env';
export default function FileUpload() {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	var imglocation;

	const options = {
		keyPrefix: "uploads/",
		bucket: BUCKET,
		region: "eu-west-1",
		accessKey: ACCESS_KEY,
		secretKey: SECRET_KEY,
		successActionStatus: 201
	}

	const askForPermission = async () => {
		const permissionResult = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
		if (permissionResult.status !== 'granted') {
			Alert.alert('Permission to access camera roll denied', [{ text: 'ok' }])
			return false
		}
		return true
	}

	chooseImage = async () => {
		const hasPermission = await askForPermission()
		if (!hasPermission) {
			return
		} else {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				quality: 1,
				//base64: true,
			});
			console.log(result);
			const file = {
				uri: result.uri,
				name: `${BUSINESS_ID}`,
				type: "image/jpg"
			}
			// need to make sure a image was selected:
			if (!result.cancelled) {
				RNS3.put(file, options)
					.then(response => {
						if (response.status !== 201) {
							throw new Error("Failed to upload");
						}
						else {
							var res = response;
							imglocation = res.body.postResponse.location;
						}
					})
					.then(
						axios({
							method: 'post',
							url: `${url}/documents/${BUSINESS_ID}`,
							headers: {
								'Content-Type': 'application/json'
							},
							data: {
								imgsource: `https://rise-app-40245759.s3-eu-west-1.amazonaws.com/uploads/${BUSINESS_ID}`
							}	
					}))
					.then(
						axios({
							method: 'post',
							url: `${url}/loans/${BUSINESS_ID}`,
							headers: {
								'Content-Type': 'application/json'
							},
							data: {
								currentStatus: 'Documentation Submitted'
							}
					}))
					.then((res) => {
						alert('Document submitted')
						dispatch(fetchLoan())
						navigation.navigate('Home')
					}).catch((error) => {
						console.log(error)
					});
			}
		}
	};



	return (
		<View>
			<Text style={styles.top}>Upload Documentation</Text>
			<Text style={styles.body}>
				Please supply documentation to prove the minority ownership of your business.
				</Text>
			<Unorderedlist>
				<Text style={styles.body}>
					A minority business may be certified as a minority "controlled" enterprise if the minority owners own at least 30% of the economic equity of the firm
				</Text>
			</Unorderedlist>
			<Unorderedlist>
				<Text style={styles.body}>
					Minority management/owners control the day-to-day operations of the firm
				</Text>
			</Unorderedlist>
			<Unorderedlist>
				<Text style={styles.body}>
					Minority management/owners retain a majority (no less than 51%) of the firm's "voting equity"
				</Text>
			</Unorderedlist>
			<Text style={styles.body}>
				For the purposes of this program, a minority group member is an individual who is at least 25% Asian, Black, Hispanic or Native American
			</Text>
			<View style={styles.button}>
				<Button style={styles.uploadButton}
					title="Chose a document to upload"
					onPress={chooseImage}>
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	body: {
		color: '#404040',
		marginLeft: 0,
		fontSize: 18,
		marginBottom: 10
	},
	top: {
		color: '#35a99e',
		fontSize: 40,
		marginBottom: 10
	},
	button: {
		marginTop: 20,
		marginBottom: 10,
		height: 60,
		padding: 10,
		backgroundColor: '#deeff5',
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#35a99e'
	}
})