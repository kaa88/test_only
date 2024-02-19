import { ComponentPropsWithoutRef, useRef, useEffect, useState } from "react";
import classes from "./Slider.module.scss";
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

const mobileBreakpoint = 730;

const Slider = function ({ className = "", data, activePeriod }: SliderProps) {
  const swiperElRef = useRef<SwiperContainer>(null);

  const swiperParams = {
    slidesPerView: "auto",
    spaceBetween: 25,
    slidesOffsetBefore: 20,
    pagination: {
      enabled: true,
      clickable: true,
    },
    breakpoints: {
      [mobileBreakpoint]: {
        spaceBetween: 80,
        slidesOffsetBefore: 0,
      },
    },
    injectStyles: [shadowStyles],
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

  const [periodTitle, setPeriodTitle] = useState(data[activePeriod].title);
  const [slides, setSlides] = useState(data[activePeriod].items);

  // Fading
  const fadeTimeout = ANIMATION_TIME / 2;
  const [isFaded, setIsFaded] = useState(true);

  useEffect(() => {
    setIsFaded(true);

    setTimeout(() => {
      setIsFaded(false);
      setPeriodTitle(data[activePeriod].title);
      setSlides(data[activePeriod].items);
      setSwiperUpdate(true);
    }, fadeTimeout);
  }, [activePeriod]);
  // /Fading

  return (
    <div
      className={`${className} ${classes.wrapper} ${
        isFaded ? classes.faded : ""
      }`}
    >
      <div className={classes.mobileHeader}>
        <div className={classes.mobileHeaderTitle}>{periodTitle}</div>
        <div className={classes.mobileHeaderDivider}></div>
      </div>

      <ArrowButton
        className={`${classes.prevBtn} ${
          isSlideBeginning ? classes.inactive : ""
        }`}
        variant="slider"
        onClick={slidePrev}
      />
      <swiper-container ref={swiperElRef} init="false">
        {slides.map((slide, index) => (
          <swiper-slide key={index}>
            <p className={classes.slideTitle}>{slide.year}</p>
            <p className={classes.slideText}>{slide.descr}</p>
          </swiper-slide>
        ))}
      </swiper-container>
      <ArrowButton
        className={`${classes.nextBtn} ${isSlideEnd ? classes.inactive : ""}`}
        variant="slider"
        onClick={slideNext}
      />
    </div>
  );
};
export default Slider;

const shadowStyles = `
  .swiper-pagination {
    position: fixed;
    top: auto !important;
    bottom: 32px !important;
    @media (min-width: ${mobileBreakpoint + 1}px) {
      display: none;
    }
  }
`;
