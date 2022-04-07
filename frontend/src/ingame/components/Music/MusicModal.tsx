import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import AudioPlayer from "./AudioPlayer";
// api 요청
import { useMutation, useQuery } from "react-query";
import { getUsercollectedInfo } from "../../../../src/store/apis/user"; //  유저정보 가져오기
import { client } from "../../../../src/index"; // query data refresh 용도

//스토어
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setMusicList } from "../../stores/RoomStore";

const Wrapper = styled.div`
  position: absolute;
  width: 340px;
  height: 460px;
  background-color: #f0f0f0e9;
  /* background-color: #656565a5; */
  right: 30px;
  border-radius: 10px;
  padding: 10px;
  .subtitle{
    font-size: 13px;
    padding-bottom:10px;
    /* border-bottom: 0.5px solid white; */
    border-bottom: 0.5px solid #333;
    /* color: white; */
    margin-bottom: 20px;
    width: 90%;
  }
`;
 
const Head = styled.div`
  width: 100%;
  height: 20%;
  /* background-color: antiquewhite; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .name{
    /* color:white; */
    margin-top: 20px;
    font-size: 30px;
    font-weight: 600;
  }
  
`;

// 뮤직 리스트
const Body = styled.div`

  margin: auto;
  width: 90%;
  height: 60%;
  /* background-color: #6b6a72; */
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
`;

// pagenation & 설명?
const Foot = styled.div`
  width: 100%;
  height: 20%;
  /* background-color: #f5cbd4; */
`;

const MusicItem = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 0.1px solid #d6d6d6bc;
  /* background-color: #e381ba; */
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  align-items: center;
  margin-top: 2px;
  margin-bottom: 2px;
  img {
    width: 45px;
    height: 45px;
    border-radius: 25px;
  }
  .subTitle{
    width: 190px ; 
    /* color: white; */
    font-weight: 400;
    margin-left: 10px;
  }
  .buyBtn{
    color: #6262f1 ;
    :hover{
      color: #3838e9 ;

    }
  }
  audio {
    width: 50%;
    height: 30px;
    margin-left: auto;
  }

  div {
    flex-direction: column;
  }
`;
const CloseButton = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z'/%3E%3C/svg%3E");
  width: 35px;
  height: 35px;
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`; 
interface Iprops{
  setOpen : React.Dispatch<React.SetStateAction<boolean>>
}
const MusicModal:React.FC<Iprops> = ({setOpen}) => {
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setOpen(true)
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);
  const [playList, setPlayList] = useState<Array<object>>([]);
  // 임시 userid params 의 데이터를 넘겨주는걸 생각해봐야할듯
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.edit.userId);
  console.log(userId, "유저아이디");
  const tracks = useAppSelector((state) => state.room.roomMusicList);
  const [musicList, setMusic] = useState();
  // 작품 조회
  // productcode === 1 : 음악코드

  const {
    data: Alldata,
    isLoading: AllLoading,
    refetch: ALL,
  } = useQuery<any>(
    "ALLNFT",
    async () => {
      const size = 1000;
      return await getUsercollectedInfo(userId, size);
    },
    {
      onSuccess: (res) => {
        // 성공하면 db에 뮤직 string List를 만들어서 넘겨준다.
        let arr;
        console.log(res, "앱창에서 불러온 정보");
        const MusicArray = res.content.map((obj, i) => {
          if (obj.productCode === 1) {
            return {
              title: obj.productTitle,
              artist: obj.productDesc,
              audioSrc: obj.productFileUrl,
              image: obj.productThumbnailUrl,
              color: "#6225E6",
            };
          } else {
            return null;
          }
        });
        const result = MusicArray.filter((obj, i) => obj !== null);
        console.log(result, "새 결과");
        dispatch(setMusicList(result));
        setMusic(result);
      },
    }
  );

  console.log(musicList, "뮤직리스트");

  return (
    <Wrapper>
      <CloseButton onClick={()=>{setOpen(true)}}/>

      <Head><div className="name">Tracks</div>
      
        <div className="subtitle">All Tracks</div>
      </Head>
      <Body>
        {Alldata &&
          Alldata.content.map((obj, i) => {
            if (obj.productCode === 1) {
              return (
                <MusicItem>
                  <img src={obj.productThumbnailUrl} alt="사진없노~" />
                  <div className="subTitle">{obj.productTitle}</div>
                  {/* <audio controls src={obj.productFileUrl}></audio> */}
                  {(obj.productState===1 || obj.productState===2 )&& (userId!==obj.productUserId)&& // 내가 이 작품의 주인이 아닐경우,
                  <button className="buyBtn">구매하기</button>}
                </MusicItem>
              );
            }
          })}
      </Body>
      <Foot>
        <button>리스트 변경</button>
      </Foot>
    </Wrapper>
  );
};

export default MusicModal;
