import { useEffect, useState } from "react";

// Typing the project data
export interface ProjectPageData {
  id: string;
  icon: string;
  title: string;
  description: string;
  iframe: string;
  gh_repo: string;
}

// Typing the hook return value
export interface UseProjectPageOutput {
  data: ProjectPageData | null;
  loading: boolean;
  error: string | null;
}

export const useProjectPage = (id?: string): UseProjectPageOutput => {
  const [data, setData] = useState<ProjectPageData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/assets/content/projects/${id}.json`);

        if (!response.ok) {
          throw new Error("Error fetching project data");
        }

        const data: ProjectPageData = await response.json();
        setData(data);
      } catch (error) {
        const err = error as Error;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  return { data, loading, error };
};
