import { FC } from "react";
import { Header } from "~/components";
import { Banner } from "~/components/Banner";
import { Grid } from "~/components/Grid";

import placeholderImage from "~/assets/images/placeholder.png";

export const Home: FC = () => {
  return (
    <Grid>
      <Header />

      <Banner
        id="featured"
        title="Featured"
        description="Lorem ipsum dolor sit amet consectetur. Amet non consequat sagittis nec."
        button="click me"
        link="#"
      >
        <img
          src={placeholderImage}
          alt="placeholder"
          className="banner__image"
        />
      </Banner>
    </Grid>
  );
};
