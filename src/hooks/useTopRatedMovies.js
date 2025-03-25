import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constant';
import { addTopRatedMovies } from '../utils/moviesSlice';
import { useEffect } from 'react';

const useTopRatedMovies = () => {
  
  //Fetch data from TMDB API and update store
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    console.log("reached");
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?page=1', 
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    console.log("reached useeffect");
    getTopRatedMovies();
  },[]);
};

export default useTopRatedMovies;