import React,{useState} from 'react';
import './App.css';
import Details from './Components/Detail';
import Search from './Components/Search';
import axios from 'axios';
import Results from './Components/Results';

function App() {

  const [state, setState] = useState({
    s: "sherlock",
    results: [],
    selected: {},
  });

  
  const apiurl ="http://www.omdbapi.com/?apikey=19e8cce2";
  
  const searchInput = (e) => {
    let s = e.target.value;
  
    setState((prevState) => {
      return { ...prevState, s: s };
    });
  };
  
  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;
  
        console.log(results);
  
        setState((prevState) => {
          return { ...prevState, results: results };
        });
      });
    }
  };
  
  const openDetail = (id) => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;
  
      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };
  
  const closeDetail = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <div className="App">
    <header className="App-header">
      <h1>Movie List App</h1>
    </header>
    <main>
      <Search searchInput={searchInput} search={search} />

      <Results results={state.results} openDetail={openDetail} />

      {typeof state.selected.Title != "undefined" ? (
        <Details selected={state.selected} closeDetail={closeDetail} />
      ) : (
        false
      )}
    </main>
  </div>
  );
}

export default App;
