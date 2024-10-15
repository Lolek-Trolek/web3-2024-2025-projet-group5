import { Button } from "./components/ui/button";

function App() {
  const handleClick = async () => {
    const filePaths = await window.electron.openDialog();
    console.log("Selected files:", filePaths);
  };

  return (
    <div>
      <Button onClick={handleClick}>Hello there !</Button>
    </div>
  );
}

export default App;
