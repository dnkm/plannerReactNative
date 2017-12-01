import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Constants} from 'expo';
import moment from "moment";

import * as db from './util/db';

import MemoView from "./components/MemoView";
import MonthlyView from "./components/MonthlyView";
import Navigator from "./components/Navigator";

const { height, width } = Dimensions.get('window')

// import * as firebase from "firebase"; require("firebase/firestore"); var
// config = {   apiKey: "AIzaSyCOP1KYhUzrriv6t1WvWqITxhahz0HicJ8",   authDomain:
// "dk-diary.firebaseapp.com",   databaseURL: "https://dk-diary.firebaseio.com",
//   projectId: "dk-diary",   storageBucket: "dk-diary.appspot.com",
// messagingSenderId: "212922815112" }; firebase.initializeApp(config);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        let today = moment();
        this.state = {
            selectedDate: today,
            memos: [] // all memos from the month
        }

        this.changeMonth = this
            .changeMonth
            .bind(this);
        this.changeDateOfMonth = this
            .changeDateOfMonth
            .bind(this);
        this.getMemos = this
            .getMemos
            .bind(this);
        this.addMemo = this
            .addMemo
            .bind(this);
        this.updateMemo = this.updateMemo.bind(this);
        this.deleteMemo = this.deleteMemo.bind(this);
        
        this.getMemos(today);
    }
    changeMonth(offset) {
        this.setState(prevState => {
            let selectedDate = moment(prevState.selectedDate);
            selectedDate.add(offset, 'month');
            this.getMemos(selectedDate);
            return {selectedDate, memos: []}
        });

    }
    changeDateOfMonth(dateOfMonth) {
        this.setState(prevState => {
            let selectedDate = moment(prevState.selectedDate);
            selectedDate.date(dateOfMonth);
            return {selectedDate}
        });
    }
    getMemos(moment) {
        db
            .getMemos(moment)
            .then(memos => {
                this.setState({memos})
            })
    }
    updateMemo(memo) {
        db.updateMemo(memo)
            .then(() => this.getMemos(this.state.selectedDate));
    }
    deleteMemo(memo) {
        db.deleteMemo(memo)
            .then(() => this.getMemos(this.state.selectedDate));
    }
    addMemo(memoTxt) {
        let selectedDate = this.state.selectedDate;
        db.addMemo(selectedDate, memoTxt)
            .then(_ref => {
                this.getMemos(selectedDate)
            });
    }
    render() {
        return (
            <KeyboardAwareScrollView style={styles.rootContainer}>
                <View style={styles.container}>
                    <Navigator
                        selectedDate={this.state.selectedDate}
                        changeMonth={this.changeMonth}/>
                    <MonthlyView
                        selectedDate={this.state.selectedDate}
                        memos={this.state.memos}
                        changeDateOfMonth={this.changeDateOfMonth}
                        />
                    <MemoView
                        addMemo={this.addMemo}
                        selectedMemos={this
                            .state
                            .memos
                            .filter(m => m.moment.date() == this.state.selectedDate.get('date'))}
                        updateMemo={this.updateMemo}
                        deleteMemo={this.deleteMemo}
                        />
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 100
    }
});

/*
let db = firebase.firestore();
    db
      .collection('testCollection')
      .doc('67ermrkERrAnoe8m8dsL')
      .get()
      .then(doc => {
        if (doc.exists) {
          let dataObj = doc.data();
          this.setState({dbText: dataObj.testProp})
        }
      });
    db
      .collection('testCollection')
      .get()
      .then(snapshot => {
        let testProps = [];
        snapshot.forEach(doc => {
          testProps.push(doc);
        })
        testProps = testProps
          .map(doc => <Text key={doc.id}>{doc.data().testProp}</Text>);
        this.setState({testProps});
      })
      */