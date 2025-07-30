import React from 'react'
import { TypeAnimation } from 'react-type-animation';

export default function TextAnimation() {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Get Updated with latest Oversize',
        2000, // wait 1s before replacing "Mice" with "Hamsters"
        'Get Updated with latest Old Money',
        2000,
        'Get Updated with latest T-Shirt',
        2000,
        'Get Updated with latest Hoodis',
        2000
      ]}
      wrapper="p"
      speed={55}
      repeat={Infinity}
    />
  );

}
