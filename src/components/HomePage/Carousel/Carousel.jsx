import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";

import { carousels } from "../../../utils/homeData";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Carousel.css";

import LazyLoad from "react-lazyload";

export default function Carousel() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      centeredSlides={true}
      effect={"fade"}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, EffectFade, Pagination, Navigation]}
      className="mySwiper"
    >
      {carousels.map(({ img, alt }) => {
        return (
          <LazyLoad key={alt}>
            <SwiperSlide key={alt}>
              <img src={img} alt={alt} />
            </SwiperSlide>
          </LazyLoad>
        );
      })}
    </Swiper>
  );
}
