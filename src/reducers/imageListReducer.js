import { IMAGE_LIST_REQUEST, IMAGE_LIST_SUCCESS, IMAGE_LIST_FAIL } from '../constants/ImageList';

const initialState = {
    results: [],
    error: '',
    loading: false
}

export const ImageList = (state=initialState, action) => {
    const {type, payload} = action;
    // eslint-disable-next-line default-case
    switch(type) {
        case IMAGE_LIST_REQUEST:
            return ({
                ...state,
                loading: true
            })
        case IMAGE_LIST_SUCCESS:
            return ({
                loading: false,
                error: '',
                results: payload
            })
        case IMAGE_LIST_FAIL:
            return ({
                ...state,
                error: payload
            })
        default:
            return state
    }
}