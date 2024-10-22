import { useState } from "react";
import Dialog from "./components/Dialog";
import { Button } from "./components/ui/button";
import ItemFolder from "./components/ItemFolder";

function App() {
  const [filePath, setFilePath] = useState("/");

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
        <div className="flex flex-col justify-center items-center gap-2 p-2 min-h-32 min-w-fit bg-slate-300 rounded-xl">
          File: {filePath}
          <Dialog callback={setFilePath} />
          <ItemFolder fullPath={filePath} />
        </div>
      </div>
    </div>
  );
}

export default App;
