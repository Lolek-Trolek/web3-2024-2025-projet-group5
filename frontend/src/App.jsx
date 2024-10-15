// Importation des modules nécessaires
import React from "react"; // Importation de la bibliothèque React pour créer des composants
import { Container, Typography } from "@mui/material"; // Importation des composants de Material-UI pour styliser l'interface utilisateur

import AppRouter from "./components/Router/AppRouter";

function App() {
  return (
    <Container>

      {/* Utilisation de `Typography` pour afficher le titre principal de l'application */}
      <Typography variant="h2" align="center" gutterBottom sx={{ mt: 5 }}>
        Battle Royale de Memes !
      </Typography>
      
      <AppRouter />
    </Container>
  );
}

export default App;