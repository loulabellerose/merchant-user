import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import ApplicationForm from './ApplicationForm';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.screen}>
<Header />
            <View style={styles.container}>

                <Text style={styles.top}>Reinvesting in Small Business Equality</Text>
                <Text>
                    Businesses owned by minorities receive less funding, are three times more likely to be denied loans, and are generally charged higher interest rates. The R.I.S.E. scheme was born out of a desire to close this funding gap. It offers no-fee, no-interest cash advances to minority-owned business owners to help their businesses grow.
            </Text>
                <Text>
                    If your application is successful, you'll receive a lump sum of up to $10,000 in your business bank account. Each day, 11% of your credit card sales will automatically go towards repayment, until the total loan amount has been reached.
            </Text>
            <View style={styles.button}>
                    <Button
                        title="Check status of an existing loan application"
                        onPress={() => {
                            navigation.navigate('StatusScreen')
                        }}
                    />
                </View>
                <Text style={styles.label}>
                    Eligibility Criteria
            </Text>
                <Text>
                    Your business has been using POP POS as its sole point of sale for at least 3 months
            </Text>
                <Text>
                    You are a US citizen and your business is based in the US
            </Text>
                <Text>
                    Your business meets the criteria of a minority-owned business, as outlined is supporting documents
            </Text>
                <View style={styles.button}>
                    <Button
                        title="Apply for a loan today"
                        onPress={() => {
                            navigation.navigate('ApplicationForm')
                        }}
                    />
                </View>

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

export default HomeScreen;