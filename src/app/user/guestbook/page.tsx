import GuestBook from "@/view/GuestbookPage";


export const metadata = {
  title: "Guestbook Public | Muhammad Sumair Portfolio",
  description:
    "Guestbook Muhammad Sumair, a Full Stack Developer Expert in Next.js, React.js, and the MERN stack. Leave your public messages, feedback",
  keywords:
    "Muhammad Sumair Guestbook, Leave a message, Public feedback, Portfolio Guestbook, Full Stack Developer, Next.js, React.js, MERN Stack",
  authors: [{ name: "Muhammad Sumair" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  alternates: {
    canonical: `${process.env.BASE_URL}/user/guestbook`,
  },
};

export default function Page() {
  return <GuestBook />;
}
