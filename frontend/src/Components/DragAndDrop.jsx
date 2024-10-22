import React, { useState, useEffect } from 'react';

function DragAndDrop() {
    const [popupContent, setPopupContent] = useState(null);

    useEffect(() => {
        const handleInitData = (event, data) => {
            setPopupContent(data.message);
        };

        window.electronAPI.onInitData(handleInitData);

        // Nettoyer l'écouteur au démontage
        return () => {
            window.electronAPI.onInitData((event, _) => {}); // Pour éviter les réinitialisations multiples
        };
    }, []);

    const sendDataToMain = (data) => {
        window.electronAPI.sendPopupData(data);
    };

    return (
        <div>
            <h1>Popup Drag and Drop</h1>
            <p>{popupContent}</p>
            <button onClick={() => sendDataToMain("Image stylée et tout mamaw")}>
                Envoyer l'image
            </button>
            {/* Autres logiques de drag-and-drop */}
        </div>
    );
}

export default DragAndDrop;
