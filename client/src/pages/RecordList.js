import useUserStore from "../data/User";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import RecordItem from "../components/RecordItem";

const RecordList = () => {
  const userId = useUserStore((state) => state.userId);
  const nickname = useUserStore((state) => state.nickname);
  const [records, setRecords] = useState([]);
  const getRecords = async () => {
    const response = await axios.get(`/api/ntrp/test/player/${userId}`);
    setRecords(response.data);
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div className="w-full">
      <div className="w-5/6 md:w-2/3 mx-auto flex flex-col items-center">
        <div className="self-start text-3xl md:text-4xl font-bold text-text mt-8 mb-14">
          {nickname}님의 NTRP 기록
        </div>
        <div className="w-full">
          {records.map((it) => (
            <RecordItem key={`recorditem_${it.id}`} item={it} />
          ))}
        </div>
        <Link
          to={"/"}
          className="w-2/3 md:w-1/2 rounded-full border-2 border-text bg-tranparent py-3 md:py-4 text-text text-xl md:text-2xl font-normal hover:border-black my-5 text-center"
        >
          홈 화면으로 이동
        </Link>
        <div className="text-text font-medium text-xl md:text-3xl mt-6 mb-20">
          NTRP<span className="ml-1 text-secondary-400">plus</span>
        </div>
      </div>
    </div>
  );
};

export default RecordList;
