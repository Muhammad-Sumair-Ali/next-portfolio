import {
  BarChartIcon,
  MessageCircle,
  Flame,
  User,
  Monitor,
  LayoutDashboard,
  Users,
  FolderKanban,
  FlameIcon,
  MessageCircleIcon,
  MonitorIcon,
  PencilIcon,
  UserCircle2Icon,
  Code,
  Paintbrush,
  RefreshCw,
  Inbox,
  MessagesSquare,
  Mail,
  HomeIcon,
  GithubIcon,
  FacebookIcon,
  InstagramIcon,
  Linkedin,
  EyeIcon,
} from "lucide-react";

export const CONNECT_LINKS_ABOUT = [
  {
    icon: <GithubIcon className="w-5 h-5" />,
    text: "GitHub",
    url: "https://github.com/Muhammad-Sumair-Ali",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    text: "Linkedin",
    url: "https://www.linkedin.com/in/muhammad-sumair-b60a91301",
  },
  {
    icon: <FacebookIcon className="w-5 h-5" />,
    text: "Facebook",
    url: "https://www.facebook.com/m.sumair.jatoi",
  },
  {
    icon: <InstagramIcon className="w-5 h-5" />,
    text: "Instagram",
    url: "https://www.instagram.com/muhammadsumairdev",
  },
];
export const CONTACT_LINKS = [
  {
    icon: <GithubIcon className="w-5 h-5" />,
    text: "GitHub",
    url: "https://github.com/Muhammad-Sumair-Ali",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    text: "Linkedin",
    url: "https://www.linkedin.com/in/muhammad-sumair-b60a91301",
  },
  {
    icon: <FacebookIcon className="w-5 h-5" />,
    text: "Facebook",
    url: "https://www.facebook.com/m.sumair.jatoi",
  },
   {
    icon: <InstagramIcon className="w-5 h-5" />,
    text: "Instagram",
    url: "https://www.instagram.com/muhammadsumairdev",
  },
];
export const HEADER_LINKS = [
  {
    icon: <PencilIcon className="size-3.5" />,
    href: "/blog",
    key: "blog",
  },
  {
    icon: <MessageCircleIcon className="size-3.5" />,
    href: "/guestbook",
    key: "guestbook",
  },
  {
    icon: <BarChartIcon className="size-3.5" />,
    href: "/dashboard",
    key: "dashboard",
  },
  {
    icon: <FlameIcon className="size-3.5" />,
    href: "/projects",
    key: "projects",
  },
  {
    icon: <UserCircle2Icon className="size-3.5" />,
    href: "/about",
    key: "about",
  },
  {
    icon: <MonitorIcon className="size-3.5" />,
    href: "/uses",
    key: "uses",
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/user/guestbook", label: "Guestbook", icon: MessageCircle },
  { href: "/user/projects", label: "Projects", icon: Flame },
  { href: "/user/about", label: "About", icon: User },
  { href: "/user/contact", label: "Contact", icon: Monitor },
];

export const SERVICES_CONTACT_FORM = [
  { id: 1, name: "Full Stack Development" },
  { id: 2, name: "Frontend Development" },
  { id: 3, name: "Backend Development" },
  { id: 4, name: "API Development" },
  { id: 5, name: "UI/UX Design" },
];

export const NAV_ITEMS_ADMIN = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Projects", path: "/admin/project", icon: FolderKanban },
  { name: "Contact", path: "/admin/contact", icon: Inbox },
  { name: "GuestBooks", path: "/admin/guestbook", icon: MessagesSquare },
  { name: "Services", path: "/admin/service", icon: Mail },
  { name: "Visitors", path: "/admin/visitors", icon: EyeIcon },
];

export const SERVICES_SECTION_LINKS = [
  {
    title: "Web Development",
    description:
      "Building robust and scalable web applications using modern technologies.",
    icon: Code,
  },
  {
    title: "Web Design",
    description:
      "Creating beautiful and intuitive user interfaces for exceptional user experiences.",
    icon: Paintbrush,
  },
  {
    title: "Website Maintenance",
    description:
      "Keeping your website up-to-date with the latest features and security patches.",
    icon: RefreshCw,
  },
];

export const TECH_SKILLS_PROJECT_FORM = [
  // Frontend Technologies
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",

  // UI Libraries & Styling
  "Tailwind CSS",
  "Bootstrap",
  "Material UI",
  "Chakra UI",
  "Ant Design",
  "ShadCN",
  "SCSS/SASS",

  // State Management
  "Redux",
  "Zustand",
  "React Query",
  "Apollo Client",

  // Backend Technologies
  "Node.js",
  "Express",
  "NestJS",
  "Strapi",

  // API & Protocols
  "WebSockets",
  "Socket.io",
  "JWT Authentication",

  // Databases
  "MongoDB",
  "Firebase",

  // ORMs & Database Tools
  "Mongoose",

  // Cloud & Deployment
  "AWS",
  "Vercel",
  "Netlify",
  "Firebase Hosting",

  // Visualization & Charting
  "Chart.js",
  "Recharts",
  "Framer Motion",

  // Security & Authentication
  "Next Auth",
  "Firebase Auth",

  ,
  // Miscellaneous
  "PWA",
];

export const HERO_TEXTS = [
  {
    key: "Amazing",
    className:
      "bg-gradient-to-r from-[#ff1835] to-[#ffc900] bg-clip-text text-transparent",
  },
  {
    key: "Stunning",
    className:
      "bg-gradient-to-r from-[#0077ff] to-[#00e7df] bg-clip-text text-transparent",
  },
  {
    key: "Fantastic",
    className:
      "bg-gradient-to-r from-[#7f00de] to-[#ff007f] bg-clip-text text-transparent",
  },
  {
    key: "Attractive",
    className:
      "bg-gradient-to-r from-[#2ecc70] to-[#1ca085] bg-clip-text text-transparent",
  },
];
