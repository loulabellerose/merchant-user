import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import ApplySplash from '../components/ApplySplash';
import FileUpload from '../components/FileUpload';
import { useSelector, useDispatch, connect } from 'react-redux';
import fetchBusiness from '../store/actions/loans';

var url = 'http://localhost:5000';
var businessId = '601dd16d37d369441e2e83d2';

const HomeScreen = ({ navigation }) => {
    const loan = useSelector(state => state.loan.loan);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBusiness())
    }, [dispatch]);

    console.log(loan);


    const loanId = loan.loanId;
    const loanTimestampString = loanId.toString().substring(0, 8);
    var loanTimestamp = new Date(parseInt(loanTimestampString, 16) * 1000);
    loanTimestamp = loanTimestamp.toString();

    const updateId = useSelector(state => state.loan.loanId);
    const updateTimestampString = updateId.toString().substring(0, 8);
    var updateTimestamp = new Date(parseInt(updateTimestampString, 16) * 1000);
    updateTimestamp = updateTimestamp.toString();

    //The timestamp of when the loan application was submitted
    //const [timestamp, setTimestamp] = useState();

    //The current status of the loan application eg 'pending approval'
    //const [currentStatus, setCurrentStatus] = useState();

    //The timestamp of the most recent update to the loan application
    //const [statusUpdate, setStatusUpdate] = useState();

    //Boolean value to see whether a loan application has been submitted by the business owner
    //const [submitted, setSubmitted] = useState();

    //Boolean value set to true if the current loan application status is waiting on the business owner to upload documents
    //const [docRequest, setDocRequest] = useState();

    //const stamp = loan._id.toString().substring(0, 8);
    //const date = new Date(parseInt(stamp, 16) * 1000);
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
        useEffect(() => {
            const fetchData = async () => {
                const data = await fetch(`${url}/business/${businessId}`)
                const res = await data.json();
    
                if (res.loan == null) {
                    console.log("No loan applied for")
                }
                else {
                    const loan = res.loan;
    
                    setTimestamp(date.toString());
                    const loanStatus = loan.status[loan.status.length-1];
                    const statusStamp = loanStatus._id.toString().substring(0,8);
                    const statusUpdate = new Date(parseInt(statusStamp, 16) * 1000);
                    setCurrentStatus(loanStatus.currentStatus);
                    setStatusUpdate(statusUpdate.toString());
                    //If status is documentation requested, file upload box should be displayed
                    if(loanStatus.currentStatus=="Documentation Requested"){
                        setDocRequest(true);
                    };
                    setSubmitted(true);
                };
            }
            fetchData();
        })
        */


    //Render if a loan appliation has been submitted and documents have been requested by the analyst
    if ({ loanStatus } == 'Documentation Requested') {
        return (
            <SafeAreaView style={styles.screen}>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.top}>Application Status</Text>
                    <Text style={styles.body}>Application {loanId} submitted: {loanTimestamp}</Text>
                    <Text style={styles.body}>Current status: {loanStatus}</Text>
                    <Text style={styles.body}>Most recent update to application: {updateTimestamp}</Text>
                    <FileUpload />

                </View>
            </SafeAreaView>
        );

    }
    //Render if a loan application has been submitted but documents are not currently requested
    else if ({ loanStatus } == 'No Loan Application Submitted') {
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
                    <Text style={styles.body}>Application {loanId} submitted: {loanTimestamp}</Text>
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