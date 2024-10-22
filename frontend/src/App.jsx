import { useState } from "react";
import Dialog from "./components/Dialog";
import { Button } from "./components/ui/button";

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
      </div>
    </div>
  );
}

export default App;
