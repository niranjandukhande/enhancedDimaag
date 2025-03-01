import { contentType } from '@/types/content';
import { userType } from '@/types/userType';

export const dummyContent: contentType[] = [
  {
    id: 'c1',
    title: 'Introduction to React Hooks',
    typeOfContent: 'Tutorial',
    description:
      'Learn how to use React Hooks to simplify your functional components.',
    isPublic: true,
    link: 'https://www.youtube.com/watch?v=dpw9EHDh2bM',
    summary:
      'React Hooks are a powerful addition to React that allows you to use state and other React features in functional components. This tutorial covers useState, useEffect, useContext, and custom hooks with practical examples.',
  },
  {
    id: 'c2',
    title: 'Building a REST API with Node.js',
    typeOfContent: 'Course',
    description:
      'A comprehensive guide to building RESTful APIs using Node.js and Express.',
    isPublic: false,
    link: 'https://www.youtube.com/watch?v=fgTGADljAeg',
    summary:
      "This course walks through creating a complete REST API from scratch using Node.js, Express, and MongoDB. You'll learn about routes, controllers, middleware, authentication, and testing your API endpoints.",
  },
  {
    id: 'c3',
    title: 'Understanding TypeScript Generics',
    typeOfContent: 'Article',
    description: 'Deep dive into TypeScript generics with practical use cases.',
    isPublic: true,
    link: 'https://www.youtube.com/watch?v=nViEqpgwxHE',
    summary:
      'TypeScript generics provide a way to create reusable components that can work with a variety of types. This article explains how generics work, when to use them, and shows advanced patterns like constraints, defaults, and conditional types.',
  },
  {
    id: 'c4',
    title: 'Getting Started with Next.js',
    typeOfContent: 'Tutorial',
    description: 'Your first steps with the React framework for production.',
    isPublic: true,
    link: 'https://www.youtube.com/watch?v=mTz0GXj8NN0',
    summary:
      'Next.js provides a great developer experience with features like file-system routing, API routes, and built-in CSS support. This tutorial covers setting up a Next.js project, creating pages, navigation, and data fetching strategies.',
  },
  {
    id: 'c5',
    title: 'Mastering CSS Grid Layout',
    typeOfContent: 'Course',
    description: 'Learn to create complex layouts with CSS Grid',
    isPublic: false,
    link: 'https://www.youtube.com/watch?v=9zBsdzdE4sM',
    summary:
      'CSS Grid Layout is a two-dimensional layout system designed for user interface design. This course covers grid containers, grid items, placing items, responsive design with grid, and combining grid with flexbox.',
  },
  {
    id: 'c6',
    title: 'Introduction to Docker',
    typeOfContent: 'Workshop',
    description: 'Get up and running with containerization using Docker',
    isPublic: true,
    link: 'https://www.youtube.com/watch?v=gAkwW2tuIqE',
    summary:
      'Docker lets you package applications with their dependencies into standardized units for development and deployment. This workshop covers Docker concepts, creating Dockerfiles, managing containers, and using Docker Compose for multi-container applications.',
  },
];

export const dummyUsers: userType[] = [
  {
    id: 'u1',
    username: 'sarahj',
    clerkId: 'user_1',
    bio: 'Front-end developer passionate about UI/UX',
    imageUrl: 'https://i.pravatar.cc/150?img=1',
    email: 'sarah.johnson@example.com',
    createdAt: '2023-01-15T09:24:31Z',
    updatedAt: '2023-05-22T14:10:12Z',
  },
  {
    id: 'u2',
    username: 'mikechen',
    clerkId: 'user_2',
    bio: 'Full-stack developer | Open source contributor',
    imageUrl: 'https://i.pravatar.cc/150?img=2',
    email: 'mike.chen@example.com',
    createdAt: '2023-02-28T11:45:09Z',
    updatedAt: '2023-05-10T08:33:47Z',
  },
  {
    id: 'u3',
    username: 'emilyk',
    clerkId: 'user_3',
    bio: 'Backend engineer specializing in Node.js and databases',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
    email: 'emily.kim@example.com',
    createdAt: '2023-03-10T15:20:45Z',
    updatedAt: '2023-04-18T12:09:33Z',
  },
  {
    id: 'u4',
    username: 'javierm',
    clerkId: 'user_4',
    bio: 'DevOps engineer | Cloud architecture enthusiast',
    imageUrl: 'https://i.pravatar.cc/150?img=4',
    email: 'javier.martinez@example.com',
    createdAt: '2023-02-05T10:30:22Z',
    updatedAt: '2023-05-01T16:42:18Z',
  },
  {
    id: 'u5',
    username: 'alicial',
    clerkId: 'user_5',
    bio: 'UI designer and CSS wizard',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
    email: 'alicia.lee@example.com',
    createdAt: '2023-01-20T08:15:39Z',
    updatedAt: '2023-04-25T09:51:27Z',
  },
];

// Mapping of which users have access to which content
export const contentAccess = {
  c1: ['u2', 'u3'],
  c2: ['u1', 'u4', 'u5'],
  c3: ['u2'],
  c4: ['u3', 'u5'],
  c5: ['u1', 'u2', 'u3', 'u4'],
  c6: ['u4'],
};
