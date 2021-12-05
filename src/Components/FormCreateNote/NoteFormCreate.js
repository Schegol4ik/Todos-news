import React, {useMemo, useState} from 'react';
import './NoteFormCreate.scss'
import MyInput from "../../UI/MyInput/MyInput";
import MyButton from "../../UI/MyButton/MyButton";


const NoteFormCreate = ({create}) => {

    const [note, setNote] = useState({title:''})
    const [tags,setTags] = useState(null)

    let addNewNote = (e) => {
        e.preventDefault()
        const newNote = {
            ...note,
            tags: tags,
        }
        create(newNote)
        setNote({title:''})
    }



    const regexp = /(?=#)\S+./g

    useMemo(()=> {
        setTags(note.title.match(regexp))
    },[note.title])


    return (
        <div className='wrapperForm'>
            <form>
                <MyInput
                    type="text" placeholder="Описание заметки"
                    value={note.title}
                    onChange={e => setNote({...note, title: e.target.value})}/>
                {(!tags)?<span></span> : <div>{tags.map(tags => <span key={tags}>{tags}</span>)}</div>}
                <MyButton onClick={addNewNote}>Создать заметку</MyButton>
            </form>
        </div>
    );
};

export default NoteFormCreate;