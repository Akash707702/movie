import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
const Newmovie = () => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const location = useLocation();
  let specificmovie = location.state.Items;
  let [trailer, setTrailer] = useState();

  // async function searchTrailer(id) {
  //   fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=0eaa440e837bfb3f125fe42065d98f70`)
  //     .then(res => { res.json() }).then(data => setTrailer(data.results[0].key))
  // }

  async function searchTrailer(id) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=0eaa440e837bfb3f125fe42065d98f70`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trailer");
      }
      const data = await response.json();
      const trailerKey = data.results[0]?.key; // Using optional chaining in case there are no results
      setTrailer(trailerKey);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  }

  return (
    <div>
      <h1>{specificmovie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${specificmovie.backdrop_path}`}
        alt=""
        height="200px"
        width="200px"
      />
      <button onClick={() => searchTrailer(specificmovie.id)}>
        play trailer
      </button>
      {trailer && (
        <YouTube videoId={trailer} opts={opts}  />
      )}
    </div>
  );
};

export default Newmovie;
