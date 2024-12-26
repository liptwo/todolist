import React, { useState } from "react";

import Note from "./Note";

const users = [
  {
    id: 1,
    title: "",
    date: "22/12/2024",
    content: "Xin chao moi nguoi nhe toi ten la liptwo",
    author: "Văn Huỳnh",
  },
  {
    id: 2,
    title: "Con duong cahng may ai di",
    date: "22/12/2024",
    content: "Có gì mọi người nhỉ",
    author: "Văn Huỳnh",
  },
  {
    id: 3,
    title: "Charlie yeu dau",
    date: "22/12/2024",
    content: "Có gì mọi người nhỉ",
    author: "Văn Huỳnh",
  },
  {
    id: 4,
    title: "Charlie yeu dau",
    date: "22/12/2024",
    content: "Có gì mọi người nhỉ",
    author: "Văn Huỳnh",
  },
  { 
    id: 5,
    title: "Charlie yeu dau",
    date: "22/12/2024",
    content: "Có gì mọi người nhỉ",
    author: "Văn Huỳnh",
  },
  {
    id: 6,
    title: "Charlie yeu dau",
    date: "22/12/2024",
    content: "Có gì mọi người nhỉ",
    author: "Văn Huỳnh",
  },
  {
    id: 7,
    title: "Charlie yeu dau",
    date: "22/12/2024",
    content: "Có gì mọi người nhỉ",
    author: "Văn Huỳnh",
  },
];

const ListNotes = () => {
  return (
    <div className="mx-auto container py-20 px-6">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((User) => (
          <div key={User.id} className="rounded flex flex-row">
            <Note user={User} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListNotes;
