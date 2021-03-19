import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import ApplySplash from '../components/ApplySplash';
import FileUpload from '../components/FileUpload';
import * as Notifications from 'expo-notifications';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoan } from '../store/actions/loans';
import { fetchBusiness } from '../store/actions/business';

const HomeScreen = () => {
    const loan = useSelector(state => state.loan.loan);
    const token = useSelector(state => state.business.business.pushToken);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoan()),
            dispatch(fetchBusiness())
    }, [dispatch]);

    //Will return the timestamp of when the loan application was submitted
    const loanTimestampString = loan.loanId.toString().substring(0, 8);
    var loanTimestamp = new Date(parseInt(loanTimestampString, 16) * 1000);
    loanTimestamp = loanTimestamp.toString();

    //Will return the timestamp of the most recent update to the loan application
    const updateTimestampString = loan.statusId.toString().substring(0, 8);
    var updateTimestamp = new Date(parseInt(updateTimestampString, 16) * 1000);
    updateTimestamp = updateTimestamp.toString();

    const loanStatus = loan.status;
    /*
    possible_status: [
        'No Loan Application Submitted',
        'Submitted by Merchant',
        'Documentation Requested',
        'Documentation Submitted', 
        'Pending Approval',
        'Approved',
        'Rejected'
    ] 
    */

    //Render if a loan appliation has been submitted and documents have been requested by the analyst
    if (loanStatus == 'Documentation Requested') {
        return (
            <SafeAreaView style={styles.screen}>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.top}>Application Status</Text>
                    <Text style={styles.body}>Application submitted: {loanTimestamp}</Text>
                    <Text style={styles.body}>Current status: {loanStatus}</Text>
                    <Text style={styles.body}>Most recent update to application: {updateTimestamp}</Text>
                  <FileUpload />
                </View>
            </SafeAreaView>
        );

    }
    //Render if a loan application has been submitted but documents are not currently requested
    else if (loanStatus == 'No Loan Application Submitted') {
        return (
            <SafeAreaView style={styles.screen}>
                <Header />
                <View style={styles.container}>
                    <ApplySplash />

                </View>
            </SafeAreaView>
        );
    }
    else {
        return (
            <SafeAreaView style={styles.screen}>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.top}>Application Status</Text>
                    <Text style={styles.body}>Application submitted: {loanTimestamp}</Text>
                    <Text style={styles.body}>Current status: {loanStatus}</Text>
                    <Text style={styles.body}>Most recent update to application: {updateTimestamp}</Text>

                </View>
            </SafeAreaView>
        );

    }

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
    }
})

export default HomeScreen;