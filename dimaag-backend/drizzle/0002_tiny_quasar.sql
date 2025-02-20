ALTER TABLE "contents" ADD COLUMN "summary" text;--> statement-breakpoint
ALTER TABLE "contents" ADD COLUMN "embeddings" vector(768);