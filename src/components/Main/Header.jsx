import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from '../../context/SearchContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import EditProfile from './EditProfile';

const Header = () => {
  const [menuDrop, setMenuDrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const { searchTerm, setSearchTerm } = useSearch();
  const { logout, user } = useAuth();
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleSignOut = async () => {
    if (loading) return;

    try {
      setLoading(true);
      console.log("Starting logout...");
      await logout();
      console.log("Logout successful");
      navigate('/login', { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      alert("Lỗi khi đăng xuất: " + error.message);
    } finally {
      setLoading(false);
      setMenuDrop(false);
    }
  };

  const closeModal = () => setMenuDrop(false);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       closeModal();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [closeModal]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="top-0 z-10 sticky flex items-center justify-between py-3 px-10 bg-white">
      <a href="/" className="flex gap-8 items-center">
        <img src="./logo.png" alt="logo" className="w-12" />
      </a>
      <div className="flex justify-between items-center gap-2 px-4 py-2 rounded-xl">
        <input
          className="w-40 bg-white rounded-full shadow-xl px-[20px] py-2 outline-1 outline-slate-950 text-body-medium text-black focus:outline-none focus:w-[250px] focus:ring focus:ring-violet-300 hover:w-[250px] duration-500"
          type="text"
          placeholder="Search your note"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          disabled={searchTerm === ""}
          className="bg-zinc-400 max-w-20 rounded-full p-1"
        >
          <SearchIcon className="size-7 cursor-pointer text-gray-300 hover:text-pink-1" />
        </button>
      </div>
      <div
        ref={modalRef}
        className="relative rounded-lg w-12 p-1 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
      >
        <img
          src={user?.photoURL || "./profile_icon.jpg"}
          alt="account"
          className="rounded-full object-cover h-10 w-10 "
          onClick={() => setMenuDrop(!menuDrop)}
        />
      </div>
      {menuDrop && (
        <div className="absolute top-20 p-3 flex flex-col gap-3 right-5 z-20 w-48 bg-white rounded-xl shadow-lg">
          <div className="text-sm text-gray-600 border-b pb-2">
            {`${user?.email || 'User'} 
            (${user?.displayName})`}
          </div>
          <button className="text-left" onClick={() => navigate('/edit-profile')}>Chỉnh sửa thông tin</button>
          <button className="text-left"   onClick={() => navigate('/favourite')}>Yêu thích</button>
          <span className="w-full h-[1px] border-b"></span>
          <button
            onClick={handleSignOut}
            disabled={loading}
            className=" px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Đang đăng xuất...
              </span>
            ) : (
              'Đăng xuất'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
