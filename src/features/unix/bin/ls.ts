import { Kernel } from "@unix/kernel";
import { _File } from "@unix/kernel/filesys/types";
import { IO, err, out } from "@unix/kernel/io";
import { absolutize } from "@unix/kernel/utils/absolutize";

export const ls = (io: IO, kernel: Kernel): IO => {
  const { stream } = io;
  const { fs } = kernel;

  let wd = fs.currentDirectory;
  const path = absolutize(stream, wd, fs);

  if (path) {
    const node = fs.findNode(path);

    if (!node) {
      return err(`ls: cannot access '${path}': No such file or directory`);
    }

    if (node instanceof _File) {
      return err(`ls: cannot access '${path}': Not a directory`);
    }

    wd = node;
  }

  const children = wd.children.map((child) => child.name);
  return out(children.join("\n"));
};
