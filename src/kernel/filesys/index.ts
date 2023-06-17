export class FileSystemFile {
  name: string;
  content?: string;
  parent: Directory;

  constructor(name: string, parent: Directory, content?: string) {
    this.name = name;
    this.content = content;
    this.parent = parent;
  }
}

export class Directory {
  name: string;
  children: FileSystemNode[];
  parent?: Directory;

  constructor(name: string, parent?: Directory) {
    this.name = name;
    this.children = [];
    this.parent = parent;
  }
}

export type FileSystemNode = FileSystemFile | Directory;

export class FileSystem {
  root: Directory;
  currentDirectory: Directory;

  constructor() {
    this.root = new Directory("/");
    this.currentDirectory = this.root;
  }

  findNode = (path: string): FileSystemNode | null => {
    const pathParts = path.split("/").filter((part) => part !== "");

    const node = this._findNodeRecursive(this.root, pathParts);
    if (!node) return null;

    return node;
  };

  _findNodeRecursive = (
    node: FileSystemNode,
    pathParts: string[]
  ): FileSystemNode | null => {
    if (pathParts.length === 0) return node;

    if (node instanceof Directory) {
      const child = node.children.find((child) => child.name === pathParts[0]);
      if (!child) {
        return null;
      }

      return this._findNodeRecursive(child, pathParts.slice(1));
    }

    return null;
  };

  getFullPath = (node: FileSystemNode): string => {
    const pathParts: string[] = [];

    let currentNode: FileSystemNode = node;
    while (currentNode !== this.root && currentNode.parent) {
      pathParts.push(currentNode.name);
      currentNode = currentNode.parent;
    }

    return "/" + pathParts.reverse().join("/");
  };

  writeFile = (path: string, content: string): void => {
    const pathParts = path.split("/").filter((part) => part !== "");

    const fileName = pathParts.pop();
    if (!fileName) return;

    const parentDir = this._findNodeRecursive(this.root, pathParts);
    if (!parentDir || !(parentDir instanceof Directory)) return;

    const file = new FileSystemFile(fileName, parentDir, content);
    parentDir.children.push(file);
  }
}
