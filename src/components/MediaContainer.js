import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CanvasArea } from '.';
import { MediaSidebar } from './MediaSidebar';

import {updateSingleListItem} from '../actions/editedImageAction'

const classes  = {
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    }
}

const MediaContainer = () => {
    const dispatch = useDispatch()
    const isEditing = useSelector(state => state.EditedImage.isEditing)
    const [index, id, img, filterStyle] = useSelector(({EditedImage: {editedItem: {index, id, img, filterStyle}}}) => [index, id, img, filterStyle])

    const editItemSaveHandler = () => {
        dispatch(updateSingleListItem(index, id, img, filterStyle))
    }
    return <div className="container" style={classes.root}>
        <DndProvider backend={HTML5Backend}>
            <MediaSidebar editItemSaveHandler={editItemSaveHandler} />
            <CanvasArea />
            {isEditing ? <div onClick={e => editItemSaveHandler()} className="drop-shadow"></div> : ''}
        </DndProvider>
    </div>
}

export default MediaContainer