ALTER TABLE "topics" ADD CONSTRAINT "topics_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_url_unique" UNIQUE("url");