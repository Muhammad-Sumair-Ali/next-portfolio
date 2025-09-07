import ContactPage from "@/view/ContactPage";

const generateCanonicalURL = () => {
  return `${process.env.BASE_URL}/contact`;
};

export const metadata = {
  title: "Contact Muhammad Sumair | Full Stack Developer",
  description:
    "Get in touch with Muhammad Sumair, a Full Stack Developer Expert in Next.js, React.js, and the MERN stack. Reach out for collaborations, projects",
  keywords:
    "Contact Muhammad Sumair, Hire Full Stack Developer, Next.js Developer, React.js Developer, MERN Stack Developer, Web Developer Karachi, Work with Sumair",
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

const Page = () => {
  return <ContactPage />;
};

export default Page;
