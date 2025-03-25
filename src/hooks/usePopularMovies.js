import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constant';
import { addPopularMovies } from '../utils/moviesSlice';
import { useEffect } from 'react';

const usePopularMovies = () => {
  
  //Fetch data from TMDB API and update store
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    console.log("reached");
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?page=1', 
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    console.log("reached useeffect");
    getPopularMovies();
  },[]);
};

export default usePopularMovies;