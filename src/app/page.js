"use client";

import dynamic from 'next/dynamic';
const GoAHeroBanner = dynamic(
  () => import("@abgov/react-components").then((module) => module.GoAHeroBanner),
  {
    ssr: false,
  }
);
const Home = () => {
  return (
    <GoAHeroBanner
      heading="Design System Demos"
    >
    </GoAHeroBanner>
  );
}

const HomeComponent = dynamic(() => Promise.resolve(Home), {
  ssr: false,
})

export default HomeComponent;

