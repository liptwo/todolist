import React, { useState } from 'react'

import Note from './Note';

const users = [
    { id: 1, title: "Chao em co gai", date : "22/12/2024", content:"Xin chao moi nguoi nhe toi ten la liptwo" },
    { id: 2, title: "Con duong cahng may ai di", date : "22/12/2024", content:"Có gì mọi người nhỉ"},
    { id: 3, title: "Charlie yeu dau", date : "22/12/2024",content:"Có gì mọi người nhỉ" },
  ];

const ListNotes = () => {
    

  return (
    <div className="container mx-auto p-4">
        <div className='container flex flex-wrap  m-auto gap-4'>
            
                {users.map((User) => (
                    <Note key={User.key} user={User} />
                ))}
           
        </div>
    </div>
  )
}

export default ListNotes
