import tedor from "../tedor.svg";
import useUserStore from "../data/User";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const setUserId = useUserStore((state) => state.setUserId);
  const setNickname = useUserStore((state) => state.setNickname);
  const handleClickShowRecordsBtn = async () => {
    const response = await axios.get(`/api/ntrp/player/${phoneNumber}`);
    if (response.data == null) {
      alert("실력 측정한 기록이 없습니다!");
    } else {
      await setUserId(response.data.id);
      await setNickname(response.data.nickname);
      navigate("/mypage/record");
    }
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
          className="w-full mt-10 rounded-full border border-transparent bg-secondary-400 py-3 md:py-4 text-lg font-normal text-white hover:bg-secondary-600 my-2"
          onClick={handleClickShowRecordsBtn}
        >
          내 NTRP 기록 보기
        </button>
      </div>
    </div>
  );
};

export default MyPage;
