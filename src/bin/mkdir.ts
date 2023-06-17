import { Kernel } from "~/kernel";
import { Directory } from "~/kernel/filesys";
import { IO, err, out } from "~/kernel/io";

export const mkdir = ({ stream }: IO, kernel: Kernel): IO => {
  const { fs } = kernel;

  const currentDirectory = fs.currentDirectory;

  const path = stream;
  if (!path) return err("missing operand");

  currentDirectory.children.push(new Directory(path, currentDirectory));

  return out("");
};
