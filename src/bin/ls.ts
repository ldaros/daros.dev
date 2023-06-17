import { Kernel } from "~/kernel";
import { IO, out } from "~/kernel/io";

export const ls = (io: IO, kernel: Kernel): IO => {
  const { fs: fileSystem } = kernel;

  const currentDirectory = fileSystem.currentDirectory;

  const children = currentDirectory.children.map((child) => child.name);

  return out(children.join("\n"));
};
