import { Avatar } from '@/components/avatar'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getRecentOrders } from '@/data'

// export function Stat({ title, value, change }: { title: string; value: string; change: string }) {
//   return (
//     <div>
//       <Divider />
//       <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
//       <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
//       <div className="mt-3 text-sm/6 sm:text-xs/6">
//         <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
//         <span className="text-zinc-500">from last week</span>
//       </div>
//     </div>
//   )
// }

export default async function Home() {
  const orders = await getRecentOrders()

  // const passwd = await saltAndHashPassword('passwod')
  // await dbClient.insert(dbSchema.users).values({
  //   name: 'Zakiego',
  //   username: 'zakiego',
  //   password: passwd,
  //   level: 'super',
  //   isVerified: true,
  // })

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Dashboard</Heading>
      </div>

      {/* <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total revenue" value="$2.6M" change="+4.5%" />
        <Stat title="Average order value" value="$455" change="-0.5%" />
        <Stat title="Tickets sold" value="5,888" change="+4.5%" />
        <Stat title="Pageviews" value="823,067" change="+21.2%" />
      </div>
      <Subheading className="mt-14">Recent orders</Subheading> */}
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Event</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={order.event.thumbUrl} className="size-6" />
                  <span>{order.event.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">US{order.amount.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
