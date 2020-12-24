import update from 'react-addons-update';
import { 
    ADD_TO_EDIT, 
    REMOVE_FROM_EDIT, 
    CHANGE_EDIT_ITEM_POSTION,
    UPDATE_SINGLE_LIST_ITEM, 

    SET_SINGLE_EDIT_ITEM,
    UPDATE_SINGLE_EDIT_ITEM,
    REST_SINGLE_EDIT_ITEM
} from '../constants/ImageList';

const initalState = {
    isEditing: false,
    editedItem: {
        index: '',
        id: '',
        img: '',
        filterStyle: {}
    },
    list: JSON.parse(localStorage.getItem('edited_list'))
}

const updateLocalStorage = (list) => {
    localStorage.setItem('edited_list', JSON.stringify(list))
}

export const EditedImage = (state=initalState, action) => {
    const {type, payload} = action
    // eslint-disable-next-line default-case
    const {list} = state
    switch(type) {
        case ADD_TO_EDIT:
            if (list.filter(item => item.id !== payload.item.id)) {
                list.splice(payload.index, 0, payload.item)
            }
            updateLocalStorage(list)
            return ({...state, list: list})
        case REMOVE_FROM_EDIT:
            const newList = list.filter(item => item.id !== payload)
            updateLocalStorage(newList)
            return ({...state, list: newList})
        case CHANGE_EDIT_ITEM_POSTION:
            const card = list.find(item => item.id === payload.id)
            const getIndex = list.findIndex(item => item.id === payload.id)
            const _newList = update(list, {
                $splice: [
                    [getIndex, 1],
                    [payload.hoverIndex, 0, card],
                ],
            })
            updateLocalStorage(_newList)
            return ({...state, list: _newList})
        case UPDATE_SINGLE_LIST_ITEM:
            const { index, id, img, filterStyle} = payload
            const item = list.filter((fi, i) => i === index)[0]
            item.id = id
            item.img = img
            item.style = filterStyle
            updateLocalStorage(list)
            return ({...state, list: list, editedItem: initalState.editedItem, isEditing: false})

        case 'IS_EDITING_TRUE': 
            return ({...state, isEditing: true})
        case 'IS_EDITING_FALSE': 
            return ({...state, isEditing: false})
        
        case SET_SINGLE_EDIT_ITEM:
            return ({...state, editedItem: payload})
        case UPDATE_SINGLE_EDIT_ITEM: 
            const __filterStyle = payload.filterStyle ? payload.filterStyle : state.editedItem.filterStyle
            const __id = payload.id ? payload.id : state.editedItem.id
            const __img = payload.img ? payload.img : state.editedItem.img
            return ({...state, editedItem: {...state.editedItem, id: __id, img: __img, filterStyle: __filterStyle}})
        case REST_SINGLE_EDIT_ITEM:
            return ({...state, editedItem: initalState.editedItem, isEditing: false})
        default:
            return state
    }
}