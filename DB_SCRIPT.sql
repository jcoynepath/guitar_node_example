-- public.guitars definition

-- Drop table

-- DROP TABLE public.guitars;

CREATE TABLE public.guitars (
	"name" varchar NULL,
	model varchar NULL,
	manufacturer varchar NULL,
	color varchar NULL
);
CREATE UNIQUE INDEX guitars_name_idx ON public.guitars USING btree (name);