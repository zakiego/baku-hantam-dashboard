import { actionGetTopics } from '@/app/actions'
import { formatDate } from '@/app/utils/date'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import type { Metadata } from 'next'

const TITLE = 'Topics'

export const metadata: Metadata = {
  title: TITLE,
}

export default async function Topics() {
  let data = await actionGetTopics()

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>{TITLE}</Heading>
        <Button className="-my-0.5">Create topic</Button>
      </div>
      <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Title</TableHeader>
            <TableHeader>Slug</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Created at</TableHeader>
            <TableHeader>Updated at</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((topic) => (
            <TableRow key={topic.slug} href={`/topics/${topic.slug}`} title={`Topic #${topic.title}`}>
              <TableCell>{topic.title}</TableCell>
              <TableCell>{topic.slug}</TableCell>
              <TableCell className="text-wrap">{topic.description}</TableCell>
              <TableCell>{formatDate(topic.createdAt)}</TableCell>
              <TableCell>{formatDate(topic.updatedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
