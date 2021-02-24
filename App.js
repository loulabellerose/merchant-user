import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView, SafeAreaView } from 'react-native';
//import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, ThemeProvider } from 'react-native-elements';
//import * as ScreenOrientation from 'expo-screen-orientation';
import { useForm, Controller } from "react-hook-form";
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
//var url = 'https://frozen-forest-84312.herokuapp.com';
var url = 'http://localhost:5000';
var merchantId = '601db0f93a53324cd59bc514';

export default () => {

  const { apply, setValue, handleSubmit, control, reset, errors } = useForm();

  const onSubmit = data => {
    console.log(data);
    if (data) {
      axios({
        method: 'post',
        url: `${url}/loans/new`,
        data: {
          businessId: data.businessId,
          amount: data.amount
        }
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

      <Header style={styles.banner}
        centerComponent={{ text: 'RISE' }}
        rightComponent={{ text: 'POP POS' }}
      />
      <View style={styles.container}>


        <Text style={styles.top}>Please ensure all details are correct and up to date</Text>

        <View style={styles.carousel}>

          <ScrollView
            style={styles.scrollView}

          >
            <View style={styles.formItem}>
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
            </View>

            <View style={styles.formItem}>
              <Text style={styles.label}>Email</Text>
              <Controller
                control={control}
                name="email"
                rules={{ required: true }}
                defaultValue={false}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
              />
            </View>

            <View style={styles.formItem}>
              <Text style={styles.label}>Phone Number</Text>
              <Controller
                control={control}
                defaultValue={false}
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
            </View>

            <View style={styles.formItem}>
              <Text style={styles.label}>Your Postal Address</Text>
              <Controller
                control={control}
                name="postalAddress"
                rules={{ required: true }}
                defaultValue={false}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
              />
            </View>

            <View style={styles.formItem}>
              <Text style={styles.label}>Your Postcode</Text>
              <Controller
                control={control}
                name="postcode"
                rules={{ required: true }}
                defaultValue={false}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                )}
              />
            </View>

            <View style={styles.formItem}>
              <Text style={styles.label}>Value of Loan Requested</Text>
              <Controller
                defaultValue={false}
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
            </View>

            <View style={styles.formItem}>
              <View style={styles.button}>
                <Button
                  style={styles.buttonInner}
                  title="Submit"
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
            </View>

          </ScrollView>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 50,
    backgroundColor: '#cfffe5'
    //alignItems: 'center'
  },
  container: {
    justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    padding: 8
  },
  banner: {
    height: 100,
    backgroundColor: '#D3D3D3',
    color: 'white'
  },
  carousel: {
    backgroundColor: '#1abc9c'

  },
  scrollView: {
    marginHorizontal: 20,
  },
  top: {
    color: '#808080',
    marginTop: 80,
    marginLeft: 20,
    fontSize: 20,
    marginBottom: 10
  },
  label: {
    color: '#808080',
    marginTop: 80,
    marginLeft: 0,
    marginBottom: 10
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
