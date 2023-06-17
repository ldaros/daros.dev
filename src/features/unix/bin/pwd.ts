import { Kernel } from "@unix/kernel";
import { IO, out } from "@unix/kernel/io";

export const pwd = (_io: IO, kernel: Kernel): IO => {
  const { fs } = kernel;

  const wd = fs.currentDirectory;
  return out(kernel.fs.getFullPath(wd));
};
