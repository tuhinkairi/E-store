import React from "react";
import Banner from "../page1/Banner";
import CardShow from "../supporting/CardShow";
import Forward from "../supporting/Forward";
import HelpBanner from "./HelpBanner";
import CarouselBox from "../supporting/CarouselBox";
export default function HomePage() {
  return (
    <main className="dark:bg-black dark:text-white bg-white">
      <Banner />
      <CardShow />
      <CarouselBox />
      <Forward />
      <HelpBanner />
    </main>
  );
}
