import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center text-white'>
        <div className="max-w-5xl flex flex-col items-center mb-5 px-12 py-16 bg-black/70 rounded">
            <p className='text-lg text-center font-bold'>Hi! I am Muhammed Furkan Ardıç, a Computer Engineering student at Konya Technical University. I am a passionate individual in the field of web development and I constantly focus on self-improvement. During my computer engineering education, I have gained a wide range of knowledge and experience. I have been actively using fundamental web languages such as HTML, CSS, and JavaScript. Furthermore, I prefer React to develop modern web applications. React offers a powerful component-based approach that allows me to create modular and reusable code components. This makes my projects more organized and scalable. I aim to showcase these skills and experiences on my portfolio website to establish myself in the field of web development. My goal is to create creative and user-friendly projects and leave an impressive digital presence.
If you would like to get in touch with me, learn more about my projects, or explore collaboration opportunities, please feel free to contact me. I would be happy to provide you with quick and effective solutions.
Thank you and I appreciate your visit in advance!</p>
        
        </div>
      <Link to='/home' className='bg-green-600 py-3 px-7 text-white rounded font-semibold hover:text-gray-200 hover:bg-green-700 transition-all'>Home</Link>
    </div>
  )
}

