import { FC } from "react";
import { Container } from "react-grid-system";
import { Terminal } from "~components/Terminal";
import { Kernel } from "./kernel";

export const App: FC = () => {
  const kernel = new Kernel();

  return (
    <Container>
      <h1 className="title">daros.dev</h1>

      <Terminal kernel={kernel} />
    </Container>
  );
};
