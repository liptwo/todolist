import React from 'react'
import PropTypes from 'prop-types'
import { CancelRounded } from '@mui/icons-material'

const Modal = ({user, closeModal }) => {

  return (
    <div className='fixed justify-center items-center inset-0 z-30 bg-black text-white bg-opacity-95 w-[700px] max-w-3xl h-[600px] mx-auto rounded-xl'>
        <button className="text-white m-5 " onClick={closeModal}>X
         </button>
        <div className='p-5'>{user.title}</div>
        <div className=' bg-black boder-2 text-white border-gray-500 m-auto p-auto h-[500px} bg-white rounded-lg'>
                <div className='p-5'>{user.content}</div>
        </div>
        <div className='flex flex-row justify-between'>
            <div>Huỳnh Văn</div>
            <div>{user.date}</div>
        </div>
    </div>
  )
}

Modal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.string
  }),
  closeModal: PropTypes.func,
}

export default Modal