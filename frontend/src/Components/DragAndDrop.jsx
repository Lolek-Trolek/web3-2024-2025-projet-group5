import React, { useState, useEffect } from 'react';

function DragAndDrop() {
    const [popupContent, setPopupContent] = useState(null);

    useEffect(() => {
        // Écouter les données transmises par Electron via IPC
        window.electronAPI.onInitData((event, data) => {
            setPopupContent(data.message);  // Récupérer les données
        });
    }, []); // Assurez-vous d'avoir le tableau de dépendances pour éviter des appels répétés

    const sendDataToMain = (data) => {
        window.electronAPI.sendPopupData(data);  // Envoyer des données au processus principal
    };

    return (
        <div>
            <h1>Popup Drag and Drop</h1>
            <p>{popupContent}</p>
            <button onClick={() => sendDataToMain("Image stylée et tout mamaw")}>Envoyer l'image</button>
            {/* Autres logiques du drag and drop ici */}
        </div>
    );
}

export default DragAndDrop;
