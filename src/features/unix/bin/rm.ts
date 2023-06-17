import { Kernel } from "@unix/kernel";
import { IO, err, out } from "@unix/kernel/io";
import { absolutize } from "@unix/kernel/utils/absolutize";

export const rm = (io: IO, kernel: Kernel): IO => {
  const { stream } = io;
  const { fs } = kernel;
  const wd = fs.currentDirectory;

  if (!stream) return out("rm: missing operand");

  const path = absolutize(stream, wd, fs);
  const node = fs.findNode(path);

  if (!node)
    return out("rm: cannot remove '" + stream + "': No such file or directory");

  try {
    fs.removeFile(path);
  } catch (e: unknown) {
    const error = e as Error;
    return err(error.message);
  }

  return out("");
};
