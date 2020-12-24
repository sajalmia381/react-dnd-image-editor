import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ImageSettingCard.css';

import {updateSingleEditItem} from '../../../actions/editedImageAction'

export default function ImageSettingCard () {
    const dispatch = useDispatch()
    const [img, imgFilters, isEditing] = useSelector(({EditedImage: {isEditing, editedItem}}) => ([editedItem.img, editedItem.filterStyle, isEditing]))
    const [tabName, setTabName] = useState('image')
    const [filterItems, setFilterItems] = useState(imgFilters)
    const rangeInputHandler = e => {
        if(!isEditing) {
            dispatch({type: 'IS_EDITING_TRUE'})
        }
        e.preventDefault();
        setFilterItems({...filterItems, [e.target.name]: {...filterItems[e.target.name], value: e.target.value}})
        dispatch(updateSingleEditItem({filterStyle: filterItems}))
    }
    const filterCss = () => {
        let filter = ``
        if (typeof(filterItems) == 'object') {
            Object.entries(filterItems).map(key => {
                filter += `${key[0]}(${key[1].value}${key[1].valueType}) `
            })
        }
        return filter
    }
    const {brightness, contrast, invert} = filterItems
    const hueRotate = filterItems['hue-rotate']
    return <>
        <div className="setting-card">
            <div className="setting-tab__link">
                <button className={tabName === 'image' ? 'selected' : '' } onClick={e => setTabName('image')}>Image</button>
                <button onClick={e => setTabName('filter')} className={tabName === 'filter' ? 'selected' : '' }>Filter</button>
            </div>
            <div className="setting-card__body">
                {tabName === 'image' ? (<div className="setting-card__image">
                        <div><img src={img} style={{filter: filterCss()}} alt="Img"/></div>
                        <button onClick={e => dispatch({type: 'IS_EDITING_TRUE'})}>Change Image</button>
                    </div>)
                    : (<div className="body__filter">
                        <div className="input-group">
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.00046 0.852051L2.22746 5.62505C1.24423 6.60811 0.588559 7.8708 0.350057 9.24057C0.111555 10.6103 0.301861 12.0203 0.894965 13.2779C1.48807 14.5354 2.45503 15.5791 3.6637 16.2663C4.87236 16.9535 6.26375 17.2507 7.64771 17.1173C8.92176 16.9946 10.1347 16.5123 11.145 15.7265C12.1553 14.9406 12.9214 13.8838 13.3538 12.6791C13.7863 11.4745 13.8674 10.1717 13.5876 8.92269C13.3077 7.67371 12.6786 6.53004 11.7735 5.62505L7.00046 0.852051ZM3.28796 6.68555L7.00046 2.97305V15.6481C5.96205 15.6481 4.94695 15.3403 4.08352 14.7634C3.22009 14.1865 2.54713 13.3665 2.14974 12.4072C1.75235 11.4478 1.64838 10.3922 1.85098 9.37372C2.05358 8.35527 2.55366 7.41978 3.28796 6.68555Z" fill="#4A5257"/>
                            </svg>
                            <input onChange={rangeInputHandler} id="id_hueRotate" name='hue-rotate' min={0} max={250} step={5} value={hueRotate.value} type="range"/>
                            <label htmlFor="id_hueRotate">{hueRotate.value} {hueRotate.valueType}</label>
                        </div>
                        <div className="input-group">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 2.32498L5.2875 6.03748C4.55333 6.77173 4.05337 7.70719 3.85084 8.72557C3.64831 9.74396 3.75231 10.7995 4.14969 11.7588C4.54706 12.7181 5.21997 13.538 6.08332 14.1149C6.94666 14.6917 7.96167 14.9996 9 14.9996C10.0383 14.9996 11.0533 14.6917 11.9167 14.1149C12.78 13.538 13.4529 12.7181 13.8503 11.7588C14.2477 10.7995 14.3517 9.74396 14.1492 8.72557C13.9466 7.70719 13.4467 6.77173 12.7125 6.03748L9 2.32498ZM9 0.203979L13.773 4.97698C14.717 5.92099 15.3599 7.12372 15.6203 8.43309C15.8808 9.74246 15.7471 11.0997 15.2362 12.3331C14.7253 13.5664 13.8601 14.6207 12.7501 15.3623C11.6401 16.104 10.335 16.4999 9 16.4999C7.66498 16.4999 6.35994 16.104 5.24991 15.3623C4.13988 14.6207 3.27472 13.5664 2.76382 12.3331C2.25293 11.0997 2.11925 9.74246 2.3797 8.43309C2.64014 7.12372 3.28301 5.92099 4.227 4.97698L9 0.203979ZM9 13.5V5.99998C9.99456 5.99998 10.9484 6.39507 11.6517 7.09833C12.3549 7.80159 12.75 8.75542 12.75 9.74998C12.75 10.7445 12.3549 11.6984 11.6517 12.4016C10.9484 13.1049 9.99456 13.5 9 13.5Z" fill="#4A5257"/>
                            </svg>
                            <input onChange={rangeInputHandler} id="id_invert" name='invert' min={0} max={250} step={5} value={invert.value} type="range"/>
                            <label htmlFor="id_invert">{invert.value} {invert.valueType}</label>
                        </div>
                        <div className="input-group">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9 12.375C9.89511 12.375 10.7536 12.0194 11.3865 11.3865C12.0194 10.7536 12.375 9.89511 12.375 9C12.375 8.10489 12.0194 7.24645 11.3865 6.61351C10.7536 5.98058 9.89511 5.625 9 5.625C8.10489 5.625 7.24645 5.98058 6.61351 6.61351C5.98058 7.24645 5.625 8.10489 5.625 9C5.625 9.89511 5.98058 10.7536 6.61351 11.3865C7.24645 12.0194 8.10489 12.375 9 12.375ZM9 13.5C10.1935 13.5 11.3381 13.0259 12.182 12.182C13.0259 11.3381 13.5 10.1935 13.5 9C13.5 7.80653 13.0259 6.66193 12.182 5.81802C11.3381 4.97411 10.1935 4.5 9 4.5C7.80653 4.5 6.66193 4.97411 5.81802 5.81802C4.97411 6.66193 4.5 7.80653 4.5 9C4.5 10.1935 4.97411 11.3381 5.81802 12.182C6.66193 13.0259 7.80653 13.5 9 13.5ZM9 0C9.14918 0 9.29226 0.0592632 9.39775 0.164752C9.50324 0.270242 9.5625 0.413316 9.5625 0.5625V2.8125C9.5625 2.96168 9.50324 3.10476 9.39775 3.21025C9.29226 3.31574 9.14918 3.375 9 3.375C8.85082 3.375 8.70774 3.31574 8.60225 3.21025C8.49676 3.10476 8.4375 2.96168 8.4375 2.8125V0.5625C8.4375 0.413316 8.49676 0.270242 8.60225 0.164752C8.70774 0.0592632 8.85082 0 9 0V0ZM9 14.625C9.14918 14.625 9.29226 14.6843 9.39775 14.7898C9.50324 14.8952 9.5625 15.0383 9.5625 15.1875V17.4375C9.5625 17.5867 9.50324 17.7298 9.39775 17.8352C9.29226 17.9407 9.14918 18 9 18C8.85082 18 8.70774 17.9407 8.60225 17.8352C8.49676 17.7298 8.4375 17.5867 8.4375 17.4375V15.1875C8.4375 15.0383 8.49676 14.8952 8.60225 14.7898C8.70774 14.6843 8.85082 14.625 9 14.625ZM18 9C18 9.14918 17.9407 9.29226 17.8352 9.39775C17.7298 9.50324 17.5867 9.5625 17.4375 9.5625H15.1875C15.0383 9.5625 14.8952 9.50324 14.7898 9.39775C14.6843 9.29226 14.625 9.14918 14.625 9C14.625 8.85082 14.6843 8.70774 14.7898 8.60225C14.8952 8.49676 15.0383 8.4375 15.1875 8.4375H17.4375C17.5867 8.4375 17.7298 8.49676 17.8352 8.60225C17.9407 8.70774 18 8.85082 18 9ZM3.375 9C3.375 9.14918 3.31574 9.29226 3.21025 9.39775C3.10476 9.50324 2.96168 9.5625 2.8125 9.5625H0.5625C0.413316 9.5625 0.270242 9.50324 0.164752 9.39775C0.0592632 9.29226 0 9.14918 0 9C0 8.85082 0.0592632 8.70774 0.164752 8.60225C0.270242 8.49676 0.413316 8.4375 0.5625 8.4375H2.8125C2.96168 8.4375 3.10476 8.49676 3.21025 8.60225C3.31574 8.70774 3.375 8.85082 3.375 9ZM15.3641 2.63587C15.4696 2.74136 15.5288 2.88441 15.5288 3.03356C15.5288 3.18272 15.4696 3.32577 15.3641 3.43125L13.7734 5.02313C13.7211 5.07535 13.659 5.11676 13.5907 5.145C13.5224 5.17323 13.4492 5.18774 13.3753 5.18769C13.226 5.18758 13.0829 5.12818 12.9774 5.02256C12.9252 4.97026 12.8838 4.90819 12.8556 4.83989C12.8273 4.77158 12.8128 4.69839 12.8129 4.62448C12.813 4.47521 12.8724 4.3321 12.978 4.22662L14.5687 2.63587C14.6742 2.53042 14.8173 2.47118 14.9664 2.47118C15.1156 2.47118 15.2586 2.53042 15.3641 2.63587ZM5.022 12.978C5.12745 13.0835 5.18669 13.2265 5.18669 13.3757C5.18669 13.5248 5.12745 13.6679 5.022 13.7734L3.43125 15.3641C3.32516 15.4666 3.18307 15.5233 3.03559 15.522C2.8881 15.5207 2.74702 15.4616 2.64273 15.3573C2.53843 15.253 2.47928 15.1119 2.478 14.9644C2.47671 14.8169 2.53341 14.6748 2.63587 14.5687L4.22662 12.978C4.33211 12.8725 4.47516 12.8133 4.62431 12.8133C4.77347 12.8133 4.91652 12.8725 5.022 12.978ZM15.3641 15.3641C15.2586 15.4696 15.1156 15.5288 14.9664 15.5288C14.8173 15.5288 14.6742 15.4696 14.5687 15.3641L12.978 13.7734C12.8755 13.6673 12.8188 13.5252 12.8201 13.3777C12.8214 13.2302 12.8806 13.0891 12.9849 12.9849C13.0891 12.8806 13.2302 12.8214 13.3777 12.8201C13.5252 12.8188 13.6673 12.8755 13.7734 12.978L15.3641 14.5687C15.4696 14.6742 15.5288 14.8173 15.5288 14.9664C15.5288 15.1156 15.4696 15.2586 15.3641 15.3641ZM5.022 5.02313C4.91652 5.12858 4.77347 5.18782 4.62431 5.18782C4.47516 5.18782 4.33211 5.12858 4.22662 5.02313L2.63587 3.43125C2.58215 3.37936 2.5393 3.31729 2.50982 3.24867C2.48034 3.18004 2.46482 3.10623 2.46417 3.03154C2.46352 2.95685 2.47775 2.88278 2.50604 2.81365C2.53432 2.74452 2.57609 2.68172 2.6289 2.6289C2.68172 2.57609 2.74452 2.53432 2.81365 2.50604C2.88278 2.47775 2.95685 2.46352 3.03154 2.46417C3.10623 2.46482 3.18004 2.48034 3.24867 2.50982C3.31729 2.5393 3.37936 2.58215 3.43125 2.63587L5.022 4.22662C5.07438 4.27888 5.11594 4.34095 5.1443 4.40929C5.17266 4.47763 5.18726 4.55089 5.18726 4.62488C5.18726 4.69886 5.17266 4.77212 5.1443 4.84046C5.11594 4.9088 5.07438 4.97087 5.022 5.02313Z" fill="#4A5257"/>
                            </svg>
                            <input onChange={rangeInputHandler} id="id_brightness" name='brightness' min={0} max={250} step={5} value={brightness.value} type="range"/>
                            <label htmlFor="id_brightness">{brightness.value} {brightness.valueType}</label>
                        </div>
                        <div className="input-group">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 14C8.084 14 8.084 10.0002 8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 9.5913 2.63214 11.1174 3.75736 12.2426C4.88258 13.3679 6.4087 14 8 14ZM8 15.5C3.85775 15.5 0.5 12.1423 0.5 8C0.5 3.85775 3.85775 0.5 8 0.5C12.1423 0.5 15.5 3.85775 15.5 8C15.5 12.1423 12.1423 15.5 8 15.5Z" fill="#4A5257"/>
                            </svg>
                            <input onChange={rangeInputHandler} id="id_contrast" name='contrast' min={0} max={250} step={5} value={contrast.value} type="range"/>
                            <label htmlFor="id_contrast">{contrast.value} {contrast.valueType}</label>
                        </div>
                    </div>)
                }
            </div>
        </div>
    </>
}