export interface IO {
  stream: string;
  type: "stdin" | "stdout" | "stderr";
}

export function inp(stream: string): IO {
  return { stream, type: "stdin" };
}

export function out(stream: string): IO {
  return { stream, type: "stdout" };
}

export function err(stream: string): IO {
  return { stream, type: "stderr" };
}
