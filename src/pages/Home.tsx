import { FC } from "react";

import { Terminal } from "~/features/unix/components/Terminal";
import { Banner, Title, Card, CardGrid, Button } from "~/components";
import { Header, Footer, Grid } from "~/layout";
import { Icon } from "~/lib/Icon";

export const Home: FC = () => {
  return (
    <Grid>
      <Header />

      <Banner
        id="featured"
        title="js-unix"
        description="A UNIX-like operating system written in TypeScript."
        button={
          <Button
            to="https://github.com/ldaros/daros.dev/tree/master/src/features/unix"
            text="Learn More"
          />
        }
      >
        <Terminal />
      </Banner>

      <Title id="projects">Projects</Title>

      <CardGrid>
        <Card
          title="js-unix"
          description="A UNIX-like operating system written in TypeScript."
          icon={<Icon name="BsFillTerminalFill" />}
          image="/assets/images/unix.webp"
        />

        <Card
          title="Freeway"
          description="A remake of the classic Atari game Freeway."
          icon={<Icon name="BiGame" />}
          image="/assets/images/freeway.webp"
          button={<Button to="/projects/freeway/" text="Play" />}
        />
      </CardGrid>

      <Footer />
    </Grid>
  );
};
