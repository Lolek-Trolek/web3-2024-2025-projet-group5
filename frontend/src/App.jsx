import { useState } from "react";
import Dialog from "./components/Dialog";
import { Button } from "./components/ui/button";
import ItemFolder from "./components/ItemFolder";

function App() {
  const [filePaths, setFilePaths] = useState([]);

  const handleClick = () => {
    window.electron.showNotification({ title: "Notification", body: "Hey" });
  };

  return (
    <div>
      <Button onClick={handleClick}>Show Notification</Button>
      <div>
        {filePaths.map((element) => (
          <p>{element}</p>
        ))}
        <Dialog callback={setFilePaths} />
        <ItemFolder fullPath={filePaths[0]} />
      </div>
    </div>
  );
}

export default App;
