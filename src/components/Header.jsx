import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { ref, get } from "firebase/database";
import database from "../firebase";

const Header = () => {
  const [menuDrop, setMenuDrop] = useState(false);
  const [search, setSearch] = useState("");

  const modalRef = useRef(null);

  const closeModal = () => setMenuDrop(false);
  useEffect(()=>{
  const notesRef = ref(database, "ListNote");
  get(notesRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const notes = snapshot.val();
      const searchResults = [];

      // Lặp qua từng note và kiểm tra keyword trong tất cả các trường
      Object.entries(notes).forEach(([key, note]) => {
        const matches = Object.values(note).some((fieldValue) =>
          String(fieldValue).toLowerCase().includes(search.toLowerCase())
        );

        if (matches) {
          searchResults.push({ id: key, ...note });
        }
      });

      console.log("Kết quả tìm kiếm:", searchResults);
    } else {
      console.log("Không có dữ liệu!");
    }
  })
  .catch((error) => {
    console.error("Lỗi khi tìm kiếm:", error);
  });
  },[search]);

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
    <div className=" top-0 z-10 sticky flex items-center justify-between py-3 px-10">
      <a href="/" className="flex gap-8 items-center">
        <img src="./logo.png" alt="logo" className="w-12" />
      </a>
      <div className="flex justify-between items-center gap-2 px-4 py-2 rounded-xl">
        <input
          className="w-40 bg-white rounded-full px-[20px] py-2  outline-1 outline-slate-950 text-body-medium text-black focus:outline-none focus:w-[180px] focus:ring focus:ring-violet-300 hover:w-[180px] duration-500"
          type="text"
          placeholder="Search your note"
        />
        <button
          disabled={search === ""}
          className=" bg-zinc-400 w-full rounded-full p-1"
        >
          <SearchIcon className="size-7 cursor-pointer text-gray-300 hover:text-pink-1" />
        </button>
      </div>
      <div
        ref={modalRef}
        className="relative rounded-lg w-12 p-1 hover:bg-red-600 active:bg-red-700  focus:outline-none focus:ring focus:ring-red-300"
      >
        <img
          src="./profile_icon.jpg"
          alt="account"
          className=" rounded-lg"
          onClick={() => setMenuDrop(!menuDrop)}
        />{" "}
      </div>
      {menuDrop && (
        <div className="absolute top-20 p-3 flex flex-col gap-3 right-5 z-20 w-32 bg-white rounded-xl">
          <a href="#">Thông tin tài khoản</a>
          <a href="#">Yêu thích</a>
          <a href="#">Đăng xuất</a>
        </div>
      )}
    </div>
  );
};
export default Header;
