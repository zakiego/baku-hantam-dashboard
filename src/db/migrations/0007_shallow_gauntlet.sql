ALTER TABLE "topics" ADD COLUMN "is_public" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "tweets" ADD COLUMN "is_public" boolean DEFAULT true;