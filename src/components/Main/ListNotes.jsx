import React, { useEffect, useState } from "react";
import { ref, onValue, push, set } from "firebase/database";
import Note from "./Note";
import {database} from "../../firebase";
import { useSearch } from '../../context/SearchContext';
import { useAuth } from "../../context/AuthContext"; 
import Masonry from 'react-masonry-css'

const ListNotes = ({ favourite = false }) => {
  const [notes, setNotes] = useState([]);
  const { searchTerm } = useSearch();
  const {user} = useAuth();

  useEffect(() => {
    const notesRef = ref(database, `ListNote/${user.uid}`);
    
    // Thiết lập listener một lần
    const unsubscribe = onValue(notesRef, (snapshot) => {
      if (snapshot.exists()) {
        const notesData = Object.entries(snapshot.val()).map(([key, value]) => ({
          ...value,
          firebaseKey: key
        }));

        // Sắp xếp ghi chú theo ngày giảm dần
        notesData.reverse();
        
        setNotes(notesData);
        console.log(notes);
      }
    });

    return () => unsubscribe();
  }, [user.uid]);

  // Lọc notes dựa trên searchTerm
  const filteredNotes = notes.filter(note => {
    const searchLower = searchTerm.toLowerCase();
    return (
      note.title?.toLowerCase().includes(searchLower) ||
      note.content?.toLowerCase().includes(searchLower) ||
      note.author?.toLowerCase().includes(searchLower)
    );
  });

  const favouriteFilter = notes.filter(note => {
    return (
      note.favourite === true
    );
  });

  const breakpoints = {
    default:4,
    1100:3,
    700:2,
    600:1
  }

  return (
    <div className="mx-auto container py-20 px-6">
      {/* <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> */}
      <Masonry
    breakpointCols={breakpoints}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column">
        {!favourite ?
          filteredNotes.map((note) => (
            <div key={note.firebaseKey} className="">
              <Note note={note} />
            </div>
          )) :
          favouriteFilter.map((note) => (
            <div key={note.firebaseKey} className="">
              <Note note={note} />
            </div>
          ))
        }
        </Masonry>
      </div>
    // </div>
  );
};

export default ListNotes;
