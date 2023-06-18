import { FC } from "react";

import { BsFillTerminalFill, BsGithub } from "react-icons/bs";
import { BiGame } from "react-icons/bi";

interface IconProps {
  name: string;
}

export const Icon: FC<IconProps> = ({ name }) => (
  <>
    {name === "BsFillTerminalFill" && <BsFillTerminalFill />}
    {name === "BiGame" && <BiGame />}
    {name === "BsGithub" && <BsGithub />}
  </>
);
