import { actionGetTweets } from '@/app/actions'
import { trimUrl } from '@/app/utils/twitter'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import type { Metadata } from 'next'

const TITLE = 'Tweets'

export const metadata: Metadata = {
  title: TITLE,
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

export default async function Tweets() {
  let data = await actionGetTweets()

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>{TITLE}</Heading>
        <Button className="-my-0.5">Create tweet</Button>
      </div>
      <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Content</TableHeader>
            <TableHeader>Link</TableHeader>
            <TableHeader>Author</TableHeader>
            <TableHeader>Topic</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((tweet) => (
            <TableRow key={tweet.content} href={tweet.link} title={`Tweet #${tweet.content}`}>
              <TableCell className="text-wrap">{tweet.content}</TableCell>
              <TableCell>{trimUrl(tweet.link)}</TableCell>
              <TableCell>{tweet.author}</TableCell>
              <TableCell>{tweet.topic.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
