import { BarChartIcon, FlameIcon, MessageCircleIcon, MonitorIcon, PencilIcon, UserCircle2Icon, UserCircleIcon } from "lucide-react";

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