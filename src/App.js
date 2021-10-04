import './App.css';
import React, {useState} from "react";
import Axios from "axios";
import Recipe from "./components/Recipe";
import {v4 as uuidv4} from "uuid";
import Alert from "./components/Alert";

function App() {
    const[query, setQuery] = useState("");
    const[recipes, setRecipes] =useState([]);
    const[alert, setAlert] = useState("");

    const APP_ID ="2344ae4c"
    const APP_KEY = "e094f9f948438eeef637d9def87d1ceb"
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`

    async function getData() {
        if(query !== ""){
            const result = await Axios.get(url);
            if(!result.data.more) {
                return setAlert("No food with such name")
            }
            setRecipes(result.data.hits)
            console.log(result);
            setAlert("");
            setQuery("");
        } else{
            setAlert("Please fill the form")
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        getData();
    }

  return (
    <div className="App">
      <h1 onClick={getData}>Food</h1>
        <form className="search-form" onSubmit={onSubmit}>
            {alert !== "" && <Alert alert={alert}/>}
            <input
                type="text"
                placeholder="Search food"
                autoComplete="off"
                value={query}
                onChange={(e) =>setQuery(e.target.value)}
            />
            <input type="submit" value="search"/>
        </form>
        <div className="recipes">
            {recipes !== [] && recipes.map(recipe =>
                <Recipe key={uuidv4()} recipe={recipe}/>)}
        </div>
    </div>
  );
}

export default App;
