import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function CarouselBox() {
  return (
    <section id="_carousel">
      <Carousel
        autoPlay={true}
        showStatus={false}
        showThumbs={false}
        autoFocus={false}
        infiniteLoop={true}
        stopOnHover={true}
        useKeyboardArrows
      >
        <div className=" h-72 sm:h-96 lg:h-[500px] bg-cover bg-center bg-[url(https://images.squarespace-cdn.com/content/v1/624b503ba3713919d9f4256c/1649102909821-XEKAJ0UNGX6IIN26KM74/2015-07-31-leather-model-06-0041-v3-FINAL-copy.jpg?format=1000w)] ">
          {/* <a href="/"></a> */}
        </div>
        <div className=" h-72 sm:h-96 lg:h-[500px] bg-cover bg-center bg-[url(https://images.squarespace-cdn.com/content/v1/624b503ba3713919d9f4256c/1649102909887-XSUGAML3DBL2LFBU7H8L/2015-07-31-leather-model-03-0090-v2-FINAL-copy.jpg?format=1000w)]">
          {/* <a href="/"></a> */}
        </div>
        <div className=" h-72 sm:h-96 lg:h-[500px] bg-cover bg-center bg-[url(https://images.squarespace-cdn.com/content/v1/624b503ba3713919d9f4256c/1649102909876-2NI1BC894GBWIXD3I2MJ/2015-07-31-leather-model-06-0127-v3-FINAL.jpg?format=1000w)]">
          {/* <a href="/"></a> */}
        </div>
        <div className=" h-72 sm:h-96 lg:h-[500px] bg-cover bg-center bg-[url(https://images.squarespace-cdn.com/content/v1/624b503ba3713919d9f4256c/1649102909832-Z1S1ZQPEJVFMVR9JTJFN/2015-07-31-leather-model-01-0081-v3-FINAL-copy.jpg?format=1000w)]">
          {/* <a href="/"></a> */}
        </div>
      </Carousel>
    </section>
  );
}
