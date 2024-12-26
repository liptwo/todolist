import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import Note from "./Note";
import database from "../firebase"

const ListNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const notesRef = ref(database, 'ListNote');
    
    // Thiết lập listener một lần
    const unsubscribe = onValue(notesRef, (snapshot) => {
      if (snapshot.exists()) {
        const notesData = Object.entries(snapshot.val()).map(([key, value]) => ({
          ...value,
          firebaseKey: key
        }));
        setNotes(notesData);
        console.log(notes);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="mx-auto container py-20 px-6">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {notes.map((note) => (
          <div key={note.firebaseKey} className="rounded flex flex-row">
            <Note note={note} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListNotes;
