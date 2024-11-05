import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function SendMessage({ isMainWindow }) {
  const [message, setMessage] = useState("");
  const [inputMessage, setInputMessage] = useState(""); // État pour stocker le message saisi

  useEffect(() => {
    if (isMainWindow) {
      window.electron.onMessageFromSecond((_, msg) => setMessage(msg));
    } else {
      window.electron.onMessageFromMain((_, msg) => setMessage(msg));
    }
  }, [isMainWindow]);

  const sendMessage = () => {
    if (isMainWindow) {
      window.electron.sendMessageToSecondWindow(inputMessage || "Hello from Main Window");
    } else {
      window.electron.sendMessageToMainWindow(inputMessage || "Hello from Second Window");
    }
    setInputMessage(""); // Réinitialiser le champ de saisie après l'envoi
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
    </div>
  );
}

export default SendMessage;
