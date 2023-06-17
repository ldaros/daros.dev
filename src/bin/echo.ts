import { Kernel } from "~/kernel";
import { IO, out } from "~/kernel/io";

export const echo = (io: IO, kernel: Kernel): IO => {
  const { stream } = io;

  const streamParts = stream.split(" ");
  streamParts.shift();

  return out(streamParts.join(" "));
};
