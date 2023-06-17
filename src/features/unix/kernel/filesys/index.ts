import { Directory, FileSystemNode, _File } from "./types";
import fileSystemData from "./data.json";
import { isValidFileName } from "../utils/validateFileName";

export class FileSystem {
  root: Directory;
  currentDirectory: Directory;

  constructor() {
    this.root = new Directory("root");
    this.currentDirectory = this.root;
    this.initializeSystemFiles();
  }

  findNode(path: string): FileSystemNode | null {
    const pathParts = path.split("/").filter((part) => part !== "");
    let currentNode: FileSystemNode = this.root;

    for (const part of pathParts) {
      if (currentNode instanceof Directory) {
        currentNode = currentNode.children.find(
          (child) => child.name === part
        ) as FileSystemNode;
      } else {
        return null;
      }
    }

    return currentNode;
  }

  getFullPath(node: FileSystemNode): string {
    const pathParts: string[] = [];
    for (
      let currentNode: FileSystemNode = node;
      currentNode !== this.root && currentNode.parent;
      currentNode = currentNode.parent
    ) {
      pathParts.push(currentNode.name);
    }
    return "/" + pathParts.reverse().join("/");
  }

  writeFile(path: string, content: string): void {
    this.createItem(path, content, false);
  }

  removeFile(path: string): void {
    this.removeItem(path);
  }

  copyFile(sourcePath: string, destinationPath: string): void {
    this.copyItem(sourcePath, destinationPath);
  }

  setCurrentDirectory(path: string): void {
    const node = this.findNode(path);
    if (node instanceof Directory) {
      this.currentDirectory = node;
      return;
    }
    throw new Error("fs: directory not found");
  }

  createDir(path: string): void {
    this.createItem(path, "", true);
  }

  private initializeSystemFiles() {
    this.root.children = fileSystemData.map((file) =>
      file.type === "file"
        ? new _File(file.name, this.root, "")
        : new Directory(file.name, this.root)
    );
  }

  private isSystemFile(name: string): boolean {
    return fileSystemData.some((file) => file.name === name);
  }

  private createItem(
    path: string,
    content: string,
    isDirectory: boolean
  ): void {
    const [parentDirPath, itemName] = this.splitPath(path);
    if (!isValidFileName(itemName)) throw new Error("fs: invalid name");
    if (this.isSystemFile(itemName))
      throw new Error("fs: cannot create system item");

    const parentDir = this.findNode(parentDirPath);
    if (parentDir && parentDir instanceof Directory) {
      parentDir.children.push(
        isDirectory
          ? new Directory(itemName, parentDir)
          : new _File(itemName, parentDir, content)
      );
    }
  }

  private removeItem(path: string): void {
    const [parentDirPath, itemName] = this.splitPath(path);
    if (this.isSystemFile(itemName))
      throw new Error("fs: cannot remove system item");

    const parentDir = this.findNode(parentDirPath);
    if (parentDir && parentDir instanceof Directory) {
      parentDir.children = parentDir.children.filter(
        (child) => child.name !== itemName
      );
    }
  }

  private copyItem(sourcePath: string, destinationPath: string): void {
    const [sourceParentDirPath, sourceItemName] = this.splitPath(sourcePath);
    const [destinationParentDirPath, destinationItemName] =
      this.splitPath(destinationPath);

    if (this.isSystemFile(sourceItemName))
      throw new Error("fs: cannot copy system item");
    if (this.isSystemFile(destinationItemName))
      throw new Error("fs: cannot copy to system item");

    const sourceParentDir = this.findNode(sourceParentDirPath);
    const destinationParentDir = this.findNode(destinationParentDirPath);

    if (
      sourceParentDir &&
      sourceParentDir instanceof Directory &&
      destinationParentDir &&
      destinationParentDir instanceof Directory
    ) {
      const sourceItem = sourceParentDir.children.find(
        (child) => child.name === sourceItemName
      );
      if (sourceItem && sourceItem instanceof _File) {
        const destinationItem = new _File(
          destinationItemName,
          destinationParentDir,
          sourceItem.content
        );
        destinationParentDir.children.push(destinationItem);
      }
    }
  }

  private splitPath(path: string): [string, string] {
    const pathParts = path.split("/");
    const itemName = pathParts.pop() || "";
    return [pathParts.join("/"), itemName];
  }
}
