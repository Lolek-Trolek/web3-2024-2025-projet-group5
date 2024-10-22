import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main'; // Composant pour la page principale
import DragAndDrop from './Components/DragAndDrop'; // Composant pour la popup drag-and-drop

function App() {
    const openPopup = () => {
        window.electronAPI.openPopup(); // Ouvrir la popup via IPC
    };

    return (
        <Router>
            <div>
                <h1>Fenêtre principale</h1>
                <button onClick={openPopup}>Ouvrir Popup</button>
            </div>
        </Router>
    );
}

export default App;
