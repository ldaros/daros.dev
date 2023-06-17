import { Kernel } from "~/kernel";
import { FileSystemFile } from "~/kernel/filesys";
import { IO, out } from "~/kernel/io";

export const touch = (io: IO, kernel: Kernel): IO => {
  const { fs: fileSystem } = kernel;

  const wd = fileSystem.currentDirectory;

  const path = io.stream;
  if (!path) return out("missing operand");

  const dir = fileSystem.getFullPath(wd);
  const node = fileSystem.findNode(dir + "/" + path);
  if (node) return out("File already exists");

  wd.children.push(new FileSystemFile(path, wd, ""));
  return out("");
};
