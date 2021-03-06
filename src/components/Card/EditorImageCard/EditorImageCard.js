import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import './EditorImageCard.css';
import { ITEM_SORT } from '../../../constants/MediaDnd';
import { ImageSettingCard } from '../index';
import {changeItemPositon, setSingleEditItem} from '../../../actions/editedImageAction';
 
export default function EditorImageCard(props) {
    const { index, id, img, imgFilters, moveCard, showSetting, removeItemHandler } = props
    const dispatch = useDispatch()
    const [showHoverBtns, setShowHoverBtns] = useState(false)
    const isEditing = useSelector(state => state.EditedImage.isEditing)
    const ref = useRef(null)

    const [{ isDragging }, drag] = useDrag({
        item: { type: ITEM_SORT, old_index: index, index, id, img},
        
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [, drop] = useDrop({
        accept: ITEM_SORT,
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
        drop: (item, monitor) => {
            if (item.old_index !== item.index) {
                dispatch(changeItemPositon(item.index, item.id))
            }
        }
    })
    const handleSettingModal = (e) => {
        e.preventDefault();
        dispatch(setSingleEditItem({index, id, img, filterStyle: imgFilters}))
        setShowHoverBtns(isEditing)
    }
    const filterCss = () => {
        let filter = ``
        if (typeof(imgFilters) == 'object') {
            Object.entries(imgFilters).map(key => {
                filter += `${key[0]}(${key[1].value}${key[1].valueType}) `
            })
        }
        return filter
    }
    const zIndex = showSetting ? 9999 : '';
    drag(drop(ref))
    return <div ref={isEditing || showSetting ? null : ref} style={{zIndex}} className="card" id={id} onMouseEnter={e => setShowHoverBtns(true)} onMouseLeave={e => setShowHoverBtns(false)}>
        <img style={{opacity: isDragging ? 0 : 1, filter: filterCss() }} src={img} alt="card img" />
        {showHoverBtns || showSetting ? (<div className="hover-btns__container">
                <div className="hover-btns__box">
                    <div className="hover-btns__group">
                        <button className={showSetting ? 'active' : ''} type='button' onClick={handleSettingModal}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M9.00959 6.62891C8.42561 6.62891 7.87873 6.85547 7.46467 7.26953C7.05256 7.68359 6.82405 8.23047 6.82405 8.81445C6.82405 9.39844 7.05256 9.94531 7.46467 10.3594C7.87873 10.7715 8.42561 11 9.00959 11C9.59358 11 10.1405 10.7715 10.5545 10.3594C10.9666 9.94531 11.1951 9.39844 11.1951 8.81445C11.1951 8.23047 10.9666 7.68359 10.5545 7.26953C10.3523 7.06574 10.1116 6.90416 9.84634 6.79418C9.58113 6.68421 9.2967 6.62803 9.00959 6.62891ZM17.0623 11.2285L15.785 10.1367C15.8455 9.76563 15.8768 9.38672 15.8768 9.00977C15.8768 8.63281 15.8455 8.25195 15.785 7.88281L17.0623 6.79102C17.1588 6.70841 17.2279 6.59839 17.2603 6.47558C17.2928 6.35278 17.2871 6.223 17.244 6.10352L17.2264 6.05274C16.8749 5.06971 16.3481 4.15851 15.6717 3.36328L15.6365 3.32227C15.5544 3.22569 15.4449 3.15626 15.3226 3.12314C15.2002 3.09002 15.0706 3.09475 14.951 3.13672L13.3651 3.70117C12.7791 3.2207 12.1268 2.8418 11.4197 2.57813L11.1131 0.919922C11.09 0.795004 11.0294 0.680083 10.9394 0.590425C10.8494 0.500768 10.7342 0.440619 10.6092 0.417969L10.5565 0.408203C9.54084 0.224609 8.47053 0.224609 7.4549 0.408203L7.40217 0.417969C7.27716 0.440619 7.16201 0.500768 7.072 0.590425C6.98199 0.680083 6.9214 0.795004 6.89826 0.919922L6.58967 2.58594C5.88933 2.85171 5.23693 3.2297 4.65803 3.70508L3.06037 3.13672C2.94077 3.09442 2.81114 3.08951 2.68868 3.12266C2.56623 3.1558 2.45676 3.22542 2.37483 3.32227L2.33967 3.36328C1.66446 4.15936 1.13786 5.07033 0.784983 6.05274L0.767404 6.10352C0.679514 6.34766 0.75178 6.62109 0.949045 6.79102L2.24201 7.89453C2.18147 8.26172 2.15217 8.63672 2.15217 9.00781C2.15217 9.38281 2.18147 9.75781 2.24201 10.1211L0.952951 11.2246C0.856459 11.3072 0.787397 11.4172 0.754951 11.54C0.722505 11.6629 0.728211 11.7926 0.771311 11.9121L0.788889 11.9629C1.1424 12.9453 1.66389 13.8535 2.34358 14.6523L2.37873 14.6934C2.46087 14.7899 2.57034 14.8594 2.69272 14.8925C2.8151 14.9256 2.94464 14.9209 3.06428 14.8789L4.66194 14.3105C5.24397 14.7891 5.8924 15.168 6.59358 15.4297L6.90217 17.0957C6.92531 17.2206 6.9859 17.3355 7.07591 17.4252C7.16591 17.5149 7.28107 17.575 7.40608 17.5977L7.45881 17.6074C8.48443 17.792 9.53476 17.792 10.5604 17.6074L10.6131 17.5977C10.7381 17.575 10.8533 17.5149 10.9433 17.4252C11.0333 17.3355 11.0939 17.2206 11.117 17.0957L11.4237 15.4375C12.1307 15.1719 12.783 14.7949 13.369 14.3145L14.9549 14.8789C15.0745 14.9212 15.2041 14.9261 15.3266 14.893C15.449 14.8598 15.5585 14.7902 15.6405 14.6934L15.6756 14.6523C16.3553 13.8496 16.8768 12.9453 17.2303 11.9629L17.2479 11.9121C17.3319 11.6699 17.2596 11.3984 17.0623 11.2285ZM9.00959 12.248C7.11311 12.248 5.576 10.7109 5.576 8.81445C5.576 6.91797 7.11311 5.38086 9.00959 5.38086C10.9061 5.38086 12.4432 6.91797 12.4432 8.81445C12.4432 10.7109 10.9061 12.248 9.00959 12.248Z"/>
                            </svg>
                        </button>
                        <button onClick={e => removeItemHandler(id)} type='button'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M14.875 3H12.375V1.4375C12.375 0.748047 11.8145 0.1875 11.125 0.1875H4.875C4.18555 0.1875 3.625 0.748047 3.625 1.4375V3H1.125C0.779297 3 0.5 3.2793 0.5 3.625V4.25C0.5 4.33594 0.570312 4.40625 0.65625 4.40625H1.83594L2.31836 14.6211C2.34961 15.2871 2.90039 15.8125 3.56641 15.8125H12.4336C13.1016 15.8125 13.6504 15.2891 13.6816 14.6211L14.1641 4.40625H15.3438C15.4297 4.40625 15.5 4.33594 15.5 4.25V3.625C15.5 3.2793 15.2207 3 14.875 3ZM10.9688 3H5.03125V1.59375H10.9688V3Z"/>
                            </svg>
                        </button>
                    </div>
                    {showSetting ? <ImageSettingCard /> : '' }
                </div>
               
            </div>)
            : ''
        }
    </div>
}