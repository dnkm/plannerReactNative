import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from "react-native-elements";

var { height, width } = Dimensions.get('window')

const DayView = ({ date, selectedDate, memos, changeDateOfMonth }) => {
    return (
        <TouchableOpacity
            style={[
                styles.daily
            ]}
            onPress={() => {
                if (date > 0)
                changeDateOfMonth(date)
            }}
        >
            <Text style={selectedDate.date() == date && styles.selectedDate}>
                {date > 0 && date}
            </Text>
            {
                memos.length > 0 &&
                <Icon 
                    name="fiber-manual-record" 
                    iconStyle={{
                        color: 'gray',
                        fontSize: 10
                    }}
                 />
            }
        </TouchableOpacity>
    )
}

const MonthlyView = ({ selectedDate, memos, changeDateOfMonth }) => {
    let iDate = new Date(selectedDate);
    iDate.setDate(1);
    let firstDay = iDate.getDay();

    iDate.setMonth(iDate.getMonth()+1)
    iDate.setDate(0);
    let lastDate = iDate.getDate();

    let days = new Array(lastDate)
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
                    memos={memos.filter(m => m.moment.date() == date)}
                    changeDateOfMonth={changeDateOfMonth}
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
                weeks.map((week, i) =>
                    <View style={styles.weekly} key={i}>
                        {week}
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
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    weekly: {
        flex: 1,
        flexDirection: 'row'
    },

    daily: {
        flexBasis: (width / 7),
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: (width / 7)
    },
    selectedDate: {
        color: 'hotpink'
    }
})