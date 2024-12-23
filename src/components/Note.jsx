import React, { useState } from 'react'
import Modal from './Modal';
import PropTypes from 'prop-types'

const Note = ({user}) => {
    const [showModal,setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    
  return (
    <div className='bg-transparent flex flex-col border-2 border-gray-400 p-3 rounded-lg max-w-80 min-w-40 min-h-40 max-h-48 overflow-hidden text-ellipsis' onClick={openModal}>
            <div className='flex flex-row justify-between gap-4'>
                <div className='top-4 left-0'>{user.title}</div>
                {/* <div className='relative flex items-end justify-end'>{User.date}</div> */}
            </div>
            
            <div className='px-4 py-2 mb-3 text-ellipsis'>
                {user.content}
             </div>
            {showModal && <Modal user={user} closeModal={closeModal} />}
    </div>
  )
}

Note.propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      date: PropTypes.string,
      content: PropTypes.string,
    }),
}

export default Note