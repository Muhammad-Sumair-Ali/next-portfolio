import { BarChartIcon, MessageCircle,
  BarChart3,
  Flame,
  User,
  Monitor,
  LayoutDashboard,
  Users,
  FolderKanban,
   FlameIcon, MessageCircleIcon, MonitorIcon, PencilIcon, UserCircle2Icon, 
  Code,
  Paintbrush,
  RefreshCw,
  Inbox,
  MessagesSquare} from "lucide-react";



export const HEADER_LINKS = [
    {
      icon: <PencilIcon className='size-3.5' />,
      href: '/blog',
      key: 'blog'
    },
    {
      icon: <MessageCircleIcon className='size-3.5' />,
      href: '/guestbook',
      key: 'guestbook'
    },
    {
      icon: <BarChartIcon className='size-3.5' />,
      href: '/dashboard',
      key: 'dashboard'
    },
    {
      icon: <FlameIcon className='size-3.5' />,
      href: '/projects',
      key: 'projects'
    },
    {
      icon: <UserCircle2Icon className='size-3.5' />,
      href: '/about',
      key: 'about'
    },
    {
      icon: <MonitorIcon className='size-3.5' />,
      href: '/uses',
      key: 'uses'
    }
  ] 




export const NAV_LINKS = [
  { href: "/user/guestbook", label: "Guestbook", icon: MessageCircle },
  { href: "/user/dashboard", label: "Dashboard", icon: BarChart3 },
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
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
  "Express", "MongoDB", "CSS", "Tailwind", "Redux",
  "GraphQL", "Firebase", "AWS", "Docker", "Python"
];