// Importation des modules React et GraphQL nécessaires
import React, { useState } from 'react'; // `useState` est utilisé pour gérer l'état des champs du formulaire
import { useMutation, gql } from '@apollo/client'; // `useMutation` est un hook Apollo pour effectuer des mutations
import { TextField, Button, Box, Typography } from '@mui/material'; // Importation des composants UI de Material-UI pour une meilleure présentation

// Définition de la mutation GraphQL `ADD_MEME`
const ADD_MEME = gql`
  mutation AddMeme($title: String!, $imageUrl: String!, $createdBy: String!, $ranking: Int!) {
    addMeme(title: $title, imageUrl: $imageUrl, createdBy: $createdBy, ranking: $ranking) {
      id
      title
      imageUrl
      ranking
      votes
      createdBy
      createdAt
    }
  }
`;

// Définition de la requête GraphQL `GET_MEMES` pour rafraîchir la liste des memes après ajout
const GET_MEMES = gql`
  query GetMemes {
    memes {
      id
      title
      imageUrl
      ranking
      votes
      createdBy
      createdAt
    }
  }
`;

function AddMeme() {
  // Déclaration des états des champs du formulaire
  const [title, setTitle] = useState(''); // État pour le titre du meme
  const [imageUrl, setImageUrl] = useState(''); // État pour l'URL de l'image
  const [createdBy, setCreatedBy] = useState(''); // État pour l'auteur du meme
  const [ranking, setRanking] = useState(0); // État pour le classement initial

  // Utilisation du hook `useMutation` pour envoyer la mutation `ADD_MEME`
  // Le `refetchQueries` est utilisé pour rafraîchir la liste des memes une fois le nouveau meme ajouté
  const [addMeme] = useMutation(ADD_MEME, {
    refetchQueries: [{ query: GET_MEMES }], // Requête pour rafraîchir les memes après la mutation
  });

  // Fonction de gestion du formulaire
  // Empêche le rafraîchissement de la page par défaut et envoie les données au serveur
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire
    // Vérifie que tous les champs sont remplis
    if (title && imageUrl && createdBy && ranking !== null) {
      // Envoie la mutation avec les variables extraites des états
      addMeme({ variables: { title, imageUrl, createdBy, ranking: parseInt(ranking) } });
      // Réinitialise les champs du formulaire après l'ajout
      setTitle('');
      setImageUrl('');
      setCreatedBy('');
      setRanking(0);
    }
  };

  return (
    // Boîte qui encapsule le formulaire et son style
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 5 }}>
      <Typography variant="h4" gutterBottom>
        Ajouter un Meme
      </Typography>
      <TextField
        label="Titre"
        variant="outlined"
        fullWidth
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        label="URL de l'image"
        variant="outlined"
        fullWidth
        required
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Créé par"
        variant="outlined"
        fullWidth
        required
        value={createdBy}
        onChange={(e) => setCreatedBy(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Classement"
        variant="outlined"
        fullWidth
        required
        type="number"
        value={ranking}
        onChange={(e) => setRanking(e.target.value)}
        margin="normal"
        slotProps={{
          htmlInput: {
            min: 1,
            max: 100, // Définit une limite de classement entre 1 et 100
          },
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Ajouter Meme
      </Button>
    </Box>
  );
}

export default AddMeme;
