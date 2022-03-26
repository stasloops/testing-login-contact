import { ContactAction, ContactActionTypes, initialStateTypes } from "../../type/type"

const initialState:initialStateTypes = {
    contact: []
}

export const contactReducer = (state = initialState, action: ContactAction):initialStateTypes => {
    switch(action.type) {
        case ContactActionTypes.GET_CONTACT:
            return {...state, contact: [...state.contact, action.payload]}
        case ContactActionTypes.FILTER_CONTACT:
            return {...state, contact: state.contact.filter((contact) => contact.id !== action.payload)}
        default:
            return state
    }
}

export const getContact = (value: object):ContactAction => {
    return {type: ContactActionTypes.GET_CONTACT, payload: value}
}

export const filterContact = (value: number):ContactAction => {
    return {type: ContactActionTypes.FILTER_CONTACT, payload: value}
}