"use client";

import NavBar from "@/components/NavBar";
import { getImages, getUserAuthorization } from "@/services/api";
import React, { useEffect, useState } from "react";
import AdminLayout from "../adminlayout";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import ShowRealImage from "@/components/ShowRealImage";
import axios from "axios";
import Spinner from "@/components/Spinner";

const Page = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [role, setRole] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleFilter = async () => {
    try {
      const params: { type?: string; date?: string } = {};
      if (type) params.type = type;
      if (date) params.date = date;

      const response = await axios.get("http://localhost:4000/api/uploads/filter", {
        params,
      });
      const imageUrls = response.data.map((img: { url: string }) => img.url);
      setImages(imageUrls);
    } catch (error) {
      console.error("Erreur lors du filtrage des images :", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {

      if (token) {
        const response = await getUserAuthorization(token);
        const { id, email, role } = response.user;
        setRole(response.user.role);
        setName(response.user.name)
      }
    };

    const fetchImages = async () => {
      const response = await getImages();
      const imageUrls = response.map((img: { url: string }) => img.url);
      setImages(imageUrls);
    };

    fetchUser();
    fetchImages();
  }, []);

  return (
    <AdminLayout>
      { token ? "" : (<Spinner />)}
      <div className="flex w-full h-screen">
        <NavBar role={role} />
        <div className="w-full flex flex-col">
          <Header name={name} role={role} />
          <div className="m-5">
            <div className="flex justify-between">
              <h3 className="font-medium text-[30px] text-primary">Dashboard</h3>
              <ImageUploader />
            </div>
            <div className="my-4 flex items-center gap-4">
              <h4 className="text-primary font-bold text-lg max-md:hidden">Trier par :</h4>
             
              <div className="flex justify-between">
              <div className="flex items-center mr-10">
                <label className="text-primary font-bold mr-5 max-md:hidden">Type :</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="border border-primary rounded-lg p-[6px]"
                >
                  <option value="">Tous</option>
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                </select>
              </div>

              <div className="flex items-center mr-10">
                <label className="text-primary font-bold mr-5 max-md:hidden">Date :</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-primary rounded-lg p-[6px]"
                />
              </div>

              <button
                onClick={handleFilter}
                className="bg-primary text-background px-4 py-2 rounded-lg font-bold hover:bg-secondary-foreground"
              >
                Appliquer
              </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold my-5 text-primary">Liste des images</h3>
              <div className="max-lg:h-[66vh] h-[65vh] overflow-y-auto px-5 py-2">
                <div className="flex flex-wrap gap-5 justify-start ">
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

export default Page;
