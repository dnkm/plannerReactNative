import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Icon } from "react-native-elements";

const Navigator = ({selectedDate, changeMonth}) => {
    return (
        <View style={styles.navigator}>
            <Icon name="keyboard-arrow-left" iconStyle={styles.icon} 
                onPress={() => changeMonth(-1)}
            />
            <Text style={{
                color:'white',
                fontWeight: 'bold',
                fontSize: 20
            }}>
                {selectedDate.getFullYear()} / {selectedDate.getMonth()+1}
            </Text>
            <Icon name="keyboard-arrow-right" iconStyle={styles.icon}
                onPress={() => changeMonth(1)} 
            />
        </View>
    )
}

export default Navigator;

const styles = StyleSheet.create({
    navigator: {
        backgroundColor: 'deepskyblue',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        fontSize: 50,
        color: 'white',
        marginLeft: 20,
        marginRight: 20
    }
})