import { Kernel } from "~/kernel";
import { IO, err, out } from "~/kernel/io";
import { Directory } from "~/kernel/filesys";

export const cd = (io: IO, kernel: Kernel): IO => {
  const { fs } = kernel;

  const currentDirectory = fs.currentDirectory;

  let path = io.stream;
  if (!path) return err("missing operand");

  if (path === "..") {
    if (!currentDirectory.parent) return out("");
    fs.currentDirectory = currentDirectory.parent;
    return out("");
  }

  const isAbsolute = path.startsWith("/");
  if (!isAbsolute) {
    const dir = fs.getFullPath(currentDirectory);
    path = `${dir}/${path}`;
  }

  const node = fs.findNode(path);

  if (!node) return out("Path not found");

  if (!(node instanceof Directory)) return out("Path is not a directory");

  fs.currentDirectory = node;
  return out("");
};
