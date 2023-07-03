import { FC } from "react";
import { useParams } from "react-router-dom";
import { Header, Footer, Grid } from "~/layout";
import { RichText, Title, IFrame, Button } from "~/components";
import { getProjectBySlug } from "~/services/cms/queries";
import { Icon } from "~/lib/Icon";
import { useQuery } from "@apollo/client";
import { ProjectData } from "~/services/cms/types";

interface ProjectDetailProps {
  project: ProjectData;
}

export const Project: FC = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(getProjectBySlug, {
    variables: { slug: id },
  });
  const project = data?.projectCollection?.items[0] as ProjectData;

  if (loading || error || !project) {
    return <div>Loading...</div>;
  }

  return (
    <Grid>
      <Header />
      <ProjectDetail project={project} />
      <Footer />
    </Grid>
  );
};

const ProjectDetail: FC<ProjectDetailProps> = ({ project }) => {
  return (
    <>
      {project.iframeLink && <IFrame src={project.iframeLink} />}

      <article>
        <Title icon={<Icon name={project.icon ?? ""} />}>{project.name}</Title>
        <RichText data={project.content?.json} />

        {project.gitHubRepository && (
          <Button
            icon={<Icon name="BsGithub" />}
            to={project.gitHubRepository}
            text="View on GitHub"
          />
        )}
      </article>
    </>
  );
};
