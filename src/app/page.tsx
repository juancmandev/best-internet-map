import dynamic from 'next/dynamic';

const MapHandle = dynamic(() => import('@/components/map/handle'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <MapHandle />
    </>
  );
}
