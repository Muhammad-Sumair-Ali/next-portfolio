import ProjectsPage from '@/view/ProjectsPage';


const generateCanonicalURL = () => {
  return `${process.env.BASE_URL}/user/projects`;
};

export const metadata = {
    title: "My All Projects | Muhammad Sumair Portfolio",
    description:
      "Explore projects of Muhammad Sumair, a Full Stack Developer Expert in Next.js, React.js, and the MERN stack. Discover modern, web applications",
    keywords:
      "Muhammad Sumair Projects, Full Stack Developer Portfolio, Next.js Projects, React.js Projects, MERN Stack Applications, Web Developer Portfolio, Modern Web Apps",
    author: "Muhammad Sumair",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    alternates: {
      canonical: generateCanonicalURL(),
    },
}


const page = () => {
  return <ProjectsPage/>
}

export default page
