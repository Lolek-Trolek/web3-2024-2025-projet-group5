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
      <h1 className="w-full text-center text-6xl">Electron</h1>
      <div className="grid grid-cols-3 gap-4 m-2">
        <div className="flex justify-center items-center min-h-32 bg-slate-300 rounded-xl">
          <Button onClick={handleClick}>Show Notification</Button>
        </div>
        <div className="flex justify-center items-center min-h-32 bg-slate-300 rounded-xl">
          {filePaths.map((element) => (
            <p>{element}</p>
          ))}
          <Dialog callback={setFilePaths} />
          <ItemFolder fullPath={filePaths[0]} />
        </div>
      </div>
    </div>
  );
}

export default App;
