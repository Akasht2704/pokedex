import { Route, Routes   } from "react-router-dom";
import Pokedex from "../components/Pokedex/Pokedex";
import PokemonDetails from "../components/PokemonDetails/PokemonDetails";


function CustomRoutes() {
    return(
  <Routes>
     <Route path="/" element={<Pokedex/>}></Route>
     <Route path="/pokemon/:idd" element={<PokemonDetails/>}></Route>
  </Routes>);  
}
export default CustomRoutes;