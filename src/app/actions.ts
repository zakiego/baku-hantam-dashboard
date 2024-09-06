"use server";

export const actionAddTweet = async () => {
  return "Successfully added tweet";
};

type Tweet = {
  content: string;
  link: string;
  author: string;
  topic: {
    id: number;
    slug: string;
    title: string;
  };
};

export const actionGetTweets = async () => {
  const tweets: Tweet[] = [
    {
      content:
        "Mastering closures in JavaScript can significantly improve your code!",
      link: "https://twitter.com/user1/status/12345",
      author: "js_dev_guru",
      topic: {
        id: 1,
        slug: "javascript-tips",
        title: "JavaScript Tips",
      },
    },
    {
      content:
        "React Hooks are a game changer for managing state and side effects!",
      link: "https://twitter.com/user2/status/23456",
      author: "react_enthusiast",
      topic: {
        id: 2,
        slug: "react-hooks",
        title: "React Hooks",
      },
    },
    {
      content:
        "TypeScript's strict type system helps you catch bugs early. It's a must for large projects.",
      link: "https://twitter.com/user3/status/34567",
      author: "typescript_master",
      topic: {
        id: 3,
        slug: "typescript-mastery",
        title: "TypeScript Mastery",
      },
    },
    {
      content:
        "OpenTelemetry makes it easy to add observability to your distributed systems.",
      link: "https://twitter.com/user4/status/45678",
      author: "otel_expert",
      topic: {
        id: 4,
        slug: "opentelemetry",
        title: "OpenTelemetry",
      },
    },
    {
      content:
        "Responsive design is key to building modern web applications. Flexbox and Grid are your best friends!",
      link: "https://twitter.com/user5/status/56789",
      author: "web_dev_pro",
      topic: {
        id: 5,
        slug: "web-development",
        title: "Web Development",
      },
    },
  ];

  return tweets;
};
