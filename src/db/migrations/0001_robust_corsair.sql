ALTER TABLE "topics" ALTER COLUMN "id" SET DATA TYPE varchar(26);--> statement-breakpoint
ALTER TABLE "tweets" ALTER COLUMN "id" SET DATA TYPE varchar(26);--> statement-breakpoint
ALTER TABLE "tweets" ALTER COLUMN "topic_id" SET DATA TYPE varchar(26);