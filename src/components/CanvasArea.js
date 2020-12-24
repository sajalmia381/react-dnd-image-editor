import { useState, useEffect, useCallback } from 'react';
import update from 'react-addons-update';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ADD_TO_EDIT } from '../constants/MediaDnd';
import { EditorImageCard } from './Card';

import { addToEdit, removeFromEdit, restSingleEditItem} from '../actions/editedImageAction';

const styles = {
    root: {
        backgroundColor: '#fff',
        width: 'calc(100% - 395px)',
        margin: '50px',
        padding: '50px 20px',
        marginLeft: 'auto',
        minHeight: '80vh',
    },
    placeholderContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    placeholderBox: {
        border: '2px dashed #DDE2E8',
        boxSizing: 'border-box',
        borderRadius: '8px',
        textAlign: 'center',
        padding: '100px 150px'
    },
    placeholderText: {
        fontSize: '18px',
        lineHeight: '21px',
        textAlign: 'center',
        color: '#4A5257',
        marginTop: '35px'
    }
}

const CanvasArea = () => {
    const dispatch = useDispatch()
    const [imageList, setImageList] = useState([])
    const [editedImageList, settingIndex] = useSelector(({EditedImage}) => [EditedImage.list, EditedImage.editedItem.index])

    const [, Drop] = useDrop({
        accept: ADD_TO_EDIT,
        canDrop: (item, monitor) => {
            return !editedImageList.some(obj => item.id === obj.id)
        },
        hover: (item, monitor) => {
            if(editedImageList.some(obj => item.id === obj.id)){
                return
            }
        },
        drop: (item, monitor) => {
            dispatch(addToEdit({id: item.id, img: item.img, style: {
                brightness: {
                    value: 100,
                    valueType: '%'
                },
                contrast: {
                    value: 100,
                    valueType: '%'
                },
                invert: {
                    value: 0,
                    valueType: '%'
                },
                'hue-rotate': {
                    value: 0,
                    valueType: 'deg'
                },
            }}))
            return {
                id: item.id,
                img: item.img
            }
        },
        collect: (monitor) => {
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }
        },
    });
    const removeItemHandler = (id) => {
        dispatch(removeFromEdit(id))
        dispatch(restSingleEditItem())
    }

    useEffect(() => {
        setImageList(editedImageList)
    }, [editedImageList])

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = imageList[dragIndex];
        setImageList(update(imageList, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    }, [imageList]);
    return <div style={styles.root} ref={Drop}>
        {editedImageList.length > 0 ?
            (<div className="card-items">
                {imageList.map((item, index) => 
                <EditorImageCard
                    showSetting={settingIndex === index ? true : false}
                    key={index}
                    index={index} 
                    id={item.id} 
                    img={item.img}
                    imgFilters={item.style}
                    moveCard={moveCard}
                    removeItemHandler={removeItemHandler}
                />)}
            </div>)
            : (<div className="placeholder-container" style={styles.placeholderContainer}>
                <div className="box" style={styles.placeholderBox}>
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M81.25 100H18.75C8.39375 100 0 91.6062 0 81.25V18.75C0 8.39375 8.39375 0 18.75 0H81.25C91.6062 0 100 8.39375 100 18.75V81.25C100 91.6062 91.6062 100 81.25 100Z" fill="#ECF8FF"/>
                    <path d="M35.4156 47.9156C37.7125 47.9156 39.5813 46.0469 39.5813 43.75C39.5813 41.4531 37.7125 39.5844 35.4156 39.5844C33.1188 39.5844 31.25 41.4531 31.25 43.75C31.25 46.0469 33.1188 47.9156 35.4156 47.9156Z" fill="#A0D9FA"/>
                    <path d="M68.75 35.4156H46.6969L43.1406 31.8594C42.75 31.4687 42.2187 31.25 41.6687 31.25H31.25C27.8031 31.25 25 34.0531 25 37.5V62.5C25 65.9469 27.8031 68.75 31.25 68.75H68.75C72.1969 68.75 75 65.9469 75 62.5V41.6656C75 38.2188 72.1969 35.4156 68.75 35.4156ZM31.25 35.4156H40.8062L44.3625 38.9719C44.7531 39.3625 45.2844 39.5813 45.8344 39.5813H68.75C69.9 39.5813 70.8344 40.5156 70.8344 41.6656V56.1219L59.875 45.1625C58.45 43.7375 56.1313 43.7375 54.7063 45.1625L44.7906 55.0781L42.1656 52.4531C40.7406 51.0281 38.4219 51.0281 36.9969 52.4531L29.1625 60.2875V37.5C29.1656 36.35 30.1 35.4156 31.25 35.4156Z" fill="#35AEF2"/>
                    </svg>
                    <p>Drop an image from Media Panel</p>
                </div>
            </div>)
        }
    </div>
}


export default CanvasArea