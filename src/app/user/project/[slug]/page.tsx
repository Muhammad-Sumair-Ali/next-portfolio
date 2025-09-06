import { trimDescription } from "@/lib/utils";
import Projectpage from "@/view/ProjectPage";
import axios from "axios";

async function getProjectById(id: string) {
  try {
    const res = await axios.get(`http://localhost:3000/api/project/get/${id}`);
    return res.data.project;
  } catch (err) {
    console.error("Error fetching project:", err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  if (!slug) return {};

  const project = await getProjectById(slug);
  return {
    title: project?.title
      ? `${project.title} | Muhammad Sumair Portfolio`
      : "Project | Muhammad Sumair Portfolio",
    description: trimDescription(project?.description) || "Project details page",
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
export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  if (!slug) return <div>ID is required</div>;

  const project = await getProjectById(slug);
console.log("Project",project)
  if (!project) {
    return <div className="p-6 text-red-500">Project not found</div>;
  }

  return <Projectpage project={project}/>;
}
