import React from "react";
import { Button } from "./ui/button";

export default function Dialog({ callback }) {
  const handleClick = async () => {
    const filePath = await window.electron
      .openDialog()
      .then((result) => (result.canceled ? "/" : result.filePaths[0]));

    callback(filePath);
  };

  return (
    <div>
      <Button onClick={handleClick}>Open file</Button>
    </div>
  );
}
