import React, { useState, useEffect } from 'react';

function App() {
  const [popupData, setPopupData] = useState(null);

  const openPopup = (componentName, infos) => {
    const data = {
      message: infos,
      component: componentName,  // Nom du composant en tant que chaîne
    };
    window.electronAPI.openPopup(data);  // Ouvrir la popup avec des informations de composant
  };

  useEffect(() => {
    window.electronAPI.onPopupResponse((event, data) => {
      console.log("Données reçues de la popup :", data);
      setPopupData(data);  // Gérer les données reçues depuis la popup
    });
  }, []);  // Ajouter un tableau de dépendances pour éviter les répétitions

  return (
      <div>
        <h1>Fenêtre principale</h1>
        <button onClick={() => openPopup("DragAndDrop", "Voici un message pour la popup")}>Ouvrir Popup</button>

        {popupData && <div>Données de la popup : {popupData}</div>}
      </div>
  );
}

export default App;
