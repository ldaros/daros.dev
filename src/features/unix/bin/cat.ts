import { Kernel } from "@unix/kernel";
import { _File } from "@unix/kernel/filesys/types";
import { IO, out } from "@unix/kernel/io";
import { absolutize } from "@unix/kernel/utils/absolutize";

export const cat = (io: IO, kernel: Kernel): IO => {
  const { stream } = io;
  const { fs } = kernel;
  const wd = fs.currentDirectory;

  if (!stream) return out("cat: missing operand");

  const path = absolutize(stream, wd, fs);
  const node = fs.findNode(path);

  if (!node) return out("cat: file not found");
  if (!(node instanceof _File)) return out("cat: path is not a file");

  return out(node.content ?? "");
};
