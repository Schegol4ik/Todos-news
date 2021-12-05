import React, {useEffect, useMemo, useState} from 'react';
import axios from "axios";
import {useFetching} from "../../hooks/useFetching";
import NoteService from "../../API/NotesService";
import MyButton from "../../UI/MyButton/MyButton";
import MyModal from "../../UI/MyModal/MyModal";
import NoteFormCreate from "../../Components/FormCreateNote/NoteFormCreate";
import NoteList from "../../Components/NoteList/NoteList";
import MyInput from "../../UI/MyInput/MyInput";


const Notes = () => {

    const [modal, setModal] = useState(false) //Модальное окно
    const [notes, setNotes] = useState([]) //localState заметок
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        fetchPost()
    }, [setNotes, modal]) //получение заметок с back

    const [fetchPost, isPostsLoading, postError] = useFetching(async () => {
        const response = await NoteService.getALL()
        setNotes(response.data)
    }) //Обработка получения данных

    const createNote = (newNote) => {
        axios.post('http://localhost:3001/todos', newNote).then(response => {
            try {

                setNotes([...notes, response.data])
                setModal(false)
            } catch (e) {
                console.log(e)
            }
        })
    } //Создание заметки

    const searchPost = useMemo(() => {
            return  notes.filter(({title}) => title.toLowerCase().includes(`${searchQuery.toLowerCase()}`))
    }, [searchQuery, notes]) //Фильтрация

    return (
        <div>
            <MyButton style={{marginTop: '15px'}} onClick={() => setModal(true)}>Создать заметку</MyButton>
            <MyInput
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Поиск....'
            />
            <MyModal visible={modal} setVisible={setModal}>
                <NoteFormCreate create={createNote}/>
            </MyModal>
            <NoteList notes={searchPost} isPostsLoading={isPostsLoading} postError={postError}/>
        </div>
    );
};

export default Notes;