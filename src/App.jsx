import React from "react"
import { BrowserRouter  , Routes , Route  } from "react-router-dom";
import Home from "./component/Home";
import Header from "./component/header/Header";





function App() {
  return (
<BrowserRouter>

<Header/>

<Routes>
  <Route path="/" element ={<Home/>}/>
</Routes>



</BrowserRouter>


    
  )
}

export default App;
