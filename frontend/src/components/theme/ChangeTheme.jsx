import { useState, useEffect } from "react";
import { Button } from "../ui/button";

function App() {
  const [currentTheme, setCurrentTheme] = useState("system");

  useEffect(() => {
    // Obtenir le thème actuel au démarrage
    window.electron.getCurrentTheme().then(setCurrentTheme);

    // Mettre à jour le thème si le système ou l'utilisateur change
    window.electron.onThemeUpdated((newTheme) => setCurrentTheme(newTheme));

    // Mettre à jour le body avec la classe de thème
    const updateBodyClass = (theme) => {
      if (theme === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    };

    updateBodyClass(currentTheme); // Mise à jour initiale du body

    // Nettoyage à la déconnexion du composant
    return () => {
      document.body.classList.remove("dark"); // Supprimer la classe pour éviter les effets indésirables
    };
  }, [currentTheme]); // Dépendance sur currentTheme pour mettre à jour le body à chaque changement

  const setTheme = (theme) => {
    setCurrentTheme(theme);
    window.electron.setThemeSource(theme); // Appel vers le processus principal pour modifier le thème
  };

  return (
    <div className="App">
      <h1>Electron Native Theme Example</h1>
      <p>Current Theme: {currentTheme}</p>
      <div>
        <Button onClick={() => setTheme("light")}>Light Mode</Button>
        <Button onClick={() => setTheme("dark")}>Dark Mode</Button>
        <Button onClick={() => setTheme("system")}>Follow System</Button>
      </div>
    </div>
  );
}

export default App;
