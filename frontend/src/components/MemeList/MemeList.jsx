// Importation des modules nécessaires
import React from "react"; // Import de React
import { useQuery, useMutation, gql } from "@apollo/client"; // Importation des hooks et des outils nécessaires pour travailler avec Apollo Client
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid2,
} from "@mui/material"; // Importation des composants de Material-UI pour créer une interface utilisateur stylisée

// Déclaration de la requête GraphQL pour récupérer la liste des memes
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

// Déclaration de la mutation GraphQL pour voter pour un meme
const VOTE_MEME = gql`
  mutation VoteMeme($id: ID!) {
    voteMeme(id: $id) {
      id
      votes
    }
  }
`;

function MemeList() {
  // Utilisation du hook `useQuery` pour exécuter la requête GraphQL `GET_MEMES`
  // `useQuery` retourne un objet contenant :
  // - `loading` : un indicateur si la requête est encore en cours
  // - `error` : une erreur, s'il y en a eu une durant l'exécution de la requête
  // - `data` : les données récupérées si la requête a été un succès
  // - `refetch` : une fonction permettant de relancer la requête (utile après des mutations)
  const { loading, error, data, refetch } = useQuery(GET_MEMES);

  // Log des données récupérées pour aider à vérifier ce que la requête retourne et diagnostiquer d'éventuels problèmes
  console.log("Data:", data);

  // Utilisation du hook `useMutation` pour voter pour un meme
  // `useMutation` retourne une fonction qu'on peut appeler pour exécuter la mutation (ici `voteMeme`)
  // Le callback `onCompleted` est exécuté après que la mutation a réussi. Ici, il appelle `refetch` pour actualiser la liste des memes après le vote
  const [voteMeme] = useMutation(VOTE_MEME, {
    onCompleted: () => refetch(), // Met à jour la liste des memes après avoir voté
  });

  // Gestion des états de chargement et d'erreur :
  // Si `loading` est vrai, on retourne un message "Chargement..." pour indiquer que les données sont en train de se charger
  if (loading) return <p>Chargement...</p>;
  // Si une erreur survient pendant la requête, on retourne un message "Erreur :("
  if (error) return <p>Erreur :(</p>;

  // Si tout va bien, on retourne le rendu de la liste des memes
  return (
    // Utilisation de `Grid2` pour organiser la liste des memes en grille
    // `container` indique que ce `Grid2` est le conteneur de la grille
    // `spacing={2}` définit l'espacement entre chaque élément de la grille
    <Grid2 container spacing={2}>
      {/* On parcourt chaque meme obtenu de la requête GET_MEMES avec `.map()` */}
      {data.memes.map((meme) => (
        <Grid2 item xs={12} sm={6} md={4} key={meme.id}>
          {/* Chaque meme est affiché dans une `Card` de Material-UI */}
          <Card>
            {/* Affichage de l'image du meme avec `CardMedia` */}
            <CardMedia
              component="img" // Indique que le média est une image
              height="200" // Définition de la hauteur de l'image
              image={meme.imageUrl} // URL de l'image du meme
              alt={meme.title} // Texte alternatif au cas où l'image ne charge pas, utile pour l'accessibilité
            />
            {/* Contenu textuel du meme */}
            <CardContent>
              {/* Affichage du titre du meme */}
              <Typography variant="h5">{meme.title}</Typography>
              {/* Affichage du nom de l'auteur du meme */}
              <Typography variant="body2" color="textSecondary">
                Créé par: {meme.createdBy}
              </Typography>
              {/* Affichage du nombre de votes que le meme a reçus */}
              <Typography variant="body1">Votes: {meme.votes}</Typography>
              {/* Affichage du classement du meme */}
              <Typography variant="body2">Classement: {meme.ranking}</Typography>
              {/* Bouton pour voter pour le meme */}
              <Button
                variant="contained" // Bouton avec un style "contained" pour être plus visible
                color="primary" // Couleur primaire de Material-UI
                onClick={() => voteMeme({ variables: { id: meme.id } })} // Lorsque le bouton est cliqué, `voteMeme` est exécuté avec l'ID du meme
              >
                Voter
              </Button>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}

export default MemeList;
