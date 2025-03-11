import axios from "axios";
import { useState } from "react";

export const useUploadImage = () => {
  const [error, setError] = useState<any>();

  const uploadImage = (file: File, url: string) => {
    return new Promise<string>((resolve, reject) => {
      const formData = new FormData();

      if (file) {
        formData.append("file", file);
        axios
          .post(url, formData, {
            headers: {
              "Content-Type": "image/jpeg",
            },
            withCredentials: true,
          })
          .then((res) => {
            const url = res.data.url;
            resolve(url);
          })
          .catch((err) => {
            setError("Upload Image Failed");
            reject(err);
          });
      } else {
        setError("Image profile is missing");
      }
    });
  };

  return { uploadImage };
};
