import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: {
    name: string;
    href: string;
  };
  description: string;
  imageUrl: string;
  date: string;
  datetime: string;
  author: {
    name:string;
    role: string;
    href: string;
    imageUrl: string;
  };
  readingTime: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Serverless Banking: A Deep Dive',
    slug: 'future-of-serverless-banking',
    href: '/blog/future-of-serverless-banking',
    description:
      'Explore how serverless architecture is revolutionizing the financial industry, enabling unprecedented scalability, security, and cost-efficiency. We break down the core concepts and showcase real-world applications.',
    imageUrl: 'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: 'Mar 16, 2024',
    datetime: '2024-03-16',
    category: { name: 'Technology', href: '/blog/category/technology' },
    author: {
      name: 'Jane Doe',
      role: 'Lead Architect',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    readingTime: '6 min read',
  },
  {
    id: '2',
    title: 'AI-Powered Compliance: Navigating the Regulatory Maze',
    slug: 'ai-powered-compliance',
    href: '/blog/ai-powered-compliance',
    description:
      'Regulatory compliance is more complex than ever. Discover how our AI-driven tools provide real-time insights and automated checks to ensure your operations are always ahead of the curve.',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80',
    date: 'Mar 10, 2024',
    datetime: '2024-03-10',
    category: { name: 'Regulation', href: '/blog/category/regulation' },
    author: {
      name: 'John Smith',
      role: 'Compliance Officer',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    readingTime: '8 min read',
  },
  {
    id: '3',
    title: 'The Massive Landing Page: A New Paradigm in User Engagement',
    slug: 'massive-landing-page-paradigm',
    href: '/blog/massive-landing-page-paradigm',
    description:
      'Why build a single-page lander when you can build an entire ecosystem? We discuss our philosophy of creating deeply immersive, content-rich landing experiences that function as apps in themselves.',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3000&q=80',
    date: 'Feb 28, 2024',
    datetime: '2024-02-28',
    category: { name: 'Product', href: '/blog/category/product' },
    author: {
      name: 'Emily Carter',
      role: 'Head of Product',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    readingTime: '11 min read',
  },
];

const BlogIndexPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">From the Blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Insights, trends, and stories from the forefront of finance and technology.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {mockBlogPosts.map((post) => (
            <article
              key={post.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <img src={post.imageUrl} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <time dateTime={post.datetime} className="mr-8">
                  {post.date}
                </time>
                <div className="-ml-4 flex items-center gap-x-4">
                  <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <div className="flex gap-x-2.5">
                    <img src={post.author.imageUrl} alt="" className="h-6 w-6 flex-none rounded-full bg-white/10" />
                    {post.author.name}
                  </div>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <Link to={`/blog/${post.slug}`}>
                  <span className="absolute inset-0" />
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-gray-300">{post.description}</p>
              <div className="mt-4">
                <Link to={`/blog/${post.slug}`} className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center">
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogIndexPage;