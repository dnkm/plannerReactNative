import * as firebase from "firebase";

export const getMemo = (date) => {
    let db = firebase.firestore();

    return db.collection("todo")
        .where("year", "==", date.getFullYear())
        .where("month", "==", date.getMonth() + 1)
        .get()
}