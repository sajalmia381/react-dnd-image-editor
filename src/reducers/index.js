import {combineReducers} from 'redux';
import { ImageList } from './imageListReducer';
import {EditedImage} from './editedImage';

export const RootReducer = combineReducers({
    ImageList,
    EditedImage,
})