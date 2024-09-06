import { actionGetTweetByTweetId } from "@/app/dashboard/(internal)/tweets/actions";
import { ButtonUpdateTweet } from "@/app/dashboard/(internal)/tweets/components/button";
import { Avatar } from "@/components/avatar";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/description-list";
import { Divider } from "@/components/divider";
import { Heading, Subheading } from "@/components/heading";
import { Link } from "@/components/link";
import { formatDate } from "@/utils/date";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmbeddedTweet } from "react-tweet";
import type { Tweet } from "react-tweet/api";
export async function generateMetadata({
  params,
}: { params: { id: string } }): Promise<Metadata> {
  const tweet = await actionGetTweetByTweetId(params.id);

  return {
    title: tweet && `Tweet by ${tweet.tweetUserScreenName}`,
  };
}

export default async function Order({ params }: { params: { id: string } }) {
  const tweet = await actionGetTweetByTweetId(params.id);

  if (!tweet) {
    notFound();
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link
          href="/dashboard/tweets"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Tweets
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>Tweet by @{tweet.tweetUserScreenName}</Heading>
          {/* <Badge color="lime">Successful</Badge> */}
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            {/* <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>US{order.amount.usd}</span>
            </span> */}
            {/* <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CreditCardIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span className="inline-flex gap-3">
                {order.payment.card.type}{' '}
                <span>
                  <span aria-hidden="true">••••</span> {order.payment.card.number}
                </span>
              </span>
            </span> */}
            {/* <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{order.date}</span>
            </span> */}
          </div>
          <div className="flex gap-4">
            {/* <RefundOrder outline amount={order.amount.usd}>
              Refund
            </RefundOrder> */}
            <ButtonUpdateTweet tweetId={tweet.tweetId} />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Summary</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Author</DescriptionTerm>
          <DescriptionDetails>
            <div className="flex">
              <Avatar
                src={tweet.tweetProfileImageUrl}
                alt={tweet.tweetUserName}
                className="size-6"
              />
              <p className="ml-2">{tweet.tweetUserName}</p>
            </div>
          </DescriptionDetails>
          <DescriptionTerm>Screen Name</DescriptionTerm>
          <DescriptionDetails>@{tweet.tweetUserScreenName}</DescriptionDetails>

          <DescriptionTerm>Text</DescriptionTerm>
          <DescriptionDetails>{tweet.tweetText}</DescriptionDetails>
          <DescriptionTerm>Link</DescriptionTerm>
          <DescriptionDetails>
            <Link
              href={`https://twitter.com/${tweet.tweetUserScreenName}/status/${tweet.tweetId}`}
            >
              View tweet
            </Link>
          </DescriptionDetails>

          <DescriptionTerm>Topic</DescriptionTerm>
          <DescriptionDetails>
            <Link href={`/dashboard/topics/${tweet.topic?.id}`}>
              {tweet.topic?.title}
            </Link>
          </DescriptionDetails>

          <DescriptionTerm>Updated At</DescriptionTerm>
          <DescriptionDetails>
            {formatDate(tweet.updatedAt, {
              time: true,
            })}
          </DescriptionDetails>

          <DescriptionTerm>Created At</DescriptionTerm>
          <DescriptionDetails>
            {formatDate(tweet.createdAt, {
              time: true,
            })}
          </DescriptionDetails>

          <DescriptionTerm>Cached At</DescriptionTerm>
          <DescriptionDetails>
            {formatDate(tweet.cachedAt, {
              time: true,
            })}
          </DescriptionDetails>

          <DescriptionTerm>Preview</DescriptionTerm>
          <DescriptionDetails>
            <EmbeddedTweet tweet={tweet.tweetData as Tweet} />
          </DescriptionDetails>

          <DescriptionTerm>Data</DescriptionTerm>
          <DescriptionDetails>
            <div className="break-all rounded-md bg-zinc-900 px-5 py-5 text-xs leading-relaxed">
              <code className="text-white">
                {JSON.stringify(tweet.tweetData, null, 2)}
              </code>
            </div>
          </DescriptionDetails>
        </DescriptionList>
      </div>
      {/* <div className="mt-12">
        <Subheading>Payment method</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Transaction ID</DescriptionTerm>
          <DescriptionDetails>{order.payment.transactionId}</DescriptionDetails>
          <DescriptionTerm>Card number</DescriptionTerm>
          <DescriptionDetails>•••• {order.payment.card.number}</DescriptionDetails>
          <DescriptionTerm>Card type</DescriptionTerm>
          <DescriptionDetails>{order.payment.card.type}</DescriptionDetails>
          <DescriptionTerm>Card expiry</DescriptionTerm>
          <DescriptionDetails>{order.payment.card.expiry}</DescriptionDetails>
          <DescriptionTerm>Owner</DescriptionTerm>
          <DescriptionDetails>{order.customer.name}</DescriptionDetails>
          <DescriptionTerm>Email address</DescriptionTerm>
          <DescriptionDetails>{order.customer.email}</DescriptionDetails>
          <DescriptionTerm>Address</DescriptionTerm>
          <DescriptionDetails>{order.customer.address}</DescriptionDetails>
          <DescriptionTerm>Country</DescriptionTerm>
          <DescriptionDetails>
            <span className="inline-flex gap-3">
              <img src={order.customer.countryFlagUrl} alt={order.customer.country} />
              {order.customer.country}
            </span>
          </DescriptionDetails>
          <DescriptionTerm>CVC</DescriptionTerm>
          <DescriptionDetails>
            <Badge color="lime">Passed successfully</Badge>
          </DescriptionDetails>
        </DescriptionList>
      </div> */}
    </>
  );
}
