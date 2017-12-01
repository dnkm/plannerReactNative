import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';

class MemoView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {newMemoText : ''}
    }

    render() {
        let { selectedMemos, addMemo, updateMemo, deleteMemo } = this.props;

        const toggleFavorite = (memo) => {
            const newMemo = {...memo}
            newMemo.fav = (memo.fav) ? !memo.fav : true;
            updateMemo(newMemo);
        }

        return (
            <View style={styles.MemoView}>
                <FormLabel>DAILY MEMO</FormLabel>
                {
                    selectedMemos.map(memo => (
                        <View key={memo.id} style={styles.MemoItem}>
                            <Icon name={memo.fav ? "favorite" : "favorite-border"} iconStyle={{ color: 'gray', fontSize: 15, paddingRight: 10 }} 
                                onPress={() => toggleFavorite(memo)}
                            />
                            <Text style={{ color: 'gray', flexGrow: 1 }}>{memo.memo}</Text>
                            <Icon name="remove" type="font-awesome" iconStyle={{ color: 'gray', fontSize: 15 }} 
                                onPress={() => deleteMemo(memo)}
                            />
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
                        value={this.state.newMemoText}
                        onChangeText={text => this.setState({newMemoText: text})}
                        containerStyle={{ flexBasis: 1, flexGrow: 1 }}
                    />
                    <Button
                        title='ADD'
                        fontSize={10}
                        onPress={
                            () => {
                                addMemo(this.state.newMemoText)
                                this.setState({newMemoText: ''})
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 20
    }
})