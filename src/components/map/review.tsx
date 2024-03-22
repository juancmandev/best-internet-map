'use client';

import { Icon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { Rating } from 'react-simple-star-rating';

type Props = {
  id: number;
  comments: string;
  rating: number;
  isp: number;
  isp_name: string;
  lat: number;
  lng: number;
};

export default function MapReview(props: Props) {
  const icon = new Icon({
    iconUrl: '/review-pin.svg',
    iconSize: [32, 32],
    className: '!z-20',
  });

  return (
    <Marker icon={icon} position={[props.lat, props.lng]}>
      <Popup>
        <h3 className='text-lg font-semibold'>{props.isp_name}</h3>
        <div className='w-max [&span]:w-max'>
          <Rating
            readonly
            initialValue={props.rating}
            SVGclassName='inline-block'
          />
        </div>
        <p className='text-base !m-0 !mt-2'>{props.comments}</p>
      </Popup>
    </Marker>
  );
}
