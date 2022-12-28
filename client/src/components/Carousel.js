import { useEffect } from "react";
import { sendSlackMessage } from "../utils/Util";

let currentItemIndex = 0;

const getItemId = (carouselName, index) => `${carouselName}-item-${index}`;

const moveToNextCarouselItem = (carouselName, itemsLength) => {
  currentItemIndex += 1;
  currentItemIndex %= itemsLength;
  window.location.href = `/#${getItemId(carouselName, currentItemIndex)}`;
};

const onClickCarouselItem = (name, index) => {
  sendSlackMessage(`배너가 클릭됐습니다. ${getItemId(name, index)}`);
  window.location.href = `${process.env.REACT_APP_LEAGUE_BLOG}`;
};

const Carousel = ({ images, name }) => {
  useEffect(() => {
    const autoMoveCarousel = setInterval(
      () => moveToNextCarouselItem(name, images.length),
      5000
    );
    return () => clearInterval(autoMoveCarousel);
  });
  return (
    <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5">
      <ul className="flex overflow-x-auto gap-6 snap-x snap-mandatory motion-safe:scroll-smooth">
        {images.map(({ title, src }, index) => (
          <li
            id={getItemId(name, index)}
            key={title}
            className="shrink-0 w-full snap-center"
          >
            <div onClick={() => onClickCarouselItem(name, index)}>
              <img src={src} title={title} alt="banner" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
