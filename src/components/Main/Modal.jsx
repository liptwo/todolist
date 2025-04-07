import React, { useEffect, useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { CancelOutlined } from "@mui/icons-material";
import { ref, update } from "firebase/database";
import {database} from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import UpLoadImg from "../../services/CloudImage";

const Modal = ({ note, closeModal }) => {
  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState(note?.content);
  const [imageUrl, setimageUrl] = useState(note?.imageUrl);
  const modalRef = useRef(null);
  const [photo, setPhoto] = useState();
  const {user} = useAuth();
  const handleUpdate = async () => {
    try {
      const noteRef = ref(database, `ListNote/${user.uid}/${note.firebaseKey}`);
      
      await update(noteRef, {
        title: title,
        content: content,
        date: new Date().toLocaleDateString("vi-VN"),
        imageUrl: imageUrl,
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

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const imageUrl = await UpLoadImg(file);
      setimageUrl(imageUrl);
      setPhoto(file);
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
    }
  };

  return (
    <div ref={modalRef} className='fixed flex flex-col justify-between overflow-auto my-auto inset-0 z-30 bg-white text-black bg-opacity-95 w-[700px] max-w-3xl h-[600px] mx-auto rounded-xl'>
      <button className='absolute m-6 right-0' onClick={closeModal}>
        <CancelOutlined/>
      </button>
      <div>
        <div className='p-6'>
          <input 
            className='bg-transparent font-bold  w-full outline-0' 
            type="text" 
            placeholder='Tiêu đề' 
            value={title} 
            onChange={(e)=>setTitle(e.target.value)} 
          />
        </div>
        <div className='bg-transparent text-black    border-gray-500 rounded-lg m-1'>
          <textarea 
            name="Message" 
            rows="10" 
            className='p-5 w-full resize focus:outline-none focus:ring-0 focus:border-none overflow-hidden bg-transparent outline-0 rounded mr-[-20px] scrollbar-hide' 
            placeholder='Mô tả' 
            value={content} 
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onChange={(e)=>setContent(e.target.value)} 
            
          >

          </textarea>
          <div className="">
          
          <img 
              src={imageUrl||""} 
              alt="" 
              className={`${!note.imageUrl ?"" : ("w-[400px] max-h-[500px] rounded-t-lg")} object-cover`}
            >
              
            </img>
            {imageUrl? 
            (<div onClick={(e)=>{setimageUrl("")}} className="absolute bg-red-400 rounded p-1 text-white hover:bg-red-500 cursor-pointer">Xóa ảnh</div>
            ):(<></>)}
            </div>
        </div>
      </div>
      <div className='flex content-end justify-between p-2'>
      {imageUrl? 
        (<div></div>):
        (<button className="cursor-pointer block">
          <label 
                    htmlFor="file" 
                    className="cursor-pointer block">
            Thêm ảnh
          </label>
          <input
            type="file"
            id="file"
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: "none" }}
          />
        </button>
          )
      }
        <div>Cập nhập ngày {note.date}</div>
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
