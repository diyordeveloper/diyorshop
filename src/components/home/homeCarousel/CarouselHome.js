import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { useUserContext } from "../../../Context";
import "./carouselhome.scss";
function CarouselHome() {
  const { banner } = useUserContext();

  return (
    <div className="col-12  ">
      <Swiper
        Swiper
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        autoplay={{
          delay: 500,
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {banner.map((itm, idx) => (
          <SwiperSlide key={idx}>
           <a  href={itm.link} className="w-100" > 
           <img src={itm.url} alt="Error" />
           </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CarouselHome;
