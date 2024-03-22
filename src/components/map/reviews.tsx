'use client';

import { useContext, useEffect, useState } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { createBrowserClient } from '@/lib/supabase/browser-client';
import MapReview from './review';
import { MapContext } from '@/contexts/map';

type TReview = {
  id: number;
  comments: string;
  rating: number;
  isp: number;
  isp_name: string;
  lat: number;
  lng: number;
};

export default function MapReviews() {
  const supabase = createBrowserClient();

  const map = useMap();

  const { reloadReviews } = useContext(MapContext)!;

  const [reviews, setReviews] = useState<TReview[] | null>(null);

  async function fetchReviews() {
    const { data, error } = await supabase.rpc('reviews_in_view', {
      min_lat: map.getBounds().getSouthWest().lat,
      min_lng: map.getBounds().getSouthWest().lng,
      max_lat: map.getBounds().getNorthEast().lat,
      max_lng: map.getBounds().getNorthEast().lng,
    });

    console.log(data);

    if (!error) {
      setReviews(data);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, [reloadReviews]);

  useMapEvents({
    moveend() {
      if (map.getZoom() > 12) {
        fetchReviews();
      } else {
        setReviews([]);
      }
    },
  });

  return (
    <>
      {reviews &&
        reviews.map((review) => <MapReview key={review.id} {...review} />)}
    </>
  );
}
