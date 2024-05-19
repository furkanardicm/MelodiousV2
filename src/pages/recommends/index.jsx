import React, {useState} from 'react'

function getUser(){
  let user = localStorage.getItem('user');
  if(user && user !== "null") {
   user = JSON.parse(user);
  }
  else{
   user = null;
  }
  return user;
}


function index(props) {
  const [user, setUser] = useState(getUser());
  const [bilgi, setData] = useState(props.data);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function convertMsToMinutesSeconds(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);

    return seconds === 60
      ? `${padTo2Digits(minutes + 1)}:00`
      : `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  }

  const handleSong = async (index) => {
    if(!user) window.location.replace("/login");
    const now = new Date();
    const utcString = now.toISOString();
    const response = await fetch('http://localhost:3001/listen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: user[0].user_id, name: bilgi[index].id, date: utcString, predicted_labels: bilgi[index].predicted_labels }),
    });
    try{
      const result = await response.json();
   
      if (result.success) {
        console.log('successfully');
              } else {
        alert('Kullanıcı adı veya şifre hatalı');
      }
    }
    catch (err) {}
    setSelectedSongIndex(index);
  }

  const renderSpotifyPlayer = () => {
    if (selectedSongIndex != null && selectedSongIndex >= 0) {
      const embedUrl = `https://open.spotify.com/embed/track/${bilgi[selectedSongIndex].id}`;
      return (
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      );
    } else {
      return null; // Eğer seçilen şarkı yoksa iframe'i gösterme
    }
  };
  return (
    <div className='w-[80%] h-[85%] bg-white rounded my-auto mx-auto px-4 pt-4 overflow-x-auto'>
      <div className='px-10 flex justify-between items-center '>
        <b className='text-xl'>Here Are Top 100 Recommended Songs For You !</b>
        <span onClick={() => location.reload()} className='cursor-pointer px-4 py-2 bg-black text-white font-bold rounded text-lg'>Back to Choosing Mood</span>
      </div>
      <div className="flex items-center justify-center w-[95%] h-[90%] mx-auto my-auto px-2 pt-2 flex-col">
      <div className="w-full h-[50px] bg-white flex-1 overflow-hidden px-9 pb-11 ">
            <ul className="flex flex-row font-extrabold m-2 text-center justify-around gap-7">
              <li className='ml-9 -mr-8 text-center'><h1>#</h1></li>
              <li><h1>Album Name</h1></li>
              <li><h1>Song Name</h1></li>
              <li><h1>Artist Name</h1></li>
              <li><h1>Time</h1></li>
            </ul>
            <hr className="border-1 border-black mb-1"></hr>
      </div>
        
      <div className="w-full overflow-y-scroll  h-full mb-0 ">
          {[...Array(100)].map((_, index) => (
            <div
              key={index}
              onClick={() => handleSong(index)}
              className={`relative hover:bg-slate-200 cursor-pointer w-full h-[50px] mt-1 rounded-md pl-10 text-center text-black font-medium flex items-center ${
                selectedSongIndex === index  ? "bg-gray-300 text-white" : ""
              } transition-all`}
            >
              <ul>
                <li>
                  <button onClick={() => handleSong(index)}></button>
                </li>
              </ul>
              <ul className="flex flex-row w-full justify-around items-center px-9 text-center gap-x-12 overflow-hidden">
                <li className='w-32 whitespace-nowrap overflow-hidden text-ellipsis'>
                  <span>{index + 1}</span>
                </li>
                <li className='w-44 overflow-hidden text-ellipsis settingsToHover'>
                  <span className='slideText transition-transform'>{bilgi[index].album}</span>
                </li>
                <li className='w-44 overflow-hidden text-ellipsis settingsToHover'>
                  <span className='slideText transition-transform'>{bilgi[index].name}</span>
                </li>
                <li className='w-44 overflow-hidden text-ellipsis settingsToHover'>
                  <span className='slideText transition-transform'>{bilgi[index].artists}</span>
                </li>
                <li className='w-44 overflow-hidden text-ellipsis'>
                  <span>{convertMsToMinutesSeconds(bilgi[index].durationMs)}</span>
                </li>
              </ul>
            </div>))}
        </div>
        <hr className='w-full h-1 bg-black my-2'/>
        <div className="w-full max-h-[90px] mt-5 pt-2 flex items-center justify-between text-white rounded">
          {renderSpotifyPlayer()}    
        </div>
      </div>
    </div>
  )
}
export default index;