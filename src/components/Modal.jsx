import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { CancelOutlined } from "@mui/icons-material";

const Modal = ({ user, closeModal }) => {
  const [title, setTitle] = useState(user?.title);
  const [content, setContent] = useState(user?.content);
  const modalRef = useRef(null);

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
            <button className='text-white absolute m-6 right-0' onClick={closeModal}><CancelOutlined/></button>
            <div>
                <div className='p-6'>
                    <input className='bg-transparent w-full outline-0 text-white' type="text" placeholder='Tiêu đề' value={title} onChange={(e)=>setTitle(e.target.value)} />
                </div>
                <div className=' bg-transparent text-black border-gray-500 rounded-lg m-1'>
                    <textarea name="Message" rows="15" className=' p-5 bg-black w-full outline-0 text-white rounded resize-none mr-[-20px] scrollbar-hide' placeholder='Mô tả' type="text" value={content} onChange={(e)=>setContent(e.target.value)} />
                </div>
            </div>
            <div className=' flex content-end justify-between p-2'>
                <div>{user.author}</div>
                <div>{user.date}</div>
            </div>
        </div>
    )
}

Modal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
