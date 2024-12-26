import React, { useState, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { getDatabase, push, ref, set } from "firebase/database";
import database from "../firebase"
import { v4 as uuidv4 } from 'uuid';
// import NoteR from "../models/Note";

const CreateNote = () => {
  const field = document.getElementById("onofffield");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [on, setOn] = useState(false);
  const author = "Văn Huỳnh";
  const writeUserData = async(note)=> {
    try{
      const noteref = ref(database, 'ListNote')
      const newNoteRef = push(noteref);
      await set(newNoteRef, note);
    }
    catch(error){
      console.log(error);
    }

  }

  const handleClickOutside = (event) => {
    if (field && !field.contains(event.target)) {
      setOn(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [field]);

  const handleSubmit = async () => {
    if (!content) {
      return;
    }
    try {
      const note = {
        title: title,
        content: content,
        author: author,
        date: handleTime(Date.now()),
      }
      await writeUserData(note);
      setTitle("");
      setContent("");
      setOn(false);
      console.log("Add", note)
    } catch (error) {
      console.error(error);
    }
  }

  const handleTime = (timestamp) => {
    const date = new Date(timestamp);
// Định dạng ngày/tháng/năm theo ngôn ngữ "vi-VN" (tiếng Việt)
    const formattedDate = new Intl.DateTimeFormat("vi-VN").format(date);
    return formattedDate;
  }
  
  return (
    <div className="flex flex-col pt-3 justify-center items-center rounded duration-500">
      <div
        id="onofffield"
        className="hover:dark:border-gray-500 border p-5 flex flex-col items-center justify-center rounded-lg dark:border-gray-300 space-y-2 shadow-2xl duration-100"
        onClick={() => setOn(true)}
      >
        <input
          className="border-2 p-3 w-[300px] outline-slate-600 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề"
        />
        {on && (
          <>
            <InputTextarea
              autoResize
              autoFocus
              rows={5}
              cols={30}
              className="border-2 p-3 w-[300px] h-[100px] outline-slate-600 scrollbar-hide resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nội dung"
            />
            <button className=" border-2 p-2 rounded-lg" onClick={handleSubmit}> Add</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateNote;
