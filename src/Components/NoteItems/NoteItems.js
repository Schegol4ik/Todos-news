import React from 'react';
import MyButton from "../../UI/MyButton/MyButton";
import './NoteItems.scss'
import {useNavigate} from "react-router-dom";


const NoteItems = (props) => {
    let navigate = useNavigate()
    const handleClickNavigate = () => {
        navigate(`/note/${props.note.id}`)
    }

    return (
        <div className="noteWrapper">
            <div className="note_btns">
                <MyButton onClick={handleClickNavigate}>Открыть</MyButton>
            </div>
            <div className="note_content">
                <div>
                    <strong>{props.number}</strong>
                    <span> {props.note.title}</span>
                </div>
                <div className='tags__content'>
                    {(!props.note.tags)
                        ? <div></div>
                        : props.note.tags.map(tags => <span key={tags}>{tags}</span>)
                    }
                </div>
            </div>
        </div>
    );
};

export default NoteItems;