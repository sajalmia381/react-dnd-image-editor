import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import './ImageCard.css';
 
import { updateSingleEditItem } from '../../../actions/editedImageAction'

export default function ImageCard(props) {
    const {id, img, type, isEditing, isSelected} = props
    const dispatch = useDispatch()
    const [{ isDragging }, drag] = useDrag({
        item: { type, id, img },

        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const cardClickHandler = (e) => {   
        e.preventDefault()
        if(isEditing) {
            dispatch(updateSingleEditItem({id, img}))
        }
    }
    const opacity = isDragging ? 0.4 : 1;
    return <div onClick={cardClickHandler} ref={!isEditing? drag : null} style={{ opacity }} className={`card${isSelected && isEditing ? ' selected' : ''}`} id={id}>
        <img src={img} alt="card img" />
    </div>
}