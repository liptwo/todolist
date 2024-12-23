import React, { useState } from 'react'
import Modal from './Modal';
import PropTypes from 'prop-types'

const Note = ({ user }) => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    
    return (
        <>
        <div className='w-full h-64 flex flex-col justify-between  bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4'>
            <div>
                <div className='flex flex-row justify-between gap-4'>
                    <h4 className='text-gray-800 dark:text-black-100 font-bold mb-3'>{user.title}</h4>
                    <div className='relative flex items-end justify-end text-gray-800 dark:text-black-100 font-bold mb-3'>{user.date}</div>
                </div>
                <div className=''>
                    {user.content}
                 </div>
            </div>
            <div>
                <div class="flex items-center justify-between text-gray-800 dark:text-black-100">
                    <p class="text-sm">{user.author}</p>
                    <button class="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black" aria-label="edit note" role="button"  onClick={openModal}>
                        <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"></path>
                            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                        </svg>
                    </button>
                 </div>
            </div>
            
            
        </div>
        {showModal && <Modal user={user} closeModal={closeModal} />}
        </>
    )
}

Note.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        date: PropTypes.string,
        content: PropTypes.string,
        author:PropTypes.string,
    }).isRequired,
}

export default Note