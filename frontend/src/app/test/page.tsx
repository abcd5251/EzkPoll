"use client"
import React, { useState } from 'react';
import { insertRow, upload } from "@/utils/firebaseHelper";

const YourComponent = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("bbb"); 
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleImage1Change = (event: any) => {
    setImage1(event.target.files[0]);
  };

  const handleImage2Change = (event: any) => {
    setImage2(event.target.files[0]);
  };

  const ImageSaveClick = async () => {
    setLoading(true);
    console.log(address);
    try {
      if (!address) {
        throw new Error('No user or provider')
      }
      if (!image1 || !image2) {
        throw new Error('Please select both images')
      }

      const key = `${address}-${+new Date()}`;
      const url_1 = await upload(`${key}-image1`, image1);
      const url_2 = await upload(`${key}-image2`, image2);

      console.log(url_1);
      console.log(url_2);

      console.log('Images uploaded successfully.');
    } catch (err: any) {
      console.error(err.message);
    }
    setLoading(false);
  };

  const SaveVideoClick = async () => {
    setLoading(true);
    console.log(address)
    try {
      if (!address) {
        throw new Error('No user or provider')
      }
      if (!file) {
        throw new Error('No Video selected')
      }

      const key = `${address}-${+new Date()}`;
      const url = await upload(`${key}`, file);

      await insertRow('videos', [key], {
        id: key,
        address: address || '',
        sourceUrl: url,
        description: `${address}-Avatar_video`,
      });

      console.log('File uploaded successfully.');

    } catch (err: any) {
      console.error(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
  <div className="mb-4">
    <label htmlFor="videoInput" className="block text-white-700 font-bold mb-2">Upload Video</label>
    <input type="file" id="videoInput" onChange={handleFileChange} className="mb-2" />
    <button onClick={SaveVideoClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</button>
  </div>
  <div className="mb-4">
  <label htmlFor="videoInput" className="block text-white-700 font-bold mb-2">Upload Image</label>
    <input type="file" onChange={handleImage1Change} className="mb-2" />
    <input type="file" onChange={handleImage2Change} className="mb-2" />
    <button onClick={ImageSaveClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload Images</button>
  </div>
  {loading && <div>Loading...</div>}
  </div>
  );
};

export default YourComponent;
