import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CancelRounded } from '@mui/icons-material'

const Modal = ({user, closeModal }) => {
    const[title, setTitle] = useState(user?.title);
    const[content, setContent] = useState(user?.content);
  return (
    <div className='fixed flex flex-col justify-between my-auto inset-0 z-30 bg-black text-white bg-opacity-95 w-[700px] max-w-3xl h-[600px] mx-auto rounded-xl'>
        <div>
            <button className='text-white m-5 flex relative items-end' onClick={closeModal}>X</button>
            
            <div className='p-5'>
                <input className='bg-transparent w-full outline-0 text-white' type="text" placeholder='Tiêu đề' value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <div className=' bg-black boder-2 text-white border-gray-500 m-auto p-auto h-[500px} bg-white rounded-lg'>
                    <div className='p-5'>
                    <input className='bg-transparent w-full outline-0 text-white' placeholder='Mô tả' type="text" value={content} onChange={(e)=>setContent(e.target.value)} />
                    </div>
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
    author:PropTypes.string,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default Modal