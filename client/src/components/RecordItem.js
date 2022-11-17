import {
  retrunNtrpCharacterName,
  returnNtrpCharacterImage,
  convertTimeToStr,
} from "../utils/Util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const RecordItem = (props) => {
  const item = props.item;
  const isMine = item.panelId === item.playerId;
  const ntrp =
    Math.round(
      ((item.forehandScore +
        item.backhandScore +
        item.serveAndReturnScore +
        item.volleyScore) /
        4) *
        100
    ) / 100;
  return (
    <a href={"/ntrp/result/" + item.id}>
      <div className="flex justify-between">
        <div className="font-bold text-next text-lg">
          {convertTimeToStr(item.testEndTime)}
        </div>
        {isMine ? (
          <div></div>
        ) : (
          <div className="text-secondary-400 font-bold">
            {item.panelId} 님이 측정
          </div>
        )}
      </div>

      <div
        className={
          "border-2 rounded-md flex items-stretch w-full px-3 md:px-6 py-3 mt-2 mb-8" +
          (isMine
            ? " border-primary-400 hover:border-primary-600 hover:cursor-pointer"
            : " border-secondary-400 hover:border-secondary-600 hover:cursor-pointer")
        }
      >
        <img
          src={returnNtrpCharacterImage(ntrp)}
          alt="NtrpCharacterImage"
          className="w-20 md:w-32 mr-5"
        ></img>
        <div className="flex-auto flex flex-col justify-around">
          <div className="text-xl md:text-3xl font-normal">
            {retrunNtrpCharacterName(ntrp)}
          </div>
          <div className="text-xl md:text-3xl font-light">
            NTRP : <span className="text-primary-400">{ntrp}</span>
          </div>
        </div>
        <div className="w-4 md:w-6 h-auto self-center">
          <FontAwesomeIcon
            icon={faChevronRight}
            className="w-full h-full text-next"
          />
        </div>
      </div>
    </a>
  );
};

export default RecordItem;
