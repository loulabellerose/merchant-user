import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>R.I.S.E.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 150,
        backgroundColor: '#deeff5',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
    },
    headerTitle: {
        color: '#35a99e',
        fontSize: 100,
        fontWeight: 'bold'

    }
})

export default Header;