import * as bin from "@unix/bin";
import { FileSystem } from "./filesys";
import { IO, err } from "./io";
import { Directory, _File } from "./filesys/types";

export class Kernel {
  readonly fs: FileSystem;

  constructor() {
    this.fs = new FileSystem();
    this.populateBin();
  }

  run(input: string): IO {
    const commandStrings = input.split(" | ");
    let currentInput: IO = { stream: "", type: "stdin" };

    for (const cmdStr of commandStrings) {
      currentInput = this.executeCommand(cmdStr, currentInput);
      if (currentInput.type === "stderr") {
        return currentInput;
      }
    }

    return currentInput;
  }

  private executeCommand(cmdStr: string, previousOutput: IO): IO {
    const [preRedirect, postRedirect] = cmdStr.split(" > ");
    const [command, ...args] = preRedirect.split(" ");

    const commandFn = bin[command as keyof typeof bin];
    if (!commandFn) {
      return err(`Command not found: ${command}`);
    }

    const commandOutput = commandFn(
      { stream: `${previousOutput.stream}${args.join(" ")}`, type: "stdin" },
      this
    );

    if (postRedirect) {
      return this.handleRedirection(postRedirect, commandOutput);
    }

    return commandOutput;
  }

  private handleRedirection(fileName: string, commandOutput: IO): IO {
    fileName = fileName.trim();
    try {
      this.fs.writeFile(fileName, commandOutput.stream);
    } catch (e: unknown) {
      const error = e as Error;
      return err(error.message);
    }

    return { stream: "", type: "stdout" };
  }

  private populateBin() {
    const binDir = this.fs.findNode("/bin") as Directory;
    if (!binDir) return;

    for (const [name, fn] of Object.entries(bin)) {
      const file = new _File(name, binDir, fn.toString());
      binDir.children.push(file);
    }
  }
}
