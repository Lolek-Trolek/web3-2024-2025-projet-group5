import React, { useState, useEffect } from 'react';
import DragAndDrop from '../Components/DragAndDrop';  // Importer vos composants dynamiques ici

const componentsMap = {
    DragAndDrop: DragAndDrop,
    // Vous pouvez ajouter d'autres composants ici
};

function Popup() {
    const [componentName, setComponentName] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        // Écouter les données envoyées par Electron
        window.electronAPI.onInitData((event, data) => {
            setComponentName(data.component);  // Récupérer le nom du composant
            setData(data.message);  // Récupérer d'autres données
        });
    }, []);  // Tableau de dépendances vide pour s'assurer que l'effet se déclenche une seule fois

    // Sélectionner le bon composant en fonction de `componentName`
    const SelectedComponent = componentsMap[componentName];

    return (
        <div>
            {SelectedComponent ? (
                <SelectedComponent data={data} />  // Passer les données au composant sélectionné
            ) : (
                <div>Chargement...</div>
            )}
        </div>
    );
}



export default Popup;
