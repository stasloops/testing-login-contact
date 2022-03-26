export interface initialStateTypes {
    contact: any[],
}

export enum ContactActionTypes {
    GET_CONTACT = "GET_CONTACT",
    FILTER_CONTACT = "FILTER_CONTACT"
}

interface GetContactAction {
    type: ContactActionTypes.GET_CONTACT
    payload: object
}

interface FilterContactAction {
    type: ContactActionTypes.FILTER_CONTACT
    payload: number
}

export type ContactAction = GetContactAction  | FilterContactAction


