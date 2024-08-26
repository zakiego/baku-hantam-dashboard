import { actionGetTopicById } from "@/app/dashboard/topics/actions";
import { DialogEditTopic } from "@/app/dashboard/topics/components/add-topic";
import { ButtonDeleteTopic } from "@/app/dashboard/topics/components/button";
import { Avatar } from "@/components/avatar";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/description-list";
import { Divider } from "@/components/divider";
import { Heading, Subheading } from "@/components/heading";
import { Link } from "@/components/link";
import { Slug } from "@/components/slug";
import { getOrder } from "@/data";
import { formatDate } from "@/utils/date";
import {
  BanknotesIcon,
  CalendarIcon,
  ChevronLeftIcon,
  CreditCardIcon,
} from "@heroicons/react/16/solid";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RefundOrder } from "./refund";

export async function generateMetadata({
  params,
}: { params: { id: string } }): Promise<Metadata> {
  const topic = await actionGetTopicById(params.id);

  return {
    title: topic && `Topic: ${topic.title}`,
  };
}

export default async function Order({ params }: { params: { id: string } }) {
  const topic = await actionGetTopicById(params.id);

  if (!topic) {
    notFound();
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link
          href="/dashboard/topics"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Topics
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>Topic: {topic.title}</Heading>
          <Badge color="lime">Public</Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            {/* <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>100 likes</span>
            </span> */}
            {/* <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CreditCardIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span className="inline-flex gap-3">
                {order.payment.card.type}{" "}
                <span>
                  <span aria-hidden="true">••••</span>{" "}
                  {order.payment.card.number}
                </span>
              </span>
            </span> */}
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{formatDate(topic.createdAt)}</span>
            </span>
          </div>
          <div className="flex gap-4">
            {/* <RefundOrder outline amount={order.amount.usd}>
              Refund
            </RefundOrder> */}
            <ButtonDeleteTopic id={topic.id} />
            <DialogEditTopic data={topic} />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Summary</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>ID</DescriptionTerm>
          <DescriptionDetails>{topic.id}</DescriptionDetails>

          <DescriptionTerm>Title</DescriptionTerm>
          <DescriptionDetails>{topic.title}</DescriptionDetails>

          <DescriptionTerm>Slug</DescriptionTerm>
          <DescriptionDetails>
            <Slug href={`/dashboard/topics/${topic.id}`}>{topic.slug}</Slug>
          </DescriptionDetails>

          <DescriptionTerm>Description</DescriptionTerm>
          <DescriptionDetails>{topic.description}</DescriptionDetails>

          <DescriptionTerm>Created at</DescriptionTerm>
          <DescriptionDetails>{formatDate(topic.createdAt)}</DescriptionDetails>

          <DescriptionTerm>Updated at</DescriptionTerm>
          <DescriptionDetails>{formatDate(topic.updatedAt)}</DescriptionDetails>
        </DescriptionList>
      </div>
      {/* <div className="mt-12">
        <Subheading>Payment method</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Transaction ID</DescriptionTerm>
          <DescriptionDetails>{order.payment.transactionId}</DescriptionDetails>
          <DescriptionTerm>Card number</DescriptionTerm>
          <DescriptionDetails>
            •••• {order.payment.card.number}
          </DescriptionDetails>
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
              <img
                src={order.customer.countryFlagUrl}
                alt={order.customer.country}
              />
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
