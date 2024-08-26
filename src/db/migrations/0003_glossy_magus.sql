ALTER TABLE "topics" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "topics" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tweets" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "tweets" ALTER COLUMN "id" SET NOT NULL;