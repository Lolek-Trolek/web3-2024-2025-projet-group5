import React from "react";
import { Button } from "./ui/button";

export default function Dialog({ callback }) {
  const handleClick = async () => {
    callback(await window.electron.openDialog());
  };

  return (
    <div>
      <Button onClick={handleClick}>Open file</Button>
    </div>
  );
}
