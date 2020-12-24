import { IMAGE_LIST_REQUEST, IMAGE_LIST_SUCCESS, IMAGE_LIST_FAIL } from '../constants/ImageList';


export const fetchImageData = () => async (dispatch) => {
    try{
        dispatch({type: IMAGE_LIST_REQUEST})
        const response = await fetch('https://www.breakingbadapi.com/api/characters?limit=20')
        const data = await response.json()
        if (response.status === 200) {
            dispatch({type: IMAGE_LIST_SUCCESS, payload: data})
        }
    } catch (err) {
        dispatch({
            type: IMAGE_LIST_FAIL,
            payload: err.message
        })
    }
}