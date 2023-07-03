import { FC } from "react";
import { useQuery } from "@apollo/client";

import { Terminal } from "~/features/unix/components/Terminal";
import { Banner, Title, Card, CardGrid, Button } from "~/components";
import { Header, Footer, Grid } from "~/layout";
import { Icon } from "~/lib/Icon";
import { listProjects } from "~/services/cms/queries";
import { ProjectData } from "~/services/cms/types";

export const Home: FC = () => {
  const { data } = useQuery(listProjects);
  const projects = data?.projectCollection?.items as ProjectData[];

  return (
    <Grid>
      <Header />

      <div className="page__content">
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

        <section className="page__section">
          <Title id="projects">Personal Projects</Title>
          <CardGrid>
            {projects?.map((project) => (
              <ProjectCard {...project} />
            ))}
          </CardGrid>
        </section>
      </div>
      <Footer />
    </Grid>
  );
};

const ProjectCard: FC<ProjectData> = ({
  slug,
  icon,
  name,
  description,
  thumbnail,
}) => (
  <Card
    key={slug}
    icon={<Icon name={icon ?? ""} />}
    title={name}
    description={description ?? ""}
    image={thumbnail?.url ?? ""}
    button={<Button to={`/projects/${slug}/`} text="Learn More" />}
  />
);
