import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
//import React, { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView, SafeAreaView } from 'react-native';
//import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, ThemeProvider } from 'react-native-elements';
//import * as ScreenOrientation from 'expo-screen-orientation';
import { useForm, Controller } from "react-hook-form";
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ApplicationForm from './screens/ApplicationForm';
import HomeScreen from './screens/HomeScreen';
//var url = 'https://frozen-forest-84312.herokuapp.com';
var url = 'http://localhost:5000';
var merchantId = '601db0f93a53324cd59bc514';
import { StackNavigator } from './navigation/StackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;