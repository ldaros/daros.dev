import { Kernel } from "~/kernel";
import { FileSystemFile } from "~/kernel/filesys";
import { IO, out } from "~/kernel/io";

export const cat = (io: IO, kernel: Kernel): IO => {
  const { fs: fileSystem } = kernel;
  const wd = fileSystem.currentDirectory;

  const path = io.stream;
  if (!path) return out("missing operand");

  const dir = fileSystem.getFullPath(wd);
  const node = fileSystem.findNode(dir + "/" + path);
  if (!node) return out("File not found");

  if (!(node instanceof FileSystemFile)) return out("Path is not a file");

  return out(node.content ?? "");
};
