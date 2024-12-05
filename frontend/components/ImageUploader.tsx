import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";
import "@aws-amplify/ui-react/styles.css";
import axios from "axios";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Stocke le fichier sélectionné
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Vérifie s'il y a un fichier sélectionné
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Veuillez sélectionner un fichier avant de continuer.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("http://localhost:4000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setUploadStatus("Image téléchargée avec succès !");
        console.log("Fichier uploadé :", response.data);
        window.location.href = "/dashboard";
      } else {
        setUploadStatus("Erreur lors du téléchargement de l'image.");
      }
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
      setUploadStatus("Erreur serveur pendant l'upload.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex bg-primary text-background p-2 rounded-lg font-bold hover:bg-secondary-foreground">
          <Plus className="mr-3" /> Ajouter une ou des image(s)
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[30px] text-primary">
            Ajout d'images
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="text-[20px] mb-5">
              Veuillez s'il vous plaît sélectionner les images que vous voulez
              ajouter.
            </span>
            <span className="w-full h-[200px] rounded-lg flex items-center justify-center border-primary border-2 my-5 border-dashed">
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </span>
            {uploadStatus && <span className="mt-3 text-primary">{uploadStatus}</span>}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-destructive hover:text-background font-bold text-destructive">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="hover:bg-secondary-foreground font-bold" onClick={handleUpload}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ImageUploader;
