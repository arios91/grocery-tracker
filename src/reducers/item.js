import {GET_ITEMS} from '../actions/constants';
const initialState = {
    items: [],
    error: {},
    loading: true
};

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_ITEMS:
            return{
                ...state,
                items: payload,
                loading: false
            };
        default:
            return state;
    }
}