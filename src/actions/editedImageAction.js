import { 
    ADD_TO_EDIT, 
    REMOVE_FROM_EDIT, 
    CHANGE_EDIT_ITEM_POSTION,
    UPDATE_SINGLE_LIST_ITEM,

    SET_SINGLE_EDIT_ITEM,
    UPDATE_SINGLE_EDIT_ITEM,
    REST_SINGLE_EDIT_ITEM
     
} from '../constants/ImageList';


export const addToEdit = (item) => dispatch => {
    dispatch({type: ADD_TO_EDIT, payload: {
        index: 0, item: {...item}
    }})
}

export const removeFromEdit = (id) => dispatch => {
    dispatch({type: REMOVE_FROM_EDIT, payload: id})
}

export const changeItemPositon = (hoverIndex, id) => dispatch => {
    dispatch({type: CHANGE_EDIT_ITEM_POSTION, payload: {hoverIndex, id}})
}

export const updateSingleListItem = (index, id, img, filterStyle) => dispatch => {
    dispatch({type: UPDATE_SINGLE_LIST_ITEM, payload: {index, id, img, filterStyle}})
}

export const setSingleEditItem = (editedItem) => dispatch => {
    dispatch({type: SET_SINGLE_EDIT_ITEM, payload: editedItem})
}

export const updateSingleEditItem = (editedItem) => dispatch => {
    dispatch({type: UPDATE_SINGLE_EDIT_ITEM, payload: editedItem})
}

export const restSingleEditItem = () => dispatch => {
    dispatch({type: REST_SINGLE_EDIT_ITEM})
}