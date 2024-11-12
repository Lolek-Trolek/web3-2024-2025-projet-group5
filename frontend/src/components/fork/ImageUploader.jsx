import React, { useState } from 'react';
import { Button } from "../ui/button";

function ImageUploader() {
  const defaultImagePath = 'img/output-image.jpg';
  const [timestamp, setTimestamp] = useState(Date.now());

  const handleImageChange = async () => {
    const path = await window.electron
      .openDialog("image")
      .then((result) => (result.canceled ? null : result.filePaths[0]));

    if (path) {
      // Lancer le traitement de l'image sélectionnée
      await window.electron.processImage(path);
      console.log("Image traitée, rechargement...");
      
      // Mettre à jour le timestamp pour recharger l'image traitée
      setTimestamp(Date.now());
    }
  };

  return (
    <div>
      <Button onClick={handleImageChange}>Open file</Button>
      
      {/* Forcer le rechargement de l'image en ajoutant le timestamp */}
      <img src={`/${defaultImagePath}?timestamp=${timestamp}`} alt="Processed or Default" />
    </div>
  );
}

export default ImageUploader;
