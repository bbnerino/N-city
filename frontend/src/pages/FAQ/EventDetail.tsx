import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface IState{
  event:{
    title:string,
    url:string,
    date:string,
    content:string
  }
}
const Wrapper = styled.div`
  width: 90%;
  height: 80vh;
  display: flex;
  img{
    width: 35vw;
    height: 70vh;
    margin: 5vh;
    margin-left: 20vh;
    box-shadow: 1px 1px 3px;
  }
`
const Description = styled.div`
  margin: 5vh;  
  display: flex;
  flex-direction: column;
  .title{
    flex:1;
    font-size: 2.5rem;
    font-weight: 1000;
  }
  .date{
    flex:1;
    margin-top: 5vh;  
    font-size: 1.5rem;
    font-weight: 1000;
  }
  .content{
    flex:7;
    margin-top: 5vh;  
    font-size: 2vh;
    font-weight: 1000;
    width: 80%;
  }
  button{
    flex:1;
    /* color: white; */
  }
`
const EventDetail = () => {
  const navigate = useNavigate()
  const [event,setEvent] = useState<IState["event"]>({title:"",url:"",date:"",content:""})
  useEffect(()=>{
    setEvent(JSON.parse(localStorage.getItem("event")||""))
  },[])
  return (
    <Wrapper>
      <img alt="이벤트" src={event.url}/>
      <Description>
        <div className='title'>{event.title}</div>
        <div className='date'>이벤트 기간 : {event.date}</div>
        {/* <div className='content'> 설명: {event.content}</div> */}
        <div className='content'> 설명: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
        <Button variant="contained" color="success" onClick={()=>{navigate(-1)}} >뒤로</Button>
      </Description>
    </Wrapper>
  )
}

export default EventDetail