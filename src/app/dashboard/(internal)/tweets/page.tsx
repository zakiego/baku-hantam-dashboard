import { actionGetTopics } from "@/app/dashboard/(internal)/topics/actions";
import { actionGetTweets } from "@/app/dashboard/(internal)/tweets/actions";
import { TableCellActionTweet } from "@/app/dashboard/(internal)/tweets/components/button";
import { DialogAddTweet } from "@/app/dashboard/(internal)/tweets/components/modal";
import { Avatar } from "@/components/avatar";
import { BadgeButton } from "@/components/badge";
import { Heading } from "@/components/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import type { Metadata } from "next";

const TITLE = "Tweets";

export const metadata: Metadata = {
  title: TITLE,
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

export default async function Tweets() {
  const data = await actionGetTweets();
  const topics = await actionGetTopics();

  //   export const tweets = pgTable('tweets', {
  //   id: varchar('id', { length: 26 }).$defaultFn(ulid).primaryKey(),

  //   tweetId: text('tweet_id').notNull().unique(),
  //   tweetCreatedAt: text('tweet_created_at').notNull(),
  //   tweetText: text('tweet_text').notNull(),
  //   tweetUserId: text('tweet_user_id_str').notNull(),
  //   tweetUserName: text('tweet_user_name').notNull(),
  //   tweetUserScreenName: text('tweet_user_screen_name').notNull(),

  //   createdAt: timestamp('created_at').notNull().defaultNow(),
  //   updatedAt: timestamp('updated_at').notNull().defaultNow(),
  //   cachedAt: timestamp('cached_at').notNull().defaultNow(),
  //   topicId: varchar('topic_id', { length: 26 }),
  // })

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>{TITLE}</Heading>
        <DialogAddTweet topics={topics} />
      </div>
      <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Author</TableHeader>

            <TableHeader>Tweet</TableHeader>
            <TableHeader>Topic</TableHeader>
            {/* <TableHeader>Created At</TableHeader>
            <TableHeader>Updated At</TableHeader>
            <TableHeader>Cached At</TableHeader> */}
            <TableHeader className="relative w-0">
              <span className="sr-only">Actions</span>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((tweet) => (
            <TableRow key={tweet.tweetText} title={`Tweet #${tweet.tweetText}`}>
              <TableCell>
                <div className="flex">
                  <Avatar
                    src={tweet.tweetProfileImageUrl}
                    alt={tweet.tweetUserName}
                    className="size-6"
                  />
                  <div className="ml-2">{tweet.tweetUserScreenName}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="line-clamp-3 max-w-xs text-wrap">
                  {tweet.tweetText}
                </div>
              </TableCell>
              <TableCell>
                <div className="line-clamp-2 max-w-xs text-wrap break-all">
                  <BadgeButton href={`/dashboard/topics/${tweet.topic?.id}`}>
                    {tweet.topic?.title}
                  </BadgeButton>
                </div>
              </TableCell>
              {/* <TableCell>{tweet.tweetCreatedAt}</TableCell>
              <TableCell>{formatDate(tweet.updatedAt)}</TableCell>
              <TableCell>{formatDate(tweet.cachedAt)}</TableCell> */}
              <TableCell>
                <TableCellActionTweet id={tweet.tweetId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
