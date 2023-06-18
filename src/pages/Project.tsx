import { FC } from "react";
import { useParams } from "react-router-dom";
import { useProjectPage } from "~/services/cms";

import { Header, Footer, Grid } from "~/layout";
import { RichText, Title, IFrame, Button } from "~/components";
import { Icon } from "~/lib/Icon";

export const Project: FC = () => {
  const { id } = useParams();
  const { data: project, loading, error } = useProjectPage(id);

  if (loading || error || !project) {
    return <div></div>;
  }

  return (
    <Grid>
      <Header />

      <IFrame src={project.iframe} />

      <article>
        <Title icon={<Icon name={project.icon} />}>{project.title}</Title>
        <RichText>{project.description}</RichText>

        {project.gh_repo && (
          <Button
            icon={<Icon name="BsGithub" />}
            to={project.gh_repo}
            text="View on GitHub"
          />
        )}
      </article>

      <Footer />
    </Grid>
  );
};
