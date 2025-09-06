
import AboutPage from "@/view/AboutPage";

const generateCanonicalURL = () => {
  return `${process.env.BASE_URL}/user/about`;
};

export const metadata = {
  title: "About Muhammad Sumair | Full Stack Developer",
  description:
    "Learn more about Muhammad Sumair, a Full Stack Developer from Karachi Expert in Next.js, React.js, and the MERN stack. Passionate about building web apps",
  keywords:
    "About Muhammad Sumair, Full Stack Developer, Next.js Developer, React.js, MERN Stack, Web Developer Karachi, JavaScript Developer",
  author: "Muhammad Sumair",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  alternates: {
    canonical: generateCanonicalURL(),
  },
};

const About = () => {
  return <AboutPage/>
};

export default About;
