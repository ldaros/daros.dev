export class _File {
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

export type FileSystemNode = _File | Directory;
