import React from "react";
import { Button } from "./ui/button";

export default function ItemFolder({ fullPath }) {
  const handleClick = async () => {
    await window.electron.showInItemFolder(fullPath);
  };

  return (
    <div>
      <Button onClick={handleClick}>Show file in item folder</Button>
    </div>
  );
}
