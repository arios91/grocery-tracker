import db from '../firebase';
import {GET_STORES} from './constants';

export const addStore = newStore => async dispatch =>{
    // storesRef.push().set(newStore);
}

export const getStores = () => async dispatch => {
    console.log('in here');
    // storesRef.on("value", snapshot => {
    //     dispatch({
    //         type: GET_STORES,
    //         payload: snapshot.val()
    //     })
    // })
}


const FETCH_TODOS = 'FETCH_TODOS';
export const addTodo = newTodo => async dispatch => {
    console.log(newTodo);
    db.collection("todos").add({
        title: newTodo
    });
};

export const completeTodo = completeToDo => async dispatch => {
    // storesRef.child(completeToDo).remove();
};

export const fetchToDos = () => async dispatch => {
    console.log('fetching');
    var todos = [];
    const data = await db.collection("todos").get();
    data.forEach(doc => {
        let tmpTodo = {
            id: doc.id,
            title: doc.data().title
        };
        todos.push(tmpTodo);
    })
    console.log(todos);
    // console.log(data);
//     storesRef.on("value", snapshot => {
//     dispatch({
//       type: FETCH_TODOS,
//       payload: snapshot.val()
//     });
//   });
};