import { trimDescription } from "@/lib/utils";
import Projectpage from "@/view/ProjectPage";
import axios from "axios";

async function getProjectById(id: string) {
  try {
    const res = await axios.get(
      `${process.env.BASE_URL}/api/project/get/${id}`
    );
    return res.data.project;
  } catch (err) {
    console.error("Error fetching project:", err);
    return null;
  }
}
interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = params;
  if (!slug) return {};

  const project = await getProjectById(slug);

  return {
    title: project?.title
      ? `${project.title} | Muhammad Sumair Portfolio`
      : "Project | Muhammad Sumair Portfolio",
    description:
      trimDescription(project?.description) || "Project details page",
    keywords:
      "Muhammad Sumair Project, Full Stack Developer Portfolio, Next.js Projects, React.js Projects, MERN Stack Applications, Web Developer Portfolio, Modern Web Apps",
    author: "Muhammad Sumair",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    alternates: {
      canonical: `${process.env.BASE_URL}/user/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;
  if (!slug) return <div>ID is required</div>;

  const project = await getProjectById(slug);

  if (!project) {
    return <div className="p-6 text-red-500">Project not found</div>;
  }

  return <Projectpage project={project} />;
}
