import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';

class MemoView extends React.Component {

    render() {
        let { selectedMemos, addMemo } = this.props;
        return (
            <View style={styles.MemoView}>
                <FormLabel>DAILY MEMO</FormLabel>
                {
                    selectedMemos.map(memo => (
                        <View key={memo.id} style={styles.MemoItem}>
                            <Icon name="play-arrow" iconStyle={{ color: 'gray', fontSize: 15 }} />
                            <Text style={{ color: 'gray' }}>{memo.memo}</Text>
                        </View>
                    ))
                }
                {
                    selectedMemos.length == 0 &&
                    <View style={styles.MemoItem}>
                        <Text style={{ color: 'gray' }}>Add one now</Text>
                    </View>
                }
                <FormLabel>ADD MEMO</FormLabel>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <FormInput
                        onChangeText={text => this.newMemoText = text}
                        containerStyle={{ flexBasis: 1, flexGrow: 1 }}
                    />
                    <Button
                        title='ADD'
                        fontSize={10}
                        onPress={
                            () => {
                                addMemo(this.newMemoText)
                            }
                        }
                    />
                </View>

            </View>
        )
    }
}

export default MemoView;

const styles = StyleSheet.create({
    MemoView: {
        flex: 0.3,
    },
    MemoItem: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 10
    }
})