import { FileSystem } from "../filesys";
import { Directory } from "../filesys/types";

export const absolutize = (
  path: string,
  wd: Directory,
  fs: FileSystem
): string => {
  const isAbsolute = path.startsWith("/");
  const isParent = path.startsWith("..");
  const isCurrent = path.startsWith("./");
  const isHome = path.startsWith("~");
  const isRoot = path === "/";

  if (isRoot) {
    return path;
  }

  if (isAbsolute) {
    return path;
  }

  if (isParent) {
    const parent = wd.parent as Directory;
    return fs.getFullPath(parent) + "/" + path.slice(3);
  }

  if (isCurrent) {
    return fs.getFullPath(wd) + "/" + path.slice(2);
  }

  if (isHome) {
    return "/home/" + path.slice(1);
  }

  return fs.getFullPath(wd) + "/" + path;
};
