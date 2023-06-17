import { Kernel } from "~/kernel";
import { IO, out } from "~/kernel/io";

export const clear = (io: IO, kernel: Kernel): IO => {
  return out("$clear");
};
