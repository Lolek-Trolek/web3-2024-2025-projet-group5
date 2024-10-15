import { Button } from "./components/ui/button";

function App() {
  const handleClick = () => {
    window.electron.showNotification({ title: "hey", body: "hey 2" });
  };

  return (
    <div>
      <Button onClick={handleClick}>Hello there !</Button>
    </div>
  );
}

export default App;
