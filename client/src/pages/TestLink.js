import tedor from "../tedor.svg";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TestLink = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  let isBtnClicked = false;
  const clipboardFunction = async () => {
    if (isBtnClicked) {
      const getPlayerInfoApiResponse = await axios.get(
        `/api/ntrp/player/${phoneNumber === "" ? "x" : phoneNumber}`
      );
      if (!getPlayerInfoApiResponse.data) {
        const createPlayerApiResponse = await axios.post("/api/ntrp/player", {
          phoneNumber: phoneNumber,
        });
        isBtnClicked = false;
        return new Blob(
          [
            `${process.env.REACT_APP_TEST_URL}/${createPlayerApiResponse.data.id}`,
          ],
          {
            type: "text/plain",
          }
        );
      }
      isBtnClicked = false;
      return new Blob(
        [
          `${process.env.REACT_APP_TEST_URL}/${getPlayerInfoApiResponse.data.id}`,
        ],
        { type: "text/plain" }
      );
    } else {
      return new Blob([process.env.REACT_APP_TEST_URL], { type: "text/plain" });
    }
  };

  const testLinkUrl = () => {
    return new window.ClipboardItem({
      "text/plain": clipboardFunction(),
    });
  };

  const handleClickGetTestLinkBtn = () => {
    isBtnClicked = true;
    const clipboardItem = testLinkUrl();
    window.navigator.clipboard.write([clipboardItem]).then(() => {
      showToast();
    });
  };

  const showToast = () => {
    // Show the toast
    document.getElementById("myToast").classList.remove("hidden");
    // Hide the toast after 5 seconds (5000ms)
    // you can set a shorter/longer time by replacing "5000" with another number
    setTimeout(function () {
      document.getElementById("myToast").classList.add("hidden");
    }, 2000);
  };

  return (
    <div className="flex justify-center w-full" style={{ paddingRight: 20 }}>
      <div className="flex flex-col items-center w-2/3 md:w-2/5 mb-20">
        <div className="text-text font-medium text-xl mt-10">
          NTRP<span className="ml-1 text-secondary-400">plus</span>
        </div>
        <div className="text-4xl font-bold text-text mt-8">
          테니스 실력 테스트
        </div>
        <img src={tedor} alt="logo" className="w-4/5 md:w-3/4 mt-12" />
        <div className="w-full text-start text-2xl font-bold">휴대폰 번호</div>
        <input
          value={phoneNumber}
          placeholder="01012341234"
          className="w-full my-4 py-1.5 text-xl border-b-2 border-primary-400 focus:outline-none focus:border-primary-600"
          onChange={(e) => setPhoneNumber(e.target.value)}
        ></input>
        <button
          type="button"
          className="w-full mt-10 rounded-full border border-transparent bg-secondary-400 py-3 md:py-4 text-xl md:text-2xl font-normal text-white hover:bg-secondary-600 my-2"
          onClick={handleClickGetTestLinkBtn}
        >
          링크 받기
        </button>
        <Link
          to={"/"}
          className="w-full rounded-full border-2 border-text bg-tranparent py-3 md:py-4 text-text text-xl md:text-2xl font-normal hover:border-black my-5 text-center"
        >
          홈 화면으로 이동
        </Link>
      </div>
      <div
        id="myToast"
        className="hidden fixed bottom-8 px-5 py-4 border-r-8 border-primary-400 bg-white drop-shadow-lg"
      >
        <p className="text-lg">
          <span className="mr-4 inline-block px-4 py-1 rounded-full bg-primary-400 text-white font-extrabold">
            i
          </span>
          복사가 완료되었습니다.
        </p>
      </div>
    </div>
  );
};

export default TestLink;
