import tedor from "../tedor.svg";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-2/3 md:w-2/5 mb-20">
        <div className="text-text font-medium text-xl mt-10">
          NTRP<span className="ml-1 text-secondary-400">plus</span>
        </div>
        <div className="text-4xl font-bold text-text mt-8">
          테니스 실력 테스트
        </div>
        <img src={tedor} alt="logo" className="w-4/5 md:w-3/4 mt-12" />
        <div className="mt-4 mb-8 text-info">
          테니스 실력 테스트 마스코트 "테도르"
        </div>
        <a
          href={process.env.REACT_APP_TEST_URL}
          className="w-full rounded-full border border-transparent bg-secondary-400 py-3 md:py-4 text-xl md:text-2xl font-normal text-white text-center hover:bg-secondary-600 my-2"
        >
          내 NTRP 측정하기
        </a>
        <Link
          to={"/mypage"}
          className="w-full rounded-full border border-border bg-tranparent py-3 md:py-4 text-xl md:text-2xl font-normal hover:border-border-600 my-2 text-center"
        >
          내 NTRP 기록보기
        </Link>
        <Link
          to={"/testlink"}
          className="w-full rounded-full border border-transparent bg-accent-400 py-3 md:py-4 text-xl md:text-2xl text-center font-normal hover:bg-accent-600 my-2"
        >
          상대가 측정하는 내 NTRP
        </Link>
        <div className="w-full mt-1">
          <p className="text-end text-info">상대가 내 NTRP를 측정할 수 있는</p>
          <p className="text-end text-info">링크를 받을 수 있어요</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
