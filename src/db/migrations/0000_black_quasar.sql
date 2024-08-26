CREATE TABLE IF NOT EXISTS "topics" (
	"id" varchar(25),
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tweets" (
	"id" varchar(25),
	"text" text NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"cached_at" timestamp DEFAULT now() NOT NULL,
	"topic_id" varchar(25)
);
