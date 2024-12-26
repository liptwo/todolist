import React, { useState, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
// import NoteR from "../models/Note";

const CreateNote = () => {
  const field = document.getElementById("onofffield");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [on, setOn] = useState(false);

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
      console.log("Add", content)
    } catch (error) {
      console.error(error);
    }
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
