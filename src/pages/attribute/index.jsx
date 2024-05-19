import React, { useState, useRef } from 'react';
import Recommend from "../recommends";
import Webcam from 'react-webcam';



export default function Attribute() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  console.log(user);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [renderSelect, setRenderSelect] = useState(0);
  const [data, setData] = useState();
  const [happy_rate, setHappyRate] = useState();
  const [sad_rate, setSadRate] = useState();
  const [neutral_rate, setNeutralRate] = useState();
  const emotionIcons = {
    Happy: '😊',
    Sad: '😢',
    Energetic: '🥳',
    Calm: '😐',
  };
  const emotionValues = {
    Happy: 0,
    Sad: 1,
    Energetic: 2,
    Calm: 3,
  };
  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const [clickedCamera, setClickedCamera] = useState(1);
  
  const handleButtonClick = async (emotion) => {

    if(!user) window.location.replace("/login");
    console.log(emotionValues[emotion]);
    console.log("User Informations: ", user[0]);
    console.log("User ID for Recommendations: ", user[0]["user_id"]);
    
    const response = await fetch('http://localhost:3001/songs', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emotion: emotionValues[emotion] , user: user})
    });
    try{
      const result = await response.json();
      console.log(result);
      if (result.success) {
      let tempData = result.data;
      let tempData2 = result.data2;
      let dataArray = tempData.concat(tempData2);
      // dataArray.sort(() => Math.random() - 0.5);
      setData(dataArray);
      setRenderSelect(1);
    }}
    catch (err) {}
    
  };

  const webcamRef = useRef(null);
  const [isShowVideo, setIsShowVideo] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  
  
  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setClickedCamera(!clickedCamera);
    
    // Resmi Blob formatına dönüştür
    const blob = await fetch(imageSrc).then(res => res.blob());
  
    // Blob'u base64 formatına dönüştür
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    
    reader.onloadend = async () => {
       

        // Flask sunucusuna istek yap
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ 'image': imageSrc }),
            headers: { 'Content-Type': 'application/json'},
        });
    
        try {
            const result = await response.json();
            console.log(result);
            let enBuyuk = Math.max(result['Happy'], result['Sad'], result['Neutral'])
            let emotion;
            if(enBuyuk == result['Happy']){
              if(result['Happy'] >= 0.8){
                emotion = 2
              }
              else{
                emotion = 0;
              }  
            }
            if(enBuyuk == result['Sad'])
              emotion = 1
            if(enBuyuk == result['Neutral'])
              emotion = 3
            console.log("En Buyuk : " + enBuyuk, " Seçili Duygu: "+ emotion)
            const response2 = await fetch('http://localhost:3001/songs', {
              method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emotion: emotion , user: user})
            });
            try{
              const result = await response2.json();
              console.log(result);
              if (result.success) {              
              let tempData = result.data;
              let tempData2 = result.data2;
              let dataArray = tempData.concat(tempData2);
              setData(dataArray);
              console.log(dataArray);
              setRenderSelect(1);
            }}
            catch (err) {}

        } catch (error) {
            console.error('Hata:', error);
        }
    };
};

  

  return (
    <>
      {renderSelect ? (<Recommend data = {data} ></Recommend>) :
      <>
      <div className="w-screen h-screen flex items-center">
        <div className="w-auto min-w-[110vh] max-h-[75vh] overflow-y-auto bg-black/40 text-white flex flex-col gap-3 justify-center items-center px-5 py-10 mx-auto rounded overflow-hidden">
          
          <div className="relative flex bg-orange-700 text-black font-extrabold rounded text-center px-7 py-3  max-w-full">
            {Object.entries(emotionIcons).map(([emotion, iconUrl]) => (
              <div key={emotion} onClick={() => handleEmotionClick(emotion)} className="flex flex-col items-center cursor-pointer bg-black/60 text-white rounded-3xl p-2 mx-1">
                <b className="text-6xl my-1">{iconUrl}</b>
                <p>{emotion}</p>
              </div>
            ))}
          </div>

          <hr />
          <button onClick={() => {setClickedCamera(!clickedCamera); setImgSrc(null), setIsShowVideo(!isShowVideo)}} className="px-10 py-5 bg-gray-700 rounded-sm font-bold hover:bg-gray-800 hover:text-gray-200">Use Camera to Analyze Mood</button>
                      
          <div className="w-auto max-h-[300px] flex flex-col items-center justify-center gap-5 overflow-y-auto">
            
            <div className={clickedCamera ? 'hidden' : 'flex flex-col items-center gap-5'}>
              {(imgSrc ) ?  (
                <img src={imgSrc} alt="Captured" className="max-w-full"/>
              ): (isShowVideo ? <Webcam ref={webcamRef} screenshotFormat="image/jpeg" width={500} height={400} audio={false} mirrored={true} className={imgSrc ? 'hidden' : ''}/>: "")
              
              
              }
              
              </div>
            </div>
            <button onClick={capture} className={clickedCamera ? 'hidden ' 
              :
             "px-10 py-5 bg-gray-700 rounded-sm font-bold hover:bg-gray-800 hover:text-gray-200"}>Capture photo
             </button>
          

          {selectedEmotion && (
            <div className="flex flex-col items-center justify-center gap-3">
              <b>Selected Emotion: <b className="text-orange-600">{selectedEmotion}</b></b>
              <button onClick={() => handleButtonClick(selectedEmotion)} className="px-10 py-5 bg-orange-700 rounded-sm font-bold hover:bg-orange-800 hover:text-gray-200">Select Mood</button>
            </div>
          )}
        </div>
      </div>
      </>
        }
    </>
  ); 
}
