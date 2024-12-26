import { connectToDB } from '../lib/mongooseDb';
import Note from '../models/Note';

export const createNote = async (noteData) => {
  try {
    await connectToDB();
    
    const newNote = new Note({
      title: noteData.title,
      content: noteData.content,
      author: "Văn Huỳnh", // Có thể thay đổi thành user hiện tại
      date: new Date().toLocaleDateString()
    });

    const savedNote = await newNote.save();
    return savedNote;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};