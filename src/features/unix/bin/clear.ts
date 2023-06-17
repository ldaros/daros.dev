import { Kernel } from "@unix/kernel";
import { IO, out } from "@unix/kernel/io";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const clear = (_io: IO, _kernel: Kernel): IO => {
  return out("$clear");
};
