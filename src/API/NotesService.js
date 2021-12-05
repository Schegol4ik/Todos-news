import axios from "axios";

export default class NoteService{
    static async getALL(){
        const response = await axios.get('http://localhost:3001/todos')
        return response
    }
}

