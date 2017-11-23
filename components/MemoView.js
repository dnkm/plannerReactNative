import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';

const MemoView = ({ selectedMemos }) => {
    return (
        <View style={styles.MemoView}>
            {
                selectedMemos.map(memo => (
                    <View key={memo.id} style={styles.MemoItem}>
                        <Text >{memo.memo}</Text>
                    </View>
                ))
            }
            <FormLabel>ADD MEMO</FormLabel>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <FormInput onChangeText={() => {}} 
                    containerStyle={{flexBasis: 1, flexGrow: 1}} />
                <Button title='ADD' fontSize={10} />
            </View>

        </View>
    )
}

export default MemoView;

const styles = StyleSheet.create({
    MemoView: {
        flex: 0.3
    },
    MemoItem: {
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 10
    }
})