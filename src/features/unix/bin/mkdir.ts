import { Kernel } from "@unix/kernel";
import { IO, err, out } from "@unix/kernel/io";
import { absolutize } from "@unix/kernel/utils/absolutize";

export const mkdir = ({ stream }: IO, kernel: Kernel): IO => {
  const { fs } = kernel;
  const wd = fs.currentDirectory;

  const path = absolutize(stream, wd, fs);
  if (!path) return err("mkdir: missing operand");

  try {
    fs.createDir(path);
  } catch (e) {
    const error = e as Error;
    return err(error.message);
  }

  return out("");
};
