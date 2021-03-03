import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Button, Alert, Item, ScrollView, SafeAreaView } from 'react-native';
//import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CheckBox } from 'react-native-elements';
import Header from '../components/Header';
//import * as ScreenOrientation from 'expo-screen-orientation';
import { useForm, Controller } from "react-hook-form";
var url = 'http://localhost:5000';
var merchantId = '601dd06d90ffa052d858f2d5';
var businessId = '601dd16d37d369441e2e83d2';

const ApplicationForm = ({ navigation }) => {

    const { apply, setValue, handleSubmit, control, reset, errors } = useForm();

    const onSubmit = data => {
        console.log(data);
        if (data) {
            axios({
                method: 'post',
                url: `${url}/loans/new`,
                data: {
                    businessId: '601dd16d37d369441e2e83d2',
                    amount: data.amount,
                    email: data.email,
                    name: data.name,
                    phone: data.phone,
                    postalAddress: data.postalAddress,
                    postcode: data.postcode,
                }

                /*
                ValidationError: Business validation failed: loan.amount: Cast to Number failed for value "data.amount" at path "amount", loan: Validation failed: amount: Cast to Number failed for value "data.amount" at path "amount"*/
            })
                .then((res) => {
                    console.log(res.data)
                    alert(`Loan application submitted    `)
                    //Add a redirect or reload here
                }).catch((error) => {
                    console.log(error)
                });
        }
    };

    const onChange = arg => {
        return {
            value: arg.nativeEvent.text,
        };
    };

    console.log(errors);

    useEffect(() => {
        fetchBusinessInfo();
    }, []);

    const fetchBusinessInfo = async () => {
        try {
            const response = await fetch(
                `${url}/merchants/${merchantId}`
            );
            const { accountHolderName, email, phone, postalAddress, postcode } = await response.json();
            setValue('name', accountHolderName);
            setValue('email', email);
            setValue('phone', phone);
            setValue('postalAddress', postalAddress);
            setValue('postcode', postcode);
        } catch (error) { }
    };

    return (
        <SafeAreaView style={styles.screen}>

            <Header />

            <View style={styles.container}>

                <Text style={styles.top}>Please ensure all details are correct and up to date</Text>


                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.contentContainer}
                >

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

                    <Text style={styles.terms}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In ante metus dictum at tempor commodo ullamcorper a lacus. Dignissim cras tincidunt lobortis feugiat. Vitae suscipit tellus mauris a. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Elit duis tristique sollicitudin nibh. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Neque volutpat ac tincidunt vitae semper quis lectus. Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. At augue eget arcu dictum varius duis at consectetur lorem. Elementum sagittis vitae et leo. Tellus cras adipiscing enim eu turpis egestas.</Text>
                  {/*  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Controller
                            name="MyCheckbox"
                            control={control}
                            defaultValue={false}
                            rules={{ required: true }}
                            render={props =>
                                <CheckBox
                                    onChange={e => props.onChange(e.target.checked)}
                                    checked={props.value}
                                />
                            }
                        />
                        
                        <Text style={styles.label}>By checking this box you state that you understand and agree to the terms above</Text>
                    </View>
                        */}

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
        marginLeft: 20,
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