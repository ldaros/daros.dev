import * as bin from "~/bin";
import { Directory, FileSystem, FileSystemFile } from "./filesys";
import { IO, err } from "./io";

export class Kernel {
  readonly fs: FileSystem;

  constructor() {
    this.fs = new FileSystem();
    makeSystemDirs(this.fs);
    populateBin(this.fs);
  }

  run(input: string): IO {
    const commandStrings = input.split(" | ");
    let currentInput: IO = { stream: "", type: "stdin" };

    for (const cmdStr of commandStrings) {
      const [preRedirect, postRedirect] = cmdStr.split(" > ");
      const [command, ...args] = preRedirect.split(" ");

      const commandFn = bin[command as keyof typeof bin];
      if (commandFn) {
        currentInput = commandFn(
          { stream: `${currentInput.stream} ${args.join(" ")}`, type: "stdin" },
          this
        );

        if (postRedirect) {
          const fileName = postRedirect.trim();
          this.fs.writeFile(fileName, currentInput.stream);
          currentInput = { stream: "", type: "stdout" };
        }
      } else {
        return err(`Command not found: ${command}`);
      }
    }

    return currentInput;
  }
}

const makeSystemDirs = (fs: FileSystem) => {
  const root = fs.root;

  root.children.push(new Directory("bin", root));
  root.children.push(new Directory("etc", root));
  root.children.push(new Directory("home", root));
  root.children.push(new Directory("tmp", root));

  root.children.push(new FileSystemFile(".history", root, ""));
};

const populateBin = (fs: FileSystem) => {
  const binDir = fs.findNode("/bin") as Directory;
  if (!binDir) return;

  for (const [name, fn] of Object.entries(bin)) {
    const file = new FileSystemFile(name, binDir, fn.toString());
    binDir.children.push(file);
  }
};
