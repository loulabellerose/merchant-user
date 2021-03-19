import 'react-native-gesture-handler';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView, SafeAreaView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoan } from '../store/actions/loans';
var url = 'http://localhost:5000';

const ApplicationForm = () => {
    const business = useSelector(state => state.business.business);
    var businessId = business.businessId;
    var merchantId = business.merchantId;
    var token;

    const { apply, setValue, handleSubmit, control, reset, errors } = useForm();
    const [checked, toggleChecked] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    //Pre-populate application form with data already on file
    useEffect(() => {
        fetchMerchantInfo();
    }, []);

    const onSubmit = data => {
        //Ensure user has agreed to the Terms
        if (checked) {
            //Ensure user has entered a valid size of loan
            if (data.amount >= 1000 || data.amount >= 10000) {
                //Ensure form has been completed
                if (data) {
                    //First ask user for permission to send them push notifications
                    registerForPushNotificationsAsync()
                        //Then send the token to DB as part of the application
                        .then((token) => {
                            axios({
                                method: 'post',
                                url: `${url}/loans/new`,
                                data: {
                                    businessId: businessId,
                                    amount: data.amount,
                                    email: data.email,
                                    name: data.name,
                                    phone: data.phone,
                                    postalAddress: data.postalAddress,
                                    postcode: data.postcode,
                                    pushToken: token
                                }
                            })
                        .then((res) => {
                            Alert.alert('Your loan application was submitted!')
                            dispatch(fetchLoan())
                            navigation.navigate('Home')
                        }).catch((error) => {
                            Alert.alert(error)
                            console.log(error)
                        });
                    }).catch((error) => {
                        Alert.alert(error)
                        console.log(error)
                    });
            }
            else {
                Alert.alert('Please check the amount requested')
            }
        }
        else {
            Alert.alert('You must read and agree to the Terms before submitting your loan application')
        }
    }
    };

    const fetchMerchantInfo = () => {
        try {
            axios({
                method: 'get',
                url: `${url}/merchants/${merchantId}`
            })
                .then(res => {
                    const { accountHolderName, email, phone, postalAddress, postcode } = res.data;
                    setValue('name', accountHolderName);
                    setValue('email', email);
                    setValue('phone', phone);
                    setValue('postalAddress', postalAddress);
                    setValue('postcode', postcode);
                })
                .catch(function (error) {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    };

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      };

    return (
        <SafeAreaView style={styles.screen}>
            <Header />
            <View style={styles.container}>
                <Text style={styles.top}>Please ensure all details are correct and up to date</Text>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.contentContainer}>

                    <Text style={styles.label}>Name</Text>
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: true }}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                    />

                    <Text style={styles.label}>Email</Text>
                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: true }}
                        //defaultValue={email}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                    />

                    <Text style={styles.label}>Phone Number</Text>
                    <Controller
                        control={control}
                        //defaultValue={false}
                        name="phone"
                        rules={{ required: true }}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                    />

                    <Text style={styles.label}>Your Postal Address</Text>
                    <Controller
                        control={control}
                        name="postalAddress"
                        rules={{ required: true }}
                        //defaultValue={false}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                    />

                    <Text style={styles.label}>Your Postcode</Text>
                    <Controller
                        control={control}
                        name="postcode"
                        rules={{ required: true }}
                        //defaultValue={false}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                    />

                    <Text style={styles.label}>Value of Loan Requested</Text>
                    <Controller
                        //defaultValue={false}
                        name="amount"
                        rules={{ required: true }}
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                            />
                        )}
                    />

                    <Text style={styles.top}>Terms & Conditions</Text>

                    <Text style={styles.terms}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In ante metus dictum at tempor commodo ullamcorper a lacus. Dignissim cras tincidunt lobortis feugiat. Vitae suscipit tellus mauris a. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Elit duis tristique sollicitudin nibh. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Neque volutpat ac tincidunt vitae semper quis lectus. Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. At augue eget arcu dictum varius duis at consectetur lorem. Elementum sagittis vitae et leo. Tellus cras adipiscing enim eu turpis egestas.</Text>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <CheckBox
                            name="checkbox"
                            rules={{ required: true }}
                            checked={checked}
                            onPress={() => toggleChecked(!checked)}
                        />
                        <Text style={styles.label}>By checking this box you state that you understand and agree to the terms above</Text>
                    </View>

                    <View style={styles.button}>
                        <Button
                            style={styles.buttonInner}
                            title="Submit"
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>


                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 50,
        backgroundColor: '#cfffe5',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '80%',
    },
    scrollView: {
        //height: '20%',
        //width: '80%',
        //margin: 20,
        //alignSelf: 'center',
        //padding: 20
    },
    contentContainer: {
        paddingBottom: 50
    },
    top: {
        color: '#808080',
        marginTop: 40,
        marginLeft: 0,
        fontSize: 20,
        marginBottom: 10
    },
    label: {
        color: '#808080',
        marginTop: 20,
        marginLeft: 0,
        marginBottom: 10
    },
    terms: {
        color: '#808080',
        marginTop: 20,
        marginLeft: 0,
        marginBottom: 10,
        lineHeight: 24
    },
    button: {
        marginTop: 40,
        marginBottom: 10,
        color: 'white',
        height: 40,
        backgroundColor: '#1abc9c',
        borderRadius: 4
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        padding: 10,
        borderRadius: 4
    }
});

export default ApplicationForm;