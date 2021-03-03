import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import FileUpload from '../components/FileUpload';
import ApplicationForm from './ApplicationForm';
import { useNavigation } from '@react-navigation/native';


const StatusScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.screen}>
            <Header />
            <View style={styles.container}>

                <Text style={styles.top}>Application Status</Text>

                <Text>
                    If your application is successful, you'll receive a lump sum of up to $10,000 in your business bank account. Each day, 11% of your credit card sales will automatically go towards repayment, until the total loan amount has been reached.
                </Text>

                <Text style={styles.top}>File Upload</Text>

                <FileUpload />

            </View>
        </SafeAreaView>
    );
}

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
    top: {
        color: '#808080',
        //marginTop: 40,
        marginLeft: 20,
        fontSize: 40,
        marginBottom: 10
    },
    label: {
        color: '#808080',
        marginTop: 20,
        marginLeft: 0,
        fontSize: 30,
        marginBottom: 10
    },
    button: {
        marginTop: 40,
        marginBottom: 10,
        color: 'white',
        height: 40,
        backgroundColor: '#1abc9c',
        borderRadius: 4
    }
})

export default StatusScreen;