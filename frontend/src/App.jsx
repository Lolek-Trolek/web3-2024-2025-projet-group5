import { Button } from "./components/ui/button";

function App() {
  const handleClick = () => {
    window.electron.showNotification({ title: "Notification", body: "Hey" });
  };

  return (
    <div>
      <Button onClick={handleClick}>Show Notification</Button>
    </div>
  );
}

export default App;
