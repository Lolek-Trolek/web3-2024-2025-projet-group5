import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function Dialog({ callback }) {
  const [fileType, setfileType] = useState("all");

  const handleClick = async () => {
    const filePath = await window.electron
      .openDialog(fileType)
      .then((result) => (result.canceled ? "/" : result.filePaths[0]));

    callback(filePath);
  };

  return (
    <div className="flex gap-2">
      <Select onValueChange={setfileType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choose File Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="image">Image</SelectItem>
          <SelectItem value="pdf">PDF</SelectItem>
          <SelectItem value="all">All Types</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleClick}>Open file</Button>
    </div>
  );
}
