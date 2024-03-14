'use client';

import { useState } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { createBrowserClient } from '@/lib/supabase/browser-client';
import MapReview from './review';

type TMapBounds = {
  min_lat: number;
  max_lat: number;
  min_lng: number;
  max_lng: number;
};

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

  const [reviews, setReviews] = useState<TReview[] | null>(null);

  async function fetchReviews(bounds: TMapBounds) {
    const { data, error } = await supabase.rpc('reviews_in_view', {
      min_lat: bounds.min_lat,
      min_lng: bounds.min_lng,
      max_lat: bounds.max_lat,
      max_lng: bounds.max_lng,
    });

    console.log(data, error);

    setReviews(data);
  }

  useMapEvents({
    moveend() {
      fetchReviews({
        min_lat: map.getBounds().getSouthWest().lat,
        max_lat: map.getBounds().getNorthEast().lat,
        min_lng: map.getBounds().getSouthWest().lng,
        max_lng: map.getBounds().getNorthEast().lng,
      });
    },
  });

  return (
    <>
      {reviews &&
        reviews.map((review) => <MapReview key={review.id} {...review} />)}
    </>
  );
}
