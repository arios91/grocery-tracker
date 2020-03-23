import {GET_STORES, UPDATE_STORE, ADD_STORE, ADD_ITEM} from '../actions/constants';
const initialState = {
    stores: [],
    error: {},
    loading: true
};

export default function(state = initialState, action){
    const {type, payload} = action;
    // console.log(type);

    switch(type){
        case GET_STORES:
            return{
                ...state,
                stores: payload,
                loading: false
            };
        case ADD_STORE:
            return{
                ...state,
                stores: [payload, ...state.stores],
                loading: false
            }
        case UPDATE_STORE:
            return{
                ...state,
                stores: state.stores.map(store => store.id === payload.id ? 
                    payload
                    : store),
                loading: false
            }
        default:
            return state;
    }
}