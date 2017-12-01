import {AsyncStorage} from "react-native";
import moment from 'moment';


const admin = () => {
    //AsyncStorage.setItem("@item:1512075700043", "{\"date\":\"2017-11-30\",\"memo\":\"ask\",\"id\":\"1512075700043\"}");
    //AsyncStorage.setItem("@item:1512075508669", "{\"date\":\"2017-11-30\",\"memo\":\"ask2\",\"id\":\"1512075508669\"}");
    //AsyncStorage.removeItem('1512076699885');
    //AsyncStorage.setItem('@monthly:201711','[1512075700043,1512075508669]');
}

const getMemos = async(moment) => {
    admin()
    const itemKeys = await getMemoKeys(moment);
    
    let memos = []
    await Promise.all( itemKeys.map(key => {
        return (async (key) => {
            let memo = await getMemo(key);
            if (memo)
                memos.push(memo);
            return null;
        })(key);
    }));

    console.log("memos loaded")
    console.log(memos);
    
    return memos;
}

const getMemoKeys = async(moment) => {
    let itemKeys = await AsyncStorage.getItem('@monthly:' + moment.format('YYYYMM'));
    return (itemKeys === null) ? [] : JSON.parse(itemKeys);
}

const getMemo = async(key) => {
    const value = await AsyncStorage.getItem('@item:' + key)

    if (value === null) {
        console.log(key + " key is missing");
        return null;
    }

    const memo = JSON.parse(value);
    memo.moment = moment(memo.date);
    return memo;
}

const updateMemo = async(memo) => {
    const key = '@item:' + memo.id
    try {
        return AsyncStorage.setItem(key, JSON.stringify(memo));
    } catch(error) {
        console.error(error);
    }
}

deleteMemo = async (memo) => {
    let keys = await getMemoKeys(memo.moment);
    keys = keys.filter(k => k != memo.id);
    await AsyncStorage.setItem('@monthly:' + memo.moment.format('YYYYMM'), JSON.stringify(keys));
    console.log("deleted monthly keys")
    await AsyncStorage.removeItem('@item:'+memo.id);
    console.log("deleted item")
    return null
}

const addMemo = async(selectedDate, memoTxt) => {
    const itemKey = moment().format('x');
    const memo = {
        memo: memoTxt,
        id: itemKey,
        date: selectedDate.format('YYYY-MM-DD')
    }
    
    await AsyncStorage.setItem('@item:' + itemKey, JSON.stringify(memo));
    let keys = await getMemoKeys(moment(memo.date));
    keys.push(itemKey);
    await AsyncStorage.setItem('@monthly:' + moment(memo.date).format('YYYYMM'), JSON.stringify(keys));
    return null;
}

export {addMemo, getMemos, updateMemo, deleteMemo};