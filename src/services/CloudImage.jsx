import axios from "axios";

const UpLoadImg = async (file) => {
  if (!file) {
    throw new Error("Vui lòng chọn ảnh!");
  }

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hehepro");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/ddkkkq2pm/image/upload",
      formData
    );
    
    // Trả về URL của ảnh đã upload
    return res.data.secure_url;
  } catch (error) {
    console.error("Lỗi upload ảnh:", error);
    throw error;
  }
};

export default UpLoadImg;