ALTER TABLE "tweets" ALTER COLUMN "tweet_created_at" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "tweet_data" json;