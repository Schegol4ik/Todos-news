import React from 'react';
import './NoteList.scss'
import NoteItems from "../NoteItems/NoteItems";

const NoteList = ({notes, remove, isPostsLoading, postError, actual, refresh, searchNotes}) => {

    if (postError) {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Произошла ошибка</h1>
                <span>требуется подключение к json-файлу пожалуйста запустите
                    <span style={{color:'red'}}> npm run dev</span></span>
            </div>
        )
    }

    if (isPostsLoading) {
        return (
            <h1 style={{textAlign: 'center'}}>Загружаемся !</h1>
        )
    }


    return (
        <div className='wrapperNoteList'>
            {(!notes.length) ? <h1>Заметки не найдены !</h1> : <h1>Список заметок</h1>}
            {

                notes.map((note, index) => <NoteItems key={index} remove={remove} number={index + 1}
                                                      actual={actual} note={note} refresh={refresh}/>)
            }

        </div>
    );
};

export default NoteList;