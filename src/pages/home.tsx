import { FC } from "react";
import { Header, Banner, Grid } from "~/components";

import { Terminal } from "~/features/unix/components/Terminal";
import { Kernel } from "~/features/unix/kernel";

export const Home: FC = () => {
  const kernel = new Kernel();

  return (
    <Grid>
      <Header />

      <Banner
        id="featured"
        title="js-unix"
        description="A UNIX-like operating system written in TypeScript."
        button="Learn More"
        link="https://github.com/ldaros/daros.dev/tree/master/src/features/unix"
      >
        <Terminal kernel={kernel} />
      </Banner>
    </Grid>
  );
};
