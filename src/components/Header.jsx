
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
const Header = () => {

  const [menuDrop,setMenuDrop] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <div className=' top-0 z-10 sticky flex items-center justify-between py-3 px-10' >
        <a href="/"  className='flex gap-8 items-center'>
            <img src="./logo.png" alt="logo" className='w-12' />
        </a>
        <div className='flex justify-between items-center gap-2 px-4 py-2 rounded-xl'>
            <input className='w-40 bg-blue-300 rounded-full px-[20px] py-2  outline-none text-body-medium text-black' type="text" placeholder='Search your note' />
            <button disabled={search === ""} className=' bg-zinc-400 w-full rounded-full p-1'>
              <SearchIcon className="size-7 cursor-pointer text-gray-300 hover:text-pink-1" />
            </button> 
        </div>
        <div className='relative rounded-lg w-12 p-1 hover:bg-red-600 active:bg-red-700  focus:outline-none focus:ring focus:ring-red-300'><img src="./profile_icon.jpg" alt="account"  className=' rounded-lg' onClick={()=>setMenuDrop(!menuDrop)}/> </div>
        {menuDrop && (
          <div className='absolute top-20 p-3 flex flex-col gap-3 right-5 z-20 w-32 bg-white rounded-xl'>
              <a href="#">Thông tin tài khoản</a>
              <a href="#">Yêu thích</a>
              <a href="#">Đăng xuất</a>
          </div>
        )}
       
    </div>
  )
}
export default Header
