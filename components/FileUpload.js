import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
var url = 'http://localhost:5000';
var businessId = '601dd16d37d369441e2e83d2';

export default function FileUpload() {

    const askForPermission = async () => {
		const permissionResult = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
		if (permissionResult.status !== 'granted') {
			Alert.alert('Permission to access camera roll denied', [{ text: 'ok' }])
			return false
		}
		return true
	}

	takeImage = async () => {
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
            //result = JSON.stringify(result.base64);
            console.log(result);
			// make sure a image was taken:
			//if (result) {
              //  setImage(result.uri);
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
                .then((res) => {
                    alert(`Document submitted `)
                    //Add a redirect or reload here
                }).catch((error) => {
                    console.log(error)
                });
			//}
		}
	};

    return (
        <View>
            <Button title="Chose a document to upload" onPress={takeImage} />
        </View>
    );
};