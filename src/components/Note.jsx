import React, { useState } from "react";
import Modal from "./Modal";
import PropTypes from "prop-types";
import { CancelSharp } from "@mui/icons-material";
import { ref , remove } from 'firebase/database';
import database from "../firebase";


const Note = ({ note }) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleRemove = async() => {
    try{
      const noteref = ref( database, `ListNote/${note.firebaseKey}`);
      await remove(noteref);
      console.log('Note deleted successfully');
    }
    catch(error){
      console.log('Error deleting note: ', error);
    }
  }

  return (
    <>
      <div 
        className="w-full h-64 flex flex-col border border-opacity-30 justify-between hover:shadow-lg hover:dark:border-gray-500 bg-white dark:border-gray-300 rounded-lg mb-6 py-5 px-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`absolute ${isHovered ? '' : 'hidden'}`}>
          <button className="relative top-[-35px] left-[-30px]" onClick={handleRemove}><CancelSharp /></button>
        </div>       
        <div className="overflow-hidden ">

          <div className="flex flex-row justify-between gap-4">
            <h4 className="text-gray-800 dark:text-black-100 font-bold mb-3">
              {note.title}
            </h4>
            <div className="relative  flex items-end justify-end text-gray-800 dark:text-black-100 font-bold mb-3">
              {note.date}
            </div>
          </div>
          <div className="">{note.content}</div>
        </div>
        <div>
          <div className="flex items-center justify-between text-gray-800 dark:text-black-100">
            <p className="text-sm">{note.author}</p>
            <button
              className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
              aria-label="edit note"
              role="button"
              onClick={openModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-pencil"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {showModal && <Modal note={note} closeModal={closeModal} />}
    </>
  );
};

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
};

export default Note;
