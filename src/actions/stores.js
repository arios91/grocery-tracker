import db from '../firebase';
import {GET_STORES, GET_ITEMS, SET_ALERT} from './constants';
import {setAlert} from './alert';

export const addStore = newStore => async dispatch =>{
    db.collection("stores").add(newStore);
}

export const getStores = () => async dispatch => {
    var stores = [];
    const data = await db.collection("stores").get();
    data.forEach(doc => {
        let tmpStore = {
            id: doc.id,
            ...doc.data(),
            items: []
        };
        stores.push(tmpStore);
    })
    if(stores.length > 0){
        dispatch({
            type: GET_STORES,
            payload: stores
        })
    }
}

export const getItems = () => async dispatch => {
    let observer = await db.collection("items");
    observer.onSnapshot(doc =>{
        var items = [];
        doc.forEach(snap => {
            let tmpItem = {
                id: snap.id,
                name: snap.data().name,
                quantity: snap.data().quantity,
                stocked: snap.data().stocked,
                storeId: snap.data().storeId,
                updateDate: snap.data().updateDate,
                verified: snap.data().verified,
            };
            items.push(tmpItem);
        })
        if(items.length > 0){
            dispatch({
                type: GET_ITEMS,
                payload: items
            })
        }
    })
}

export const addItemToStore = newItem => async dispatch =>{
    db.collection("items").add(newItem);
    dispatch(setAlert('Added Item', 'success'))
}

export const updateItem = updatedItem => async dispatch =>{
    console.log(updatedItem);
    let observer = await db.collection("items").doc(updatedItem.id);

    observer.update({
        updateDate: new Date(),
        quantity: updatedItem.quantity,
        verified: updatedItem.verified
    })
    
    dispatch(setAlert('Updated Item', 'success'))
}