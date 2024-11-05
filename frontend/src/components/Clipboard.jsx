import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Clipboard() {
  const [refresh, setRefresh] = useState(0);
  const [content, setContent] = useState({
    format: "text",
    content: "loading...",
  });
  const [text, setText] = useState("Hello world!");

  useEffect(() => {
    window.electron.readClipboard().then((content) => setContent(content));
    console.log(content);
  }, [refresh]);

  return (
    <div className="h-full flex  p-2 gap-2">
      <div className="w-1/2 flex flex-col gap-2">
        <Button
          className="w-full"
          onClick={() => setRefresh(refresh + 1)}
          size="icon"
        >
          Refresh
        </Button>
        {content.format === "image" ? (
          <img className="w-[300px] h-[300px]" src={content.content} />
        ) : (
          <p>{content.content}</p>
        )}
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center gap-2">
        <Input value={text} onChange={(e) => setText(e.target.value)} />
        <Button
          className="w-full"
          onClick={() => window.electron.writeClipboard(text)}
        >
          Copy text
        </Button>
      </div>
    </div>
  );
}
