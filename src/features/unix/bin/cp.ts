import { Kernel } from "@unix/kernel";
import { IO, err, out } from "@unix/kernel/io";
import { absolutize } from "@unix/kernel/utils/absolutize";

export const cp = (io: IO, kernel: Kernel): IO => {
  const { stream } = io;
  const { fs } = kernel;
  const wd = fs.currentDirectory;

  const args = stream?.split(" ");

  if (args.length !== 2) return out("cp: missing operand");
  const path1 = absolutize(args[0], wd, fs);
  const path2 = absolutize(args[1], wd, fs);

  try {
    fs.copyFile(path1, path2);
  } catch (e) {
    const error = e as Error;
    return err(error.message);
  }

  return out("");
};
