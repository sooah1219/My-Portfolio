CREATE TYPE "public"."platform_enum" AS ENUM('Web', 'Mobile');--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"thumbnail" text NOT NULL,
	"tech_stack" text[] NOT NULL,
	"summary" text NOT NULL,
	"platform" "platform_enum" NOT NULL,
	"developed_at" text NOT NULL,
	"role" text NOT NULL,
	"contributions" text NOT NULL,
	"type" text NOT NULL,
	"live_url" text NOT NULL,
	"github_url" text NOT NULL,
	"images" text[] NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
