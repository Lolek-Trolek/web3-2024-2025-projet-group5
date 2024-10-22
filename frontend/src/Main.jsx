import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import DragAndDrop from './Components/DragAndDrop';

function Main() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/drag-and-drop" element={<DragAndDrop />} />
            </Routes>
        </HashRouter>
    );
}

export default Main;
