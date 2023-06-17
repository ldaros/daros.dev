import { Kernel } from "@unix/kernel";
import { IO, err, out } from "@unix/kernel/io";
import { absolutize } from "@unix/kernel/utils/absolutize";

export const touch = (io: IO, kernel: Kernel): IO => {
  const { stream } = io;
  const { fs } = kernel;
  const wd = fs.currentDirectory;

  if (!stream) return out("touch: missing operand");
  const path = absolutize(stream, wd, fs);

  try {
    fs.writeFile(path, "");
  } catch (e) {
    const error = e as Error;
    return err(error.message);
  }

  return out("");
};
