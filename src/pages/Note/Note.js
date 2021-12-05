import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import AboutNote from "../../Components/AboutNote/AboutNote";

const Note = () => {


    const params = useParams()
    let navigate = useNavigate()

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/todos/`, {params}).then(response => setData(response.data))
    }, [params])

    const handleClickNavigate = () => {
        navigate('/')
    }

    const refreshNote = (updateNote) => {
        axios.put(`http://localhost:3001/todos/${params.id}`, updateNote,).then(response => {
            console.log(response.data)
        })
    }

    const removeNote = () => {
        axios.delete(`http://localhost:3001/todos/${params.id}`).then(response => {
            console.log(response.data)
        })
        handleClickNavigate()
    }


    return (
        <div className='noteItemWrapper'>
            {data.map(({title, tags, id}) => <AboutNote key={id} title={title} tags={tags}
                                                        id={id} goHome={handleClickNavigate}
                                                        refresh={refreshNote} remove={removeNote}
            />)}
        </div>
    );
};

export default Note;