// Importation de la fonction defineConfig depuis le paquet Vite
import { defineConfig } from 'vite';
// Importation du plugin React pour Vite
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/ 
// Lien vers la documentation de configuration de Vite
export default defineConfig({
  // Déclaration des plugins utilisés dans la configuration de Vite
  plugins: [react()], // Utilise le plugin React pour permettre le support de JSX et d'autres fonctionnalités React

  // Configuration du serveur de développement
  server: {
    // Proxy pour rediriger les requêtes à '/graphql' vers le serveur backend
    proxy: {
      '/graphql': 'http://localhost:4000', // Toutes les requêtes envoyées à '/graphql' seront redirigées vers 'http://localhost:4000'
      // Ceci est utile pour éviter les problèmes de CORS (Cross-Origin Resource Sharing) lorsque le frontend et le backend sont sur des ports différents.
    },
  },
});
