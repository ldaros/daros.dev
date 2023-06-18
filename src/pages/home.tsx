import { FC } from "react";
import { Terminal } from "~/features/unix/components/Terminal";
import {
  Header,
  Banner,
  Grid,
  Title,
  Card,
  CardGrid,
  Button,
} from "~/components";

import { BsFillTerminalFill } from "react-icons/bs";
import { BiGame } from "react-icons/bi";

export const Home: FC = () => {
  return (
    <Grid>
      <Header />

      <Banner
        id="featured"
        title="js-unix"
        description="A UNIX-like operating system written in TypeScript."
        button={<Button to="#featured" text="Learn More" />}
      >
        <Terminal />
      </Banner>

      <Title id="projects">Projects</Title>

      <CardGrid>
        <Card
          title="js-unix"
          description="A UNIX-like operating system written in TypeScript."
          icon={<BsFillTerminalFill />}
          image="/assets/images/unix.png"
        />

        <Card
          title="Freeway"
          description="A remake of the classic Atari game Freeway."
          icon={<BiGame />}
          image="/assets/images/freeway.png"
        />
      </CardGrid>
    </Grid>
  );
};
