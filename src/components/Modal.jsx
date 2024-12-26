import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { CancelOutlined } from "@mui/icons-material";
import { ref, update } from "firebase/database";
import database from "../firebase";

const Modal = ({ note, closeModal }) => {
  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState(note?.content);
  const modalRef = useRef(null);

  const handleUpdate = async () => {
    try {
      const noteRef = ref(database, `ListNote/${note.firebaseKey}`);
      
      await update(noteRef, {
        title: title,
        content: content,
        date: new Date().toLocaleDateString("vi-VN"),
        author: note.author
      });

      closeModal();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div ref={modalRef} className='fixed flex flex-col justify-between my-auto inset-0 z-30 bg-black text-white bg-opacity-95 w-[700px] max-w-3xl h-[600px] mx-auto rounded-xl'>
      <button className='text-white absolute m-6 right-0' onClick={closeModal}>
        <CancelOutlined/>
      </button>
      <div>
        <div className='p-6'>
          <input 
            className='bg-transparent w-full outline-0 text-white' 
            type="text" 
            placeholder='Tiêu đề' 
            value={title} 
            onChange={(e)=>setTitle(e.target.value)} 
          />
        </div>
        <div className='bg-transparent text-black border-gray-500 rounded-lg m-1'>
          <textarea 
            name="Message" 
            rows="15" 
            className='p-5 bg-black w-full outline-0 text-white rounded resize-none mr-[-20px] scrollbar-hide' 
            placeholder='Mô tả' 
            value={content} 
            onChange={(e)=>setContent(e.target.value)} 
          />
        </div>
      </div>
      <div className='flex content-end justify-between p-2'>
        <div>{note.author}</div>
        <div>{note.date}</div>
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleUpdate}
        >
          Save
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  note: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
