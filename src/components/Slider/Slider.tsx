import { ComponentPropsWithoutRef, useRef, useEffect, useState } from "react";
import "./Slider.scss";
import { IActivePeriod, IData } from "../../types/types";
import Swiper from "swiper";
import { SwiperContainer } from "swiper/element";
import ArrowButton from "../ArrowButton/ArrowButton";
import { ANIMATION_TIME } from "../History/History";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "swiper-container": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { class?: string; init?: string },
        HTMLElement
      >;
      "swiper-slide": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

interface SliderProps extends ComponentPropsWithoutRef<"div"> {
  data: IData;
  activePeriod: IActivePeriod;
}

const Slider = function ({ className = "", data, activePeriod }: SliderProps) {
  const swiperElRef = useRef<SwiperContainer>(null);

  const swiperParams = {
    // freeMode: {
    //   enabled: true,
    // },
    slidesPerView: "auto",
    spaceBetween: 80,
    // breakpoints: {
    // 	[mobileBreakpoint]: {
    // 		slidesPerView: 3,
    // 		enabled: false
    // 	},
    // },
    // on: {
    // 	slideChangeTransitionEnd: handleSlideChange
    // }
  };

  const [swiperUpdate, setSwiperUpdate] = useState(false);
  const [isSlideBeginning, setIsSlideBeginning] = useState(true);
  const [isSlideEnd, setIsSlideEnd] = useState(false);

  const updateSlideBorders = (swiper: Swiper) => {
    setIsSlideBeginning(swiper.isBeginning);
    setIsSlideEnd(swiper.isEnd);
  };

  useEffect(() => {
    const swiperEl = swiperElRef.current;
    if (swiperEl) {
      Object.assign(swiperEl, swiperParams);
      swiperEl.initialize();

      swiperEl.addEventListener("swiperslidechange", (e: any) => {
        if (e.detail) updateSlideBorders(e.detail[0]);
      });
      swiperEl.addEventListener("swiperupdate", (e: any) => {
        if (e.detail) updateSlideBorders(e.detail[0]);
      });
    }
  }, []);

  useEffect(() => {
    const swiperEl = swiperElRef.current;
    if (swiperEl && swiperUpdate) {
      setSwiperUpdate(false);
      swiperEl.swiper.update();
    }
  }, [swiperUpdate]);

  const slidePrev = () => {
    const swiperEl = swiperElRef.current;
    swiperEl?.swiper.slidePrev();
  };
  const slideNext = () => {
    const swiperEl = swiperElRef.current;
    swiperEl?.swiper.slideNext();
  };

  const [slides, setSlides] = useState(data[activePeriod]);

  // Fading
  const fadeTimeout = ANIMATION_TIME / 2;
  const [isFaded, setIsFaded] = useState(true);

  useEffect(() => {
    setIsFaded(true);

    setTimeout(() => {
      setIsFaded(false);
      setSlides(data[activePeriod]);
      setSwiperUpdate(true);
    }, fadeTimeout);
  }, [activePeriod]);
  // /Fading

  return (
    <div className={`${className} sliderWrapper ${isFaded ? "faded" : ""}`}>
      <ArrowButton
        className={`sliderPrevBtn ${
          isSlideBeginning ? "sliderBtnInactive" : ""
        }`}
        variant="slider"
        onClick={slidePrev}
      />
      <swiper-container ref={swiperElRef}>
        {slides.map((slide, index) => (
          <swiper-slide key={index}>
            <p className="slideTitle">{slide.year}</p>
            <p className="slideText">{slide.descr}</p>
          </swiper-slide>
        ))}
      </swiper-container>
      <ArrowButton
        className={`sliderNextBtn ${isSlideEnd ? "sliderBtnInactive" : ""}`}
        variant="slider"
        onClick={slideNext}
      />
    </div>
  );
};
export default Slider;
