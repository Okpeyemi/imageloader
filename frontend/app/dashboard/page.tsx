"use client";

import NavBar from "@/components/NavBar";
import { getImages, getUserAuthorization } from "@/services/api";
import React, { useEffect, useState } from "react";
import AdminLayout from "../adminlayout";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import ShowRealImage from "@/components/ShowRealImage";

const page = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image); // Ouvre le modal avec l'image sélectionnée
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await getUserAuthorization(token);
        const { id, email, role } = response.user;
      }
    };

    const fetchImages = async () => {
      const response = await getImages();
      console.log("Réponse des images :", response);
      const imageUrls = response.map((img: { url: string }) => img.url);
      setImages(imageUrls);
    };

    fetchUser();
    fetchImages();
  }, []);
  return (
    <AdminLayout>
      <div className="flex w-full h-screen">
        <NavBar />
        <div className="w-full flex flex-col">
          <Header />
          <div className="m-5">
            <div className="flex justify-between">
              <h3 className="font-medium text-[30px] text-primary">Dashboard</h3>
              <ImageUploader />
            </div>
            <div>
              <h3 className="text-lg font-bold my-5">Images :</h3>
              <div className="flex flex-wrap gap-5 justify-start">
                {images.length > 0 ? (
                  images.map((image, index) => (
                    <div
                      key={index}
                      className={`w-${
                        index % 3 === 0 ? "30" : "20"
                      }% h-[200px] border-2 border-primary cursor-pointer rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl`}
                      onClick={() => handleImageClick(image)}
                    >
                      <img
                        src={image}
                        alt={`Uploaded ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <p>Aucune image disponible.</p>
                )}
              </div>
              {selectedImage && (
                <ShowRealImage selectedImage={selectedImage} onClose={handleCloseModal} />
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default page;
