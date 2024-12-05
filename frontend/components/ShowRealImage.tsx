import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ShowRealImageProps = {
  selectedImage: string;
  onClose: () => void;  // Ajout de la fonction de fermeture
};

const ShowRealImage: React.FC<ShowRealImageProps> = ({ selectedImage, onClose }) => {
  return (
    <AlertDialog open={!!selectedImage} onOpenChange={onClose}>
      <AlertDialogContent className="w-fit px-10">
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="flex items-center justify-center">
          <img
            src={selectedImage}
            alt="Image en taille réelle"
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-destructive font-bold hover:text-background hover:bg-destructive" onClick={onClose}>Fermer</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShowRealImage;
