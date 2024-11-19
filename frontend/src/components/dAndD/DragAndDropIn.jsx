import React, { useState } from 'react';

function DragAndDropIn({ addFile }) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(event.dataTransfer.files);
        const fileData = droppedFiles.map((file) => ({
            file,
            preview: file.type.startsWith("image") ? URL.createObjectURL(file) : null,
        }));

        addFile(fileData);  // Utilise la fonction passée en prop pour ajouter le fichier
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                border: '2px dashed #999',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                backgroundColor: isDragging ? '#e0e0e0' : '#f9f9f9',
                color: '#666',
            }}
        >
            <p>Déposez vos fichiers ici</p>
        </div>
    );
}

export default DragAndDropIn;
