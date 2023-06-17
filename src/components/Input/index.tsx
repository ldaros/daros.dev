import {
  useState,
  useRef,
  KeyboardEvent,
  FC,
  forwardRef,
  useImperativeHandle,
} from "react";

import "./styles.scss";

type InputProps = {
  onOutput: (value: string) => void;
  ref?: React.Ref<InputRef>;
  dir: string;
  history: string[];
};

type InputRef = {
  focus: () => void;
};

export const Input: FC<InputProps> = forwardRef(
  ({ onOutput, dir, history }, ref) => {
    const [inputValue, setInputValue] = useState("");
    const [historyIndex, setHistoryIndex] = useState(0);
    const inputRef = useRef<HTMLDivElement>(null);

    const updateInputValue = (value: string) => {
      setInputValue(value);
      if (inputRef.current) {
        inputRef.current.innerText = value;
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        event.preventDefault(); // this prevents the new line from being created
        onOutput(inputValue);
        setInputValue("");

        if (inputRef.current) {
          inputRef.current.innerText = "";
        }

        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();

        setHistoryIndex((prevIndex) =>
          Math.min(prevIndex + 1, history.length - 1)
        );

        const upValue = history[historyIndex];
        if (upValue) {
          updateInputValue(upValue);
        }

        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();

        setHistoryIndex((prevIndex) => Math.max(prevIndex - 1, 0));

        const downValue = history[historyIndex];
        if (downValue) {
          updateInputValue(downValue);
        }

        return;
      }
    };

    const handleInput = () => {
      if (inputRef.current) {
        setInputValue(inputRef.current.innerText);
      }
    };

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    return (
      <div className="input-container">
        <span className="user">daros@dev {dir} $</span>

        <div
          ref={inputRef}
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          className="input"
        />
      </div>
    );
  }
);
