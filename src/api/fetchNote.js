import { connectToDB } from "../lib/mongooseDb"
import { Note } from "../models/Note"

const createNote = async (newNote) => {
    try{
        await connectToDB();
        await newNote.save()
        return new Response("Oke new note oke", {status: 200});
    }   
    catch(error){
        console.log(error);
    }
    return 
}

createNote.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        date: PropTypes.string,
        content: PropTypes.string,
        author:PropTypes.string,
    }).isRequired,
}
