import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for notifications
import UpLoadImg from "../../services/CloudImage";


const EditProfile = () => {
  const { user, updateProfileInfo, changePassword } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      // Tạo preview tạm thời
      const previewURL = URL.createObjectURL(file);
      setPhotoURL(previewURL);

      try {
        setLoading(true);
        // Upload ảnh và lấy URL
        const uploadedURL = await UpLoadImg(file);
        setPhotoURL(uploadedURL);
        URL.revokeObjectURL(previewURL);
      } catch (error) {
        console.error("Lỗi upload ảnh:", error);
        toast.error("Lỗi khi tải ảnh lên!");
        URL.revokeObjectURL(previewURL);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProfileInfo(username, photoURL);
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      toast.error("Cập nhật thông tin thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await changePassword(newPassword);
      toast.success("Đổi mật khẩu thành công!"); // Success toast
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại!"); // Error toast
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-500 hover:underline"
      >
        Trở về trang chủ
      </button>
      <h2 className="text-xl font-semibold mb-4">
        Chỉnh sửa thông tin cá nhân
      </h2>
      <form onSubmit={handleUpdateProfile} className="mb-4">
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            Tên người dùng
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tên người dùng"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-violet-300"
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor="file" 
            className="cursor-pointer block"
          >
            <img 
              src={photoURL || user?.photoURL || "../../asset/image.png"} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
            />
            <span className="block text-center text-sm text-blue-500">
              {loading ? "Đang tải..." : "Upload an Image"}
            </span>
          </label>

          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept="image/*"
            disabled={loading}
            style={{ display: "none" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Đợi..." : "Cập nhật thông tin"}
        </button>
      </form>
      <form onSubmit={handleChangePassword}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="newPassword"
          >
            Mật khẩu mới
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Mật khẩu mới"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-violet-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
        >
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
