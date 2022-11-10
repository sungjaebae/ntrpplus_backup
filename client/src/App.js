import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import RecordList from "./pages/RecordList";
import TestLink from "./pages/TestLink";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/record" element={<RecordList />} />
        <Route path="/testlink" element={<TestLink />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
