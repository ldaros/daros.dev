import { FC } from "react";

type StatsNumberProps = {
  value?: number;
  label: string;
};

export const StatsNumber: FC<StatsNumberProps> = ({ value, label }) => {
  if (!value) return;

  return (
    <div className="stats-number">
      <p className="stats-number__value">{value}</p>
      <p className="stats-number__label">{label}</p>
    </div>
  );
};
