DO $$ BEGIN
 CREATE TYPE "public"."user_level" AS ENUM('super', 'admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "level" "user_level" DEFAULT 'user' NOT NULL;