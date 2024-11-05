import React, { useState } from 'react';
import { Button } from "../ui/button";

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState('');

  const handleImageChange = async (event) => {
    console.log("handler");
    const Path = await window.electron
    .openDialog("image")
    .then((result) => (result.canceled ? "/" : result.filePaths[0]));
    console.log("chemin",Path)
    setSelectedImage(Path);
    // Attendre le chemin de l'image traitée
    const processedImagePath = await window.electron.processImage(Path);
    console.log("Image traitée :", processedImagePath);
    
    // Mettre à jour l'état avec le chemin de l'image traitée
    if (processedImagePath) {
        setProcessedImage(processedImagePath);
    }
  };

  // Écoute des messages du processus principal
  window.electron.onImageProcessed((imagePath) => {
    console.log("image procede",imagePath);
    setProcessedImage(imagePath);
  });

  return (
    <div>
      <Button onClick={handleImageChange}>Open file</Button>
      {processedImage && <img src={processedImage} alt="Processed" />}
    </div>
  );
}

export default ImageUploader;
