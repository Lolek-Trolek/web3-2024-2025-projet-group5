import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


function SendMessage({ isMainWindow }) {
  const [message, setMessage] = useState("");
  const [inputMessage, setInputMessage] = useState(""); // État pour stocker le message saisi
  const [dialogues, setDialogues] = useState([]);

  useEffect(() => {
    if (isMainWindow) {
      window.electron.onMessageFromSecond((_, msg) =>{ 
        setMessage(msg);
        setDialogues((prev) => {
          const isDuplicate = prev.some(
            (dialogue) => dialogue.source === "Second Window" && dialogue.content === msg
          );
          return isDuplicate ? prev : [...prev, { source: "Second Window", content: msg }];
        });
      });
    } else {
      window.electron.onMessageFromMain((_, msg) => {
        setMessage(msg);
        setDialogues((prev) => {
          const isDuplicate = prev.some(
            (dialogue) => dialogue.source === "Second Window" && dialogue.content === msg
          );
          return isDuplicate ? prev : [...prev, { source: "Second Window", content: msg }];
        });
      });
    }
  }, [isMainWindow]);

  const sendMessage = () => {
    if (isMainWindow) {
      window.electron.sendMessageToSecondWindow(inputMessage || "Hello from Main Window");
      setDialogues((prev) => {
        const isDuplicate = prev.some(
          (dialogue) => dialogue.source === "Main Window" && dialogue.content === inputMessage
        );
        return isDuplicate ? prev : [...prev, { source: "Main Window", content: inputMessage }];
      });
    } else {
      window.electron.sendMessageToMainWindow(inputMessage || "Hello from Second Window");
      setDialogues((prev) => {
        const isDuplicate = prev.some(
          (dialogue) => dialogue.source === "Main Window" && dialogue.content === inputMessage
        );
        return isDuplicate ? prev : [...prev, { source: "Main Window", content: inputMessage }];
      });
    }
    setInputMessage(""); // Réinitialiser le champ de saisie après l'envoi
  };

  const downloadDialogues = async () => {
    //Notification dialogue n'est disponible
    if (dialogues.length === 0) {
      window.electron.showNotification({ title: "Notification", body: "Aucun dialogue à télécharger !" });
      return;
    }
    // Convertir les dialogues en texte
    const dialogueText = dialogues
      .map((d) => `${d.source}: ${d.content}`)
      .join("\n");

    // Envoyer la commande au processus principal pour sauvegarder et gestion du téléchargement
    try {
      const response = await window.electron.downloadTextFile(dialogueText, "dialogues.txt");
      if (response.success) {
        window.electron.showNotification({ title: "Notification", body: "Fichier téléchargé avec succès !" });
        return;
      } else {
        window.electron.showNotification({ title: "Notification", body: "Le téléchargement a été annulé ou a échoué." });
        return;
      }
    } catch (error) {
      console.error("Erreur lors du téléchargement :", error);
      window.electron.showNotification({ title: "Notification", body: "Une erreur est survenue lors du téléchargement." });
      return;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>IPC Communication Example</h1>
      <p>Message from other window: {message}</p>
      <Input
        type="text"
        placeholder="Enter message to send"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        className="w-full p-2 border rounded" // Appliquez un style si nécessaire
      />
      <Button onClick={sendMessage}>
        {isMainWindow ? "Send to Second Window" : "Send to Main Window"}
      </Button>
      <Button onClick={downloadDialogues}>
        Download Dialogues as Text
      </Button>
    </div>
  );
}

export default SendMessage;
