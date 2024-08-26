ALTER TABLE "tweets" DROP CONSTRAINT "tweets_url_unique";--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "tweet_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "tweet_created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "tweet_text" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "tweet_user_id_str" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "tweet_user_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "tweet_user_screen_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tweets" DROP COLUMN IF EXISTS "text";--> statement-breakpoint
ALTER TABLE "tweets" DROP COLUMN IF EXISTS "url";--> statement-breakpoint
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_tweet_id_unique" UNIQUE("tweet_id");