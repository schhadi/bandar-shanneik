import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'de');
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_link_icon" AS ENUM('none', 'scale', 'book', 'arrow', 'download');
  CREATE TYPE "public"."enum_pages_blocks_hero_ctas_link_variant" AS ENUM('primary', 'outline', 'plain');
  CREATE TYPE "public"."enum_pages_blocks_hero_image_style" AS ENUM('rounded', 'sharp', 'circle');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_background_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_background_cta_link_icon" AS ENUM('none', 'scale', 'book', 'arrow', 'download');
  CREATE TYPE "public"."enum_pages_blocks_background_cta_link_variant" AS ENUM('primary', 'outline', 'plain');
  CREATE TYPE "public"."enum_pages_blocks_education_jurisdictions_jurisdictions_icon" AS ENUM('bank', 'wig', 'skyline', 'flag');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_cta_link_icon" AS ENUM('none', 'scale', 'book', 'arrow', 'download');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_cta_link_variant" AS ENUM('primary', 'outline', 'plain');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_background" AS ENUM('forest', 'cream', 'gold');
  CREATE TYPE "public"."enum_pages_blocks_research_timeline_manual_items_kind" AS ENUM('peer-reviewed', 'book-chapter', 'legal-article', 'working-paper', 'other');
  CREATE TYPE "public"."enum_pages_blocks_research_timeline_mode" AS ENUM('collection', 'manual');
  CREATE TYPE "public"."enum_publications_kind" AS ENUM('peer-reviewed', 'book-chapter', 'legal-article', 'working-paper', 'other');
  CREATE TYPE "public"."enum_submissions_status" AS ENUM('new', 'replied', 'archived');
  CREATE TYPE "public"."enum_header_nav_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_header_nav_link_icon" AS ENUM('none', 'scale', 'book', 'arrow', 'download');
  CREATE TYPE "public"."enum_header_nav_link_variant" AS ENUM('primary', 'outline', 'plain');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_footer_columns_links_link_icon" AS ENUM('none', 'scale', 'book', 'arrow', 'download');
  CREATE TYPE "public"."enum_footer_columns_links_link_variant" AS ENUM('primary', 'outline', 'plain');
  CREATE TYPE "public"."enum_footer_bottom_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_footer_bottom_links_link_icon" AS ENUM('none', 'scale', 'book', 'arrow', 'download');
  CREATE TYPE "public"."enum_footer_bottom_links_link_variant" AS ENUM('primary', 'outline', 'plain');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_ctas_link_type" DEFAULT 'internal',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_icon" "enum_pages_blocks_hero_ctas_link_icon" DEFAULT 'none',
  	"link_variant" "enum_pages_blocks_hero_ctas_link_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero_ctas_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_style" "enum_pages_blocks_hero_image_style" DEFAULT 'rounded',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"alignment" "enum_pages_blocks_rich_text_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_locales" (
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_background_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_background_cta_link_type" DEFAULT 'internal',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_icon" "enum_pages_blocks_background_cta_link_icon" DEFAULT 'none',
  	"link_variant" "enum_pages_blocks_background_cta_link_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_background_cta_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_background" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_background_locales" (
  	"heading" varchar DEFAULT 'Background',
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_education_jurisdictions_education" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_education_jurisdictions_education_locales" (
  	"institution" varchar NOT NULL,
  	"detail" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_education_jurisdictions_jurisdictions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_education_jurisdictions_jurisdictions_icon" DEFAULT 'bank'
  );
  
  CREATE TABLE "pages_blocks_education_jurisdictions_jurisdictions_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_education_jurisdictions_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_education_jurisdictions_languages_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_education_jurisdictions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_education_jurisdictions_locales" (
  	"heading" varchar DEFAULT 'Education & Jurisdictions',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_cards_cards_locales" (
  	"title" varchar NOT NULL,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_cards_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_practice_areas_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_practice_areas_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_practice_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_practice_areas_locales" (
  	"heading" varchar DEFAULT 'Practice Areas',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_banner_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_banner_cta_link_type" DEFAULT 'internal',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_icon" "enum_pages_blocks_cta_banner_cta_link_icon" DEFAULT 'none',
  	"link_variant" "enum_pages_blocks_cta_banner_cta_link_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_cta_banner_cta_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_cta_banner_background" DEFAULT 'forest',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_banner_locales" (
  	"heading" varchar NOT NULL,
  	"subtext" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_research_timeline_manual_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"kind" "enum_pages_blocks_research_timeline_manual_items_kind" DEFAULT 'peer-reviewed'
  );
  
  CREATE TABLE "pages_blocks_research_timeline_manual_items_locales" (
  	"title" varchar,
  	"venue" varchar,
  	"status" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_research_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_pages_blocks_research_timeline_mode" DEFAULT 'collection',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_research_timeline_locales" (
  	"heading" varchar DEFAULT 'Selected Publications',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_research_profile_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_research_profile_card_locales" (
  	"heading" varchar DEFAULT 'Research Profile',
  	"role" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tag_boxes_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tag_boxes_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tag_boxes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tag_boxes_locales" (
  	"heading" varchar DEFAULT 'Areas of Interest',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar,
  	"phone" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_locales" (
  	"heading" varchar DEFAULT 'Get in touch',
  	"intro" varchar,
  	"address" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar,
  	"show_subject" boolean DEFAULT true,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_locales" (
  	"heading" varchar DEFAULT 'Get in touch',
  	"intro" varchar,
  	"success_message" varchar DEFAULT 'Thank you. Your message has been sent.',
  	"submit_label" varchar DEFAULT 'Send message',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"publications_id" integer
  );
  
  CREATE TABLE "publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"kind" "enum_publications_kind" DEFAULT 'peer-reviewed',
  	"doi" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "publications_locales" (
  	"title" varchar NOT NULL,
  	"venue" varchar,
  	"status" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"subject" varchar,
  	"message" varchar NOT NULL,
  	"meta_locale" varchar,
  	"meta_page_slug" varchar,
  	"meta_user_agent" varchar,
  	"status" "enum_submissions_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"publications_id" integer,
  	"submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_link_type" DEFAULT 'internal',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_icon" "enum_header_nav_link_icon" DEFAULT 'none',
  	"link_variant" "enum_header_nav_link_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "header_nav_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_image_id" integer,
  	"show_language_switcher" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"logo_text" varchar DEFAULT 'Bandar Shanneik',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'internal',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_icon" "enum_footer_columns_links_link_icon" DEFAULT 'none',
  	"link_variant" "enum_footer_columns_links_link_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "footer_columns_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_columns_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_bottom_links_link_type" DEFAULT 'internal',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_new_tab" boolean,
  	"link_icon" "enum_footer_bottom_links_link_icon" DEFAULT 'none',
  	"link_variant" "enum_footer_bottom_links_link_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "footer_bottom_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"brand_name" varchar DEFAULT 'Bandar Shanneik',
  	"tagline" varchar DEFAULT 'Cross-border legal consultancy across the Middle East and Europe',
  	"copyright" varchar DEFAULT '© 2026 Bandar Shanneik. All rights reserved.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"default_meta_og_image_id" integer,
  	"colors_background" varchar DEFAULT '#F5EFE4',
  	"colors_primary" varchar DEFAULT '#1F3A2F',
  	"colors_accent" varchar DEFAULT '#B5985A',
  	"colors_top_bar" varchar DEFAULT '#8B1F6E',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"site_name" varchar DEFAULT 'Bandar Shanneik',
  	"default_meta_title" varchar,
  	"default_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_ctas" ADD CONSTRAINT "pages_blocks_hero_ctas_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_ctas" ADD CONSTRAINT "pages_blocks_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_ctas_locales" ADD CONSTRAINT "pages_blocks_hero_ctas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_ctas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_locales" ADD CONSTRAINT "pages_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_background_cta" ADD CONSTRAINT "pages_blocks_background_cta_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_background_cta" ADD CONSTRAINT "pages_blocks_background_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_background"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_background_cta_locales" ADD CONSTRAINT "pages_blocks_background_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_background_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_background" ADD CONSTRAINT "pages_blocks_background_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_background" ADD CONSTRAINT "pages_blocks_background_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_background_locales" ADD CONSTRAINT "pages_blocks_background_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_background"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_education_jurisdictions_education" ADD CONSTRAINT "pages_blocks_education_jurisdictions_education_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_education_jurisdictions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_education_jurisdictions_education_locales" ADD CONSTRAINT "pages_blocks_education_jurisdictions_education_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_education_jurisdictions_education"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_education_jurisdictions_jurisdictions" ADD CONSTRAINT "pages_blocks_education_jurisdictions_jurisdictions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_education_jurisdictions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_education_jurisdictions_jurisdictions_locales" ADD CONSTRAINT "pages_blocks_education_jurisdictions_jurisdictions_locale_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_education_jurisdictions_jurisdictions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_education_jurisdictions_languages" ADD CONSTRAINT "pages_blocks_education_jurisdictions_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_education_jurisdictions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_education_jurisdictions_languages_locales" ADD CONSTRAINT "pages_blocks_education_jurisdictions_languages_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_education_jurisdictions_languages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_education_jurisdictions" ADD CONSTRAINT "pages_blocks_education_jurisdictions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_education_jurisdictions_locales" ADD CONSTRAINT "pages_blocks_education_jurisdictions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_education_jurisdictions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_cards" ADD CONSTRAINT "pages_blocks_service_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_cards_locales" ADD CONSTRAINT "pages_blocks_service_cards_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_cards_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards" ADD CONSTRAINT "pages_blocks_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_cards_locales" ADD CONSTRAINT "pages_blocks_service_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_practice_areas_items" ADD CONSTRAINT "pages_blocks_practice_areas_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_practice_areas_items_locales" ADD CONSTRAINT "pages_blocks_practice_areas_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_practice_areas_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_practice_areas" ADD CONSTRAINT "pages_blocks_practice_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_practice_areas_locales" ADD CONSTRAINT "pages_blocks_practice_areas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_practice_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner_cta" ADD CONSTRAINT "pages_blocks_cta_banner_cta_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner_cta" ADD CONSTRAINT "pages_blocks_cta_banner_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner_cta_locales" ADD CONSTRAINT "pages_blocks_cta_banner_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_banner_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner_locales" ADD CONSTRAINT "pages_blocks_cta_banner_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_research_timeline_manual_items" ADD CONSTRAINT "pages_blocks_research_timeline_manual_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_research_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_research_timeline_manual_items_locales" ADD CONSTRAINT "pages_blocks_research_timeline_manual_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_research_timeline_manual_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_research_timeline" ADD CONSTRAINT "pages_blocks_research_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_research_timeline_locales" ADD CONSTRAINT "pages_blocks_research_timeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_research_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_research_profile_card" ADD CONSTRAINT "pages_blocks_research_profile_card_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_research_profile_card" ADD CONSTRAINT "pages_blocks_research_profile_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_research_profile_card_locales" ADD CONSTRAINT "pages_blocks_research_profile_card_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_research_profile_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tag_boxes_items" ADD CONSTRAINT "pages_blocks_tag_boxes_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tag_boxes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tag_boxes_items_locales" ADD CONSTRAINT "pages_blocks_tag_boxes_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tag_boxes_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tag_boxes" ADD CONSTRAINT "pages_blocks_tag_boxes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tag_boxes_locales" ADD CONSTRAINT "pages_blocks_tag_boxes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tag_boxes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_locales" ADD CONSTRAINT "pages_blocks_contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_locales" ADD CONSTRAINT "pages_blocks_contact_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_locales" ADD CONSTRAINT "publications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_submissions_fk" FOREIGN KEY ("submissions_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav" ADD CONSTRAINT "header_nav_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav" ADD CONSTRAINT "header_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_locales" ADD CONSTRAINT "header_nav_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links_locales" ADD CONSTRAINT "footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_locales" ADD CONSTRAINT "footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_links_locales" ADD CONSTRAINT "footer_bottom_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_bottom_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_meta_og_image_id_media_id_fk" FOREIGN KEY ("default_meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_ctas_order_idx" ON "pages_blocks_hero_ctas" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_ctas_parent_id_idx" ON "pages_blocks_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_ctas_link_link_page_idx" ON "pages_blocks_hero_ctas" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_ctas_locales_locale_parent_id_unique" ON "pages_blocks_hero_ctas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_rich_text_locales_locale_parent_id_unique" ON "pages_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_background_cta_order_idx" ON "pages_blocks_background_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_background_cta_parent_id_idx" ON "pages_blocks_background_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_background_cta_link_link_page_idx" ON "pages_blocks_background_cta" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "pages_blocks_background_cta_locales_locale_parent_id_unique" ON "pages_blocks_background_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_background_order_idx" ON "pages_blocks_background" USING btree ("_order");
  CREATE INDEX "pages_blocks_background_parent_id_idx" ON "pages_blocks_background" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_background_path_idx" ON "pages_blocks_background" USING btree ("_path");
  CREATE INDEX "pages_blocks_background_image_idx" ON "pages_blocks_background" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_background_locales_locale_parent_id_unique" ON "pages_blocks_background_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_education_jurisdictions_education_order_idx" ON "pages_blocks_education_jurisdictions_education" USING btree ("_order");
  CREATE INDEX "pages_blocks_education_jurisdictions_education_parent_id_idx" ON "pages_blocks_education_jurisdictions_education" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_education_jurisdictions_education_locales_local" ON "pages_blocks_education_jurisdictions_education_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_education_jurisdictions_jurisdictions_order_idx" ON "pages_blocks_education_jurisdictions_jurisdictions" USING btree ("_order");
  CREATE INDEX "pages_blocks_education_jurisdictions_jurisdictions_parent_id_idx" ON "pages_blocks_education_jurisdictions_jurisdictions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_education_jurisdictions_jurisdictions_locales_l" ON "pages_blocks_education_jurisdictions_jurisdictions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_education_jurisdictions_languages_order_idx" ON "pages_blocks_education_jurisdictions_languages" USING btree ("_order");
  CREATE INDEX "pages_blocks_education_jurisdictions_languages_parent_id_idx" ON "pages_blocks_education_jurisdictions_languages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_education_jurisdictions_languages_locales_local" ON "pages_blocks_education_jurisdictions_languages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_education_jurisdictions_order_idx" ON "pages_blocks_education_jurisdictions" USING btree ("_order");
  CREATE INDEX "pages_blocks_education_jurisdictions_parent_id_idx" ON "pages_blocks_education_jurisdictions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_education_jurisdictions_path_idx" ON "pages_blocks_education_jurisdictions" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_education_jurisdictions_locales_locale_parent_i" ON "pages_blocks_education_jurisdictions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_service_cards_cards_order_idx" ON "pages_blocks_service_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_cards_cards_parent_id_idx" ON "pages_blocks_service_cards_cards" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_service_cards_cards_locales_locale_parent_id_un" ON "pages_blocks_service_cards_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_service_cards_order_idx" ON "pages_blocks_service_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_cards_parent_id_idx" ON "pages_blocks_service_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_cards_path_idx" ON "pages_blocks_service_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_service_cards_locales_locale_parent_id_unique" ON "pages_blocks_service_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_practice_areas_items_order_idx" ON "pages_blocks_practice_areas_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_practice_areas_items_parent_id_idx" ON "pages_blocks_practice_areas_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_practice_areas_items_locales_locale_parent_id_u" ON "pages_blocks_practice_areas_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_practice_areas_order_idx" ON "pages_blocks_practice_areas" USING btree ("_order");
  CREATE INDEX "pages_blocks_practice_areas_parent_id_idx" ON "pages_blocks_practice_areas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_practice_areas_path_idx" ON "pages_blocks_practice_areas" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_practice_areas_locales_locale_parent_id_unique" ON "pages_blocks_practice_areas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_banner_cta_order_idx" ON "pages_blocks_cta_banner_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_banner_cta_parent_id_idx" ON "pages_blocks_cta_banner_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_banner_cta_link_link_page_idx" ON "pages_blocks_cta_banner_cta" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_banner_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_banner_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_banner_order_idx" ON "pages_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_banner_parent_id_idx" ON "pages_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_banner_path_idx" ON "pages_blocks_cta_banner" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cta_banner_locales_locale_parent_id_unique" ON "pages_blocks_cta_banner_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_research_timeline_manual_items_order_idx" ON "pages_blocks_research_timeline_manual_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_research_timeline_manual_items_parent_id_idx" ON "pages_blocks_research_timeline_manual_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_research_timeline_manual_items_locales_locale_p" ON "pages_blocks_research_timeline_manual_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_research_timeline_order_idx" ON "pages_blocks_research_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_research_timeline_parent_id_idx" ON "pages_blocks_research_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_research_timeline_path_idx" ON "pages_blocks_research_timeline" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_research_timeline_locales_locale_parent_id_uniq" ON "pages_blocks_research_timeline_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_research_profile_card_order_idx" ON "pages_blocks_research_profile_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_research_profile_card_parent_id_idx" ON "pages_blocks_research_profile_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_research_profile_card_path_idx" ON "pages_blocks_research_profile_card" USING btree ("_path");
  CREATE INDEX "pages_blocks_research_profile_card_logo_idx" ON "pages_blocks_research_profile_card" USING btree ("logo_id");
  CREATE UNIQUE INDEX "pages_blocks_research_profile_card_locales_locale_parent_id_" ON "pages_blocks_research_profile_card_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_tag_boxes_items_order_idx" ON "pages_blocks_tag_boxes_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_tag_boxes_items_parent_id_idx" ON "pages_blocks_tag_boxes_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_tag_boxes_items_locales_locale_parent_id_unique" ON "pages_blocks_tag_boxes_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_tag_boxes_order_idx" ON "pages_blocks_tag_boxes" USING btree ("_order");
  CREATE INDEX "pages_blocks_tag_boxes_parent_id_idx" ON "pages_blocks_tag_boxes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tag_boxes_path_idx" ON "pages_blocks_tag_boxes" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_tag_boxes_locales_locale_parent_id_unique" ON "pages_blocks_tag_boxes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_contact_locales_locale_parent_id_unique" ON "pages_blocks_contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_image_idx" ON "pages_blocks_contact_form" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_form_locales_locale_parent_id_unique" ON "pages_blocks_contact_form_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages" USING btree ("seo_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_publications_id_idx" ON "pages_rels" USING btree ("publications_id");
  CREATE INDEX "publications_updated_at_idx" ON "publications" USING btree ("updated_at");
  CREATE INDEX "publications_created_at_idx" ON "publications" USING btree ("created_at");
  CREATE UNIQUE INDEX "publications_locales_locale_parent_id_unique" ON "publications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "submissions_updated_at_idx" ON "submissions" USING btree ("updated_at");
  CREATE INDEX "submissions_created_at_idx" ON "submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("publications_id");
  CREATE INDEX "payload_locked_documents_rels_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_order_idx" ON "header_nav" USING btree ("_order");
  CREATE INDEX "header_nav_parent_id_idx" ON "header_nav" USING btree ("_parent_id");
  CREATE INDEX "header_nav_link_link_page_idx" ON "header_nav" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "header_nav_locales_locale_parent_id_unique" ON "header_nav_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_logo_image_idx" ON "header" USING btree ("logo_image_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_link_link_page_idx" ON "footer_columns_links" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "footer_columns_links_locales_locale_parent_id_unique" ON "footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_columns_locales_locale_parent_id_unique" ON "footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_bottom_links_order_idx" ON "footer_bottom_links" USING btree ("_order");
  CREATE INDEX "footer_bottom_links_parent_id_idx" ON "footer_bottom_links" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_links_link_link_page_idx" ON "footer_bottom_links" USING btree ("link_page_id");
  CREATE UNIQUE INDEX "footer_bottom_links_locales_locale_parent_id_unique" ON "footer_bottom_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_default_meta_default_meta_og_image_idx" ON "site_settings" USING btree ("default_meta_og_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_ctas" CASCADE;
  DROP TABLE "pages_blocks_hero_ctas_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_rich_text_locales" CASCADE;
  DROP TABLE "pages_blocks_background_cta" CASCADE;
  DROP TABLE "pages_blocks_background_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_background" CASCADE;
  DROP TABLE "pages_blocks_background_locales" CASCADE;
  DROP TABLE "pages_blocks_education_jurisdictions_education" CASCADE;
  DROP TABLE "pages_blocks_education_jurisdictions_education_locales" CASCADE;
  DROP TABLE "pages_blocks_education_jurisdictions_jurisdictions" CASCADE;
  DROP TABLE "pages_blocks_education_jurisdictions_jurisdictions_locales" CASCADE;
  DROP TABLE "pages_blocks_education_jurisdictions_languages" CASCADE;
  DROP TABLE "pages_blocks_education_jurisdictions_languages_locales" CASCADE;
  DROP TABLE "pages_blocks_education_jurisdictions" CASCADE;
  DROP TABLE "pages_blocks_education_jurisdictions_locales" CASCADE;
  DROP TABLE "pages_blocks_service_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_service_cards_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_service_cards" CASCADE;
  DROP TABLE "pages_blocks_service_cards_locales" CASCADE;
  DROP TABLE "pages_blocks_practice_areas_items" CASCADE;
  DROP TABLE "pages_blocks_practice_areas_items_locales" CASCADE;
  DROP TABLE "pages_blocks_practice_areas" CASCADE;
  DROP TABLE "pages_blocks_practice_areas_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_banner_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_banner_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_banner" CASCADE;
  DROP TABLE "pages_blocks_cta_banner_locales" CASCADE;
  DROP TABLE "pages_blocks_research_timeline_manual_items" CASCADE;
  DROP TABLE "pages_blocks_research_timeline_manual_items_locales" CASCADE;
  DROP TABLE "pages_blocks_research_timeline" CASCADE;
  DROP TABLE "pages_blocks_research_timeline_locales" CASCADE;
  DROP TABLE "pages_blocks_research_profile_card" CASCADE;
  DROP TABLE "pages_blocks_research_profile_card_locales" CASCADE;
  DROP TABLE "pages_blocks_tag_boxes_items" CASCADE;
  DROP TABLE "pages_blocks_tag_boxes_items_locales" CASCADE;
  DROP TABLE "pages_blocks_tag_boxes" CASCADE;
  DROP TABLE "pages_blocks_tag_boxes_locales" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_contact_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages_blocks_contact_form_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "publications" CASCADE;
  DROP TABLE "publications_locales" CASCADE;
  DROP TABLE "submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav" CASCADE;
  DROP TABLE "header_nav_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns_links_locales" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_columns_locales" CASCADE;
  DROP TABLE "footer_bottom_links" CASCADE;
  DROP TABLE "footer_bottom_links_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_link_icon";
  DROP TYPE "public"."enum_pages_blocks_hero_ctas_link_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_image_style";
  DROP TYPE "public"."enum_pages_blocks_rich_text_alignment";
  DROP TYPE "public"."enum_pages_blocks_background_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_background_cta_link_icon";
  DROP TYPE "public"."enum_pages_blocks_background_cta_link_variant";
  DROP TYPE "public"."enum_pages_blocks_education_jurisdictions_jurisdictions_icon";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_cta_link_icon";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_cta_link_variant";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_background";
  DROP TYPE "public"."enum_pages_blocks_research_timeline_manual_items_kind";
  DROP TYPE "public"."enum_pages_blocks_research_timeline_mode";
  DROP TYPE "public"."enum_publications_kind";
  DROP TYPE "public"."enum_submissions_status";
  DROP TYPE "public"."enum_header_nav_link_type";
  DROP TYPE "public"."enum_header_nav_link_icon";
  DROP TYPE "public"."enum_header_nav_link_variant";
  DROP TYPE "public"."enum_footer_columns_links_link_type";
  DROP TYPE "public"."enum_footer_columns_links_link_icon";
  DROP TYPE "public"."enum_footer_columns_links_link_variant";
  DROP TYPE "public"."enum_footer_bottom_links_link_type";
  DROP TYPE "public"."enum_footer_bottom_links_link_icon";
  DROP TYPE "public"."enum_footer_bottom_links_link_variant";`)
}
