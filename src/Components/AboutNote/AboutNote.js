import React, {useMemo, useState} from 'react';
import './AboutNote.scss'
import MyInput from "../../UI/MyInput/MyInput";
import MyButton from "../../UI/MyButton/MyButton";
import Highlighter from "react-highlight-words";

const AboutNote = ({goHome, title, id, tags, refresh, remove}) => {
    const [changeTitle, setChangeTitle] = useState(title)
    const [editMode, setEditMode] = useState(false)
    const [changeTags, setChangeTags] = useState(tags)

    const updateNote = (e) => {
        e.preventDefault()
        let newNote = {
            title: changeTitle,
            tags: changeTags
        }
        refresh(newNote)
        goHome()
    }

    const regexp = /(?=#)\S+./g

    useMemo(() => {
        setChangeTags(changeTitle.match(regexp))
    }, [changeTitle])


    return (
        <div className='wrapperAboutNote'>
            <h1>Редактирование заметки</h1>
            <div className='about__content'>
                {(editMode)
                    ? <div className='edit__content'>
                        <Highlighter
                            highlightClassName='highLight_tags'
                            searchWords={[regexp]}
                            textToHighlight={changeTitle}
                        />
                        <MyInput
                            value={changeTitle}
                            autoFocus={true}
                            onKeyPress={(e) => {if(e.key === 'Enter'){
                                setEditMode(false)
                            }}}
                            onChange={(e) => setChangeTitle(e.target.value)}
                            onBlur={() => setEditMode(false)}/>
                            <MyButton onClick={() => setEditMode(false)}>Сохранить</MyButton>
                    </div>
                    : <Highlighter
                        className='span__content'
                        highlightClassName='highLight_tags'
                        searchWords={[regexp]}
                        textToHighlight={changeTitle}
                        onDoubleClick={() => setEditMode(true)}
                    />
                }

                <h3>Используемые теги</h3>
                {(!changeTags)
                    ? <span>Тегов нету</span>
                    : <span className='tags'> {changeTags.map(tags => tags)}</span>}

            </div>
            <div className='about__btn'>
                <MyButton onClick={updateNote}>Сохранить изменения</MyButton>
                <MyButton onClick={remove}>Удалить</MyButton>
                <MyButton onClick={goHome}>Отмена</MyButton>
            </div>
        </div>
    );
};

export default AboutNote;