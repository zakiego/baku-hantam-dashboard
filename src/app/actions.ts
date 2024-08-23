'use server'

export const actionAddTweet = async () => {
  return 'Successfully added tweet'
}

type Topic = {
  title: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
  countTweets: number
}

export const actionGetTopics = async () => {
  const data: Topic[] = [
    {
      title: 'JavaScript Tips',
      slug: 'javascript-tips',
      description: 'Latest tips and tricks on JavaScript to improve your coding skills.',
      createdAt: '2024-08-01T10:30:00Z',
      updatedAt: '2024-08-15T12:00:00Z',
      countTweets: 120,
    },
    {
      title: 'Web Development',
      slug: 'web-development',
      description: 'All about the latest trends and technologies in web development.',
      createdAt: '2024-07-20T08:15:00Z',
      updatedAt: '2024-08-18T09:45:00Z',
      countTweets: 250,
    },
    {
      title: 'TypeScript Mastery',
      slug: 'typescript-mastery',
      description: 'Deep dive into TypeScript for better type safety and cleaner code.',
      createdAt: '2024-06-25T11:00:00Z',
      updatedAt: '2024-08-12T14:30:00Z',
      countTweets: 95,
    },
    {
      title: 'React Hooks',
      slug: 'react-hooks',
      description: 'Learn how to use React Hooks effectively in your projects.',
      createdAt: '2024-07-05T09:45:00Z',
      updatedAt: '2024-08-20T16:10:00Z',
      countTweets: 180,
    },
    {
      title: 'OpenTelemetry',
      slug: 'opentelemetry',
      description: 'Best practices for setting up tracing and monitoring with OpenTelemetry.',
      createdAt: '2024-07-30T14:20:00Z',
      updatedAt: '2024-08-21T17:50:00Z',
      countTweets: 75,
    },
  ]

  return data
}

type Tweet = {
  content: string
  link: string
  author: string
  topic: {
    id: number
    slug: string
    title: string
  }
}

export const actionGetTweets = async () => {
  const tweets: Tweet[] = [
    {
      content: 'Mastering closures in JavaScript can significantly improve your code!',
      link: 'https://twitter.com/user1/status/12345',
      author: 'js_dev_guru',
      topic: {
        id: 1,
        slug: 'javascript-tips',
        title: 'JavaScript Tips',
      },
    },
    {
      content: 'React Hooks are a game changer for managing state and side effects!',
      link: 'https://twitter.com/user2/status/23456',
      author: 'react_enthusiast',
      topic: {
        id: 2,
        slug: 'react-hooks',
        title: 'React Hooks',
      },
    },
    {
      content: "TypeScript's strict type system helps you catch bugs early. It's a must for large projects.",
      link: 'https://twitter.com/user3/status/34567',
      author: 'typescript_master',
      topic: {
        id: 3,
        slug: 'typescript-mastery',
        title: 'TypeScript Mastery',
      },
    },
    {
      content: 'OpenTelemetry makes it easy to add observability to your distributed systems.',
      link: 'https://twitter.com/user4/status/45678',
      author: 'otel_expert',
      topic: {
        id: 4,
        slug: 'opentelemetry',
        title: 'OpenTelemetry',
      },
    },
    {
      content: 'Responsive design is key to building modern web applications. Flexbox and Grid are your best friends!',
      link: 'https://twitter.com/user5/status/56789',
      author: 'web_dev_pro',
      topic: {
        id: 5,
        slug: 'web-development',
        title: 'Web Development',
      },
    },
  ]

  return tweets
}
