set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.reviews_in_view_2(min_lat double precision, min_lng double precision, max_lat double precision, max_lng double precision)
 RETURNS TABLE(id integer, comments text, rating smallint, lat double precision, lng double precision, isp bigint, isp_name text)
 LANGUAGE plpgsql
AS $function$
	begin
	RETURN QUERY
		select public.reviews.id, public.reviews.comments, public.reviews.rating, st_y(public.reviews.location::geometry) as lat, st_x(public.reviews.location::geometry) as lng, public.reviews.isp, public.isp.name as isp_name
		from public.reviews
		JOIN public.isp ON public.reviews.isp = public.isp.id
		where location && ST_SetSRID(ST_MakeBox2D(ST_Point(min_lng, min_lat), ST_Point(max_lng, max_lat)), 4326);
	end
$function$
;


