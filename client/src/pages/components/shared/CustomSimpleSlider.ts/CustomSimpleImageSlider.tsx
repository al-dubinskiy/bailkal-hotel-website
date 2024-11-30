import React, { ReactElement } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

interface Props {
  images: string[];
}

export const CustomSimpleImageSlider = (props: Props) => {
  const { images } = props;
  return (
    <Swiper
      cssMode={true}
      navigation={true}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      style={{
        background: "red",
      }}
    >
      {images.map((item, idx) => {
        return (
          <SwiperSlide key={idx}>
            <img src={item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};