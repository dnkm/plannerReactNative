import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Constants } from 'expo';
import * as db from './util/db';

import MemoView from "./components/MemoView";
import MonthlyView from "./components/MonthlyView";
import Navigator from "./components/Navigator";

import * as firebase from "firebase";
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyCOP1KYhUzrriv6t1WvWqITxhahz0HicJ8",
  authDomain: "dk-diary.firebaseapp.com",
  databaseURL: "https://dk-diary.firebaseio.com",
  projectId: "dk-diary",
  storageBucket: "dk-diary.appspot.com",
  messagingSenderId: "212922815112"
};
firebase.initializeApp(config);



export default class App extends React.Component {
  constructor(props) {
    super(props);
    let today = new Date();
    this.state = {
      selectedDate: today,
      memos: []   // all memos from the month
    }

    this.changeMonth = this.changeMonth.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.getMemos = this.getMemos.bind(this);
    this.addMemo = this.addMemo.bind(this);

    this.getMemos(today);
  }
  changeMonth(offset) {
    this.setState(prevState => {
      let selectedDate = prevState.selectedDate;
      selectedDate.setMonth(selectedDate.getMonth() + offset);
      this.getMemos(selectedDate);
      return { selectedDate, memos: [] }
    });

  }
  changeDate(date) {
    this.setState(prevState => {
      let selectedDate = prevState.selectedDate
      selectedDate.setDate(date);
      return { selectedDate }
    });
  }
  getMemos(date) {
    db.getMemo(date).then(querySnapshot => {
      let memos = [];
      querySnapshot.forEach(doc => {
        let memo = { ...doc.data(), id: doc.id }
        memos.push(memo);
      });
      this.setState({
        memos
      })
    })
  }
  addMemo(memoTxt) {
    let selectedDate = this.state.selectedDate;
    db.addMemo({
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1,
      date: selectedDate.getDate(),
      memo: memoTxt
    }).then(_ref => { this.getMemos(selectedDate) });
  }
  render() {
    return (
      <View style={styles.container}>
        <Navigator selectedDate={this.state.selectedDate} changeMonth={this.changeMonth} />
        <MonthlyView selectedDate={this.state.selectedDate} memos={this.state.memos} changeDate={this.changeDate} />
        <MemoView
          addMemo={this.addMemo}
          selectedMemos={this.state.memos.filter(m => m.date == this.state.selectedDate.getDate())} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
  },
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