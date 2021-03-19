import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import Unorderedlist from 'react-native-unordered-list';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchLoan } from '../store/actions/loans';
var url = 'http://localhost:5000';
var businessId = '6051e3f87cfb24fe1d922c2f';

export default function FileUpload() {
	const navigation = useNavigation();
	const dispatch = useDispatch();

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
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				quality: 1,
				//base64: true,
			});

			// need to make sure a image was selected:
			if (!result.cancelled) {
				axios({	
					method: 'post',
					url: `${url}/documents/${businessId}`,
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						imgsource: JSON.stringify(result.uri)
					}
				})
				.then(
					axios({
					method: 'post',
					url: `${url}/loans/${businessId}`,
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						currentStatus: 'Documentation Submitted'
					}
				})
				)
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