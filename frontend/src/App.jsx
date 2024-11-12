import { useEffect, useState } from "react";
import Dialog from "./components/Dialog";
import { Button } from "./components/ui/button";
import ItemFolder from "./components/ItemFolder";
import DragAndDrop from "./components/DragAndDrop";
import SendMessage from "./components/ipc/SendMessage";
import Clipboard from "./components/Clipboard";
import Theme from "./components/theme/ChangeTheme";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

function App() {
  const [filePath, setFilePath] = useState("/");
  const { toast } = useToast();

  useEffect(() => {
    window.electron.onShortcut((args) =>
      toast({ title: "Shortcut executed", description: args })
    );
  }, []);

  const handleClick = () => {
    window.electron.showNotification({ title: "Notification", body: "Hey" });
  };

  return (
    <>
      <div>
        <h1 className="w-full text-center text-6xl">Electron</h1>

        {/* Conteneur de la grille */}
        <div className="grid grid-cols-3 gap-4 m-2">
          <div className="flex justify-center items-center min-h-32 bg-slate-300 rounded-xl">
            <Button onClick={handleClick}>Show Notification</Button>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 p-2 min-h-32 min-w-fit bg-slate-300 rounded-xl">
            File: {filePath}
            <Dialog callback={setFilePath} />
            <ItemFolder fullPath={filePath} />
          </div>

          <div className="lex justify-center items-center min-h-32 bg-slate-300 rounded-xl">
            <DragAndDrop />
          </div>

          <div className="min-h-32 bg-slate-300 rounded-xl">
            <Clipboard />
          </div>
        </div>

        {/* Composant SendMessage placé en dessous de la grille */}
        <div className="flex flex-col justify-center items-center gap-2 p-2 min-h-32 min-w-fit bg-slate-300 rounded-xl">
          <SendMessage isMainWindow={window.electron.isMainWindow} />
        </div>
        <div className="flex flex-col justify-center items-center gap-2 p-2 min-h-32 min-w-fit bg-slate-300 rounded-xl">
          <Theme />
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
