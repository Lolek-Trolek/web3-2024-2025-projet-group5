// Importation des modules nécessaires
import React from "react"; // Importation de la bibliothèque React pour créer des composants
import { Container, Typography } from "@mui/material"; // Importation des composants de Material-UI pour styliser l'interface utilisateur
import MemeList from "./components/MemeList/MemeList"; // Importation du composant `MemeList` pour l'affichage des memes
import AddMeme from "./components/AddMeme/AddMeme"; // Importation du composant `AddMeme` pour l'ajout de nouveaux memes

function App() {
  return (
    <Container>
      {/* Utilisation de `Typography` pour afficher le titre principal de l'application */}
      <Typography variant="h2" align="center" gutterBottom sx={{ mt: 5 }}>
        Battle Royale de Memes !
      </Typography>

      {/* Composant `AddMeme` pour ajouter un nouveau meme */}
      <AddMeme />

      {/* Composant `MemeList` pour afficher la liste des memes */}
      <MemeList />
    </Container>
  );
}

export default App;
