import { FC } from "react";
import { Icon } from "~/lib/Icon";

type StatsTitleProps = {
  name: string;
};

export const StatsTitle: FC<StatsTitleProps> = ({ name }) => {
  return (
    <div className="stats-title">
      <Icon name="BsGithub" />
      <h4 className="stats-title__name">{name}</h4>
    </div>
  );
};
