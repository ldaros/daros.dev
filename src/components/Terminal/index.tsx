import { useState, useEffect, useRef, FC } from "react";
import { Input } from "~/components/Input";
import { Kernel } from "~/kernel";
import "./styles.scss";
import { IO } from "~/kernel/io";
import { FileSystemFile } from "~/kernel/filesys";

type TerminalProps = {
  kernel: Kernel;
};

export const Terminal: FC<TerminalProps> = ({ kernel }) => {
  const [output, setOutput] = useState("");
  const [dir, setDir] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const handleInput = (value: string) => {
    setOutput((prev) => `${prev}$ ${value}\n`);

    const output = kernel.run(value);
    if (output) {
      handleStdout(output);
    }

    setHistory((prev) => [value, ...prev]);
    updateHistoryFile(history, kernel);
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleStdout = ({ stream }: IO) => {
    if (stream === "$clear") {
      setOutput("");
      return;
    }

    if (stream) setOutput((prev) => `${prev}${stream}\n`);
  };

  useEffect(() => {
    const result = kernel.run("pwd");
    if (result?.stream) {
      setDir(result.stream);
    }
  }, [kernel]);

  useEffect(() => {
    if (preRef.current) {
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div onClick={handleFocus} className="terminal">
      <pre ref={preRef} className="output">
        {output}
      </pre>

      <Input
        ref={inputRef}
        onOutput={handleInput}
        history={history}
        dir={dir}
      />
    </div>
  );
};

const updateHistoryFile = (history: string[], kernel: Kernel) => {
  const historyString = history.join("\n");
  const historyFile = kernel.fs.findNode("/.history") as FileSystemFile;
  historyFile.content = historyString;
};
