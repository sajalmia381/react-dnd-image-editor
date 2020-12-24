import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './MediaSidebar.css';
import Loading from '../Loading';
import { ImageCard } from '../Card';
import { ADD_TO_EDIT } from '../../constants/MediaDnd';

import { fetchImageData } from '../../actions/imageAction';
import { restSingleEditItem } from '../../actions/editedImageAction';

const MediaSidebar = (props) => {
    const dispatch = useDispatch()
    const [mediaList, mediaLoading, errorMsg] = useSelector(({ImageList: {results, loading, error}}) => ([results, loading, error]))
    const isEditing = useSelector(state => state.EditedImage.isEditing)
    const selectedId = useSelector(state => state.EditedImage.editedItem.id)
    useEffect(() => {
        dispatch(fetchImageData())
    }, [])

    return <div className="sidebar">
        <div className="sidebar_box">
            {mediaLoading ? <Loading /> 
                : errorMsg 
                ? <p>!!! {errorMsg}</p> 
                : (<>{mediaList.map(({char_id, img}) => {
                        return <ImageCard isEditing={isEditing} isSelected={selectedId === char_id} isEditing={isEditing} key={char_id} id={char_id} img={img} type={ADD_TO_EDIT} />
                    })}
                    {isEditing ? <div className="btnGroup" >
                        <button onClick={e => props.editItemSaveHandler()} className="btnSave">Save</button>
                        <button onClick={e => dispatch(restSingleEditItem())} className="btnCancle">Cancle</button>
                    </div> : ''
                    }
                </>
                )
            }
        </div>
    </div>
}

export default MediaSidebar