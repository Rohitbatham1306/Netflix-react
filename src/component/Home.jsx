import React, { useEffect, useState } from 'react'
import "./Home.scss"
import  axios from 'axios'
import { BiPlay} from "react-icons/bi"
import { AiOutlinePlus} from "react-icons/ai"



const apikey = "5146b0264702d34a47e49d5141f2b921"
const url = "https://api.themoviedb.org/3"
const imgUrl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming"
const nowPlaying = "now_playing"
const popular = "popular"
const toprated = "top_rated"


const Card = ({ img }) => {
  return (
    <img className="card " src={img} alt='cover' />
  )
}

const Row = ({ title,
  arr = [{
    img: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F06%2Fstranger-things-1.jpg&q=60"
  }


  ] }) => {

  return (
    <div className='row'>

      <h2> {title}</h2>

      <div>

        {
          arr.map((item, index) => (
            <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
          ))
        }
      </div>

    </div>


  )
}

const Home = () => {
  const [upcomingmovies, setupcomingmovies] = useState([])
  const [nowPlayingmovies, setnowplayingmovies] = useState([])
  const [popularmovies, setpopularmovies]  = useState([])
  const [topratedmovies, setTopratedmovies] = useState([])

  useEffect(() => {

    const fetchupcoming = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}&page=5`)
      setupcomingmovies(results);
      console.log(upcomingmovies);
    };
    const fetchnowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apikey}&page=2`)
      setnowplayingmovies(results);
      console.log(nowPlayingmovies);
    };
    const fetchpopular = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apikey}`)
      setpopularmovies(results);
      console.log(popularmovies);
    };
    const fetchtoprated = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${toprated}?api_key=${apikey}`)
      setTopratedmovies(results);
      console.log(topratedmovies);
    };
    fetchupcoming();
    fetchnowPlaying();
    fetchpopular();
    fetchtoprated();
  },[])


  return (
    <section className='home'>
      <div className="banner" style={{

        backgroundImage: popularmovies[0] ? `url(${`${imgUrl}/${popularmovies[0].poster_path}`})` : "none"

      }}>

        {
          popularmovies[0]&&
          (
            <h1>{popularmovies[0].original_title}</h1>
          )

        }
        {
          popularmovies[0]&&(
         <p> {popularmovies[0].overview}</p>
          )
          
        }

        
        <div>
        <button>< BiPlay />Play</button>
        <button>My List < AiOutlinePlus/></button>
       
        </div>
          
       

      </div>
      <Row title={"Upcoming Movies"} arr={upcomingmovies} />
      <Row title={"Now Playing Movies"} arr={nowPlayingmovies} />
      <Row title={"Popular Movies"} arr={popularmovies} />
      <Row title={"Top Rated Movies"} arr={topratedmovies} />


    </section>



  )
}


export default Home