import { useEffect, useState } from 'react';
import './css/App.css';
import logo_papo_devops from './imgs/papo_devops.png';
import no_img from './imgs/no_image.png';
import api from './api.js';
import jenkins from './imgs/jenkins.png';
import github from './imgs/github.png';
import gitlab from './imgs/gitlab.png';
import azure from './imgs/azure.png';

function App() {

  const [text, setText] = useState("Bem vindos ao Papo Devops");
  const [pipeImg, setPipeImg] = useState(no_img);
  const [color, setColor] = useState("#66bdfb");

  useEffect(() => {
    if (process.env.REACT_APP_PIPE_IMAGE){
      switch (process.env.REACT_APP_PIPE_IMAGE) {
        case "azure":
          setPipeImg(azure);
          break;
        case "github":
          setPipeImg(github);
          break;
        case "gitlab":
          setPipeImg(gitlab);
          break;
        case "jenkins":
          setPipeImg(jenkins);
          break;
        default:
          setPipeImg(no_img)
          break;
      }
    }
  })

  useEffect(()=> {
    try{
      let resText = getText();
      if (resText.status === 200){
        setText(resText);
      }
    }catch(e) {
      console.log(e);
    }

    try{
      let resColor = getColor();
      if (resColor.status === 200){
        setText(resColor);
      }
    }catch(e) {
      console.log(e);
    }
  }, [])

  useEffect(()=> {
    let bgColor = document.getElementById("App");
    bgColor.style.backgroundColor = color;
  }, [color]);

  const getText = async () => {
    try{
      const res = await api.get(`/contentText`);
      if (res.status === 200){
        return res;
      }else{
        return null;
      }
    }catch (e){
      return null;
    }
  }

  const getColor = async () => {
    try{
      const res = await api.get(`/color`);
      if (res.status === 200){
        return res;
      }else{
        return null;
      }
    }catch (e){
      return null;
    }
  }

  return (
    <div id='App'>
      <div id='header'>
        <img id='logo_papo_devops' src={logo_papo_devops} alt="Logo do Papo Devops"></img>
      </div>
      <div id='content'>
        <img id='pipe_img' src={pipeImg}></img>
        <p id='pipe_text'>{text}</p>
      </div>
    </div>
  );
}

export default App;
