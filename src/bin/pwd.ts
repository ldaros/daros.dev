import { Kernel } from "~/kernel";
import { IO, out } from "~/kernel/io";

export const pwd = (io: IO, kernel: Kernel): IO => {
  const { fs: fileSystem } = kernel;

  const currentDirectory = fileSystem.currentDirectory;

  return out(kernel.fs.getFullPath(currentDirectory));
};
