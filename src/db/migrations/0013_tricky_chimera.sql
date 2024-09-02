ALTER TABLE "tweets" ADD COLUMN "quoted_tweet user_id_str" text;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "quoted_tweet_user_name" text;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "quoted_tweet_user_screen_name" text;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "quoted_tweet_user_profile_image_url" text;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "quoted_tweet_text" text;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "quoted_tweet_created_at" text;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "quoted_tweet_id" text;