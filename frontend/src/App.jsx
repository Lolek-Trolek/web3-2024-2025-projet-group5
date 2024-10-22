import { useState } from "react";
import Dialog from "./components/Dialog";
import { Button } from "./components/ui/button";
import ItemFolder from "./components/ItemFolder";

function App() {
  const [filePath, setFilePath] = useState("");

  const handleClick = () => {
    window.electron.showNotification({ title: "Notification", body: "Hey" });
  };

  return (
    <div>
      <Button onClick={handleClick}>Show Notification</Button>
      <div>
        {filePath}
        <Dialog callback={setFilePath} />
        <ItemFolder fullPath={filePath} />
      </div>
    </div>
  );
}

export default App;
