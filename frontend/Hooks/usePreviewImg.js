import React, { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
  const showToast = useShowToast()
  const [imgUrl, setImgUrl] = useState(null);
  const handleImageChange=(e)=>{
    const file = e.target.files[0]
    if(file && file.type.startsWith("image/")){
        const reader = new FileReader()

        reader.onloadend = ()=>{
            setImgUrl(reader.result)
        }

        reader.readAsDataURL(file)
    }else{
        showToast("Invalid file type","Plese select an image file", "error")
        setImgUrl(null)
    }
  }
  
  return {handleImageChange, imgUrl};
};

export default usePreviewImg;
