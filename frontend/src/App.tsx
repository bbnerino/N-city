import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Admin, FAQ, Main, Mypage, NFTStore } from "./pages/index";
import Login from "./pages/Login/Login";
import Apply from "./pages/Apply/Apply";
import GlobalStyle from "./styles/global";
import DetailItem from "./pages/NFTStore/DetailItem";
import ProfileSetting from "./pages/Mypage/ProfileSetting";
import EventPage from "./pages/Community/EventPage";
import EventDetail from "./pages/Community/EventDetail";
import Rank from "./pages/Rank/Rank";
import Test from "./pages/Rank/Test";
import Mint from "./pages/Mint/Mint";
import Artists from "./pages/NFTStore/Artists";
import GameApp from "./ingame/GameApp";
import { Provider } from "react-redux";
import gamestore from "./ingame/stores";
import phaserGame from "./ingame/PhaserGame";
import Main2 from "./pages/Main/Main2";
import YNTest from "./pages/Test/YNTest";
import SearchPage from "./pages/NFTStore/SearchPage";
import MapChoice from "./pages/Room/MapChoice";
import Character from "./pages/Mypage/Character";
import Guide from "./pages/Guide/Guide";


function App() {
  useEffect(() => {
    if (window.location.pathname === "/ingame") {
      (window as any).game = phaserGame;
    } else {
      (window as any).game.destroy(true);
    }
  }, []);
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/mypage/:userId" element={<Mypage />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/store" element={<NFTStore />} />
          <Route path="/store/detail/:productId" element={<DetailItem />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/profilesetting" element={<ProfileSetting />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/event/:eventId" element={<EventDetail />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/YNTest" element={<YNTest />} />
          <Route path="/search/:data" element={<SearchPage />}/>
          <Route path="/ingame"
            element={
              <Provider store={gamestore}>
                <GameApp />
              </Provider>
            }
          />
          <Route path="/test" element={<Test />} />
          <Route path="/mapchoice" element={<MapChoice />} />
          <Route path="/character" element={<Character />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
