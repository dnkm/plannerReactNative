import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

var { height, width } = Dimensions.get('window')

const DayView = ({ date, selectedDate, memos, changeDate }) => {
    if (date < 0) {
        return (
            <Text style={styles.daily}></Text>
        )
    }

    return (
        <Text
            style={[styles.daily, 
                memos.length > 0 && styles.hasmemo,
                selectedDate.getDate() == date && styles.selectedDate
            ]}
            onPress={() => changeDate(date)}
        >
            {date}
        </Text>
    )
}

const MonthlyView = ({ selectedDate, memos, changeDate }) => {

    let iDate = new Date(selectedDate);
    iDate.setDate(1);
    let firstDay = iDate.getDay();

    let days = new Array(31)
        .fill(0)
        .map((_val, i) => i + 1)

    let padding = new Array(firstDay)
        .fill(0)
        .map((_val, i) => - 1 - i)

    let calendarDays =
        [...padding, ...days]
            .map(date => (
                <DayView key={date} date={date}
                    selectedDate={selectedDate}
                    memos={memos.filter(m => m.date == date)}
                    changeDate={changeDate}
                />
            ));

    let weeks = []
    calendarDays.forEach((day, i) => {
        let weekNum = Math.floor(i / 7);
        if (!weeks[weekNum]) {
            weeks[weekNum] = [];
        }
        weeks[weekNum].push(day);
    });

    return (
        <View style={styles.monthly}>
            {
                [0, 1, 2, 3, 4].map(i =>
                    <View style={styles.weekly} key={i}>
                        {weeks[i]}
                    </View>
                )
            }
        </View>
    )
}
export default MonthlyView;

const styles = StyleSheet.create({
    monthly: {
        flex: 0.5,
        backgroundColor: 'orange',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    weekly: {
        flex: 1,
        flexDirection: 'row'
    },

    daily: {
        flexBasis: (width / 7)
    },
    hasmemo: {
        backgroundColor: 'black',
        color: 'white'
    },
    selectedDate: {
        borderColor: 'red',
        color: 'red'
    } 
})