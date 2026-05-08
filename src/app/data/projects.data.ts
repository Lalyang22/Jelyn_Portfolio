import { Project } from '../models/portfolio.models';

export const PROJECTS: Project[] = [
  {
    title: 'Cirquolus Landing Page',
    description:
      'Built a responsive Angular landing page for an ERP platform covering HRIS, POS, CRM, and analytics modules. Developed reusable UI components, optimised performance across devices, and applied modern UI/UX practices to improve engagement and layout clarity. Delivered within a 1-month development cycle.',
    tags: ['Angular', 'Tailwind CSS', 'TypeScript', 'UI/UX'],
    demoUrl: 'https://cirquolus.example.com',
    repoUrl: 'https://github.com/example/cirquolus',
    imageUrl: 'https://placehold.co/600x400/fde2e4/2d2d2d?text=Cirquolus',
  },
  {
    title: 'Hándum Beach Resort Booking',
    description:
      'Developed a responsive booking system for villa reservations. Designed an intuitive UI for the booking flow, calendar, and user interactions. Implemented dynamic features for real-time availability. Completed within a 3-week development cycle.',
    tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    demoUrl: 'https://handum-resort.example.com',
    repoUrl: 'https://github.com/example/handum-resort',
    imageUrl: 'https://placehold.co/600x400/e2ebdd/2d2d2d?text=Hándum+Resort',
  },
  {
    title: 'Family Feud Web Game',
    description:
      'Developed an interactive web-based Family Feud game for the CTU Nite Game Show. Implemented real-time communication using WebSockets and JavaScript for live audience participation.',
    tags: ['JavaScript', 'WebSockets', 'HTML', 'CSS'],
    demoUrl: 'https://family-feud.example.com',
    repoUrl: 'https://github.com/example/family-feud',
    imageUrl: 'https://placehold.co/600x400/e2e2e2/2d2d2d?text=Family+Feud',
  },
  {
    title: 'POS Inventory System',
    description:
      'Built a full-stack point-of-sale and inventory management system with real-time stock updates, role-based access control, and automated sales reporting.',
    tags: ['React', 'Django', 'MySQL', 'REST APIs'],
    demoUrl: 'https://pos-inventory.example.com',
    repoUrl: 'https://github.com/example/pos-inventory',
    imageUrl: 'https://placehold.co/600x400/fde68a/2d2d2d?text=POS+Inventory',
  },
];
