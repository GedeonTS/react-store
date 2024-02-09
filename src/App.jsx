import './App.css'
import Caroussel from './components/Caroussel'
import Options from './components/Options'
import Products from './components/Products'

function App() {

  return (
    <div className="App">
      <div className="container">

    <Caroussel/>
    <Options/>
    <Products listTitle="Best Deals" key="1"/>
    <Products listTitle ="New in" key="2"/>
    <Products listTitle="Most Popular" key="3"/>
    <Products listTitle="Best Sellers" key="4"/>
    <Products listTitle="Trending" key="5"/>
    <Products listTitle="Top Rated" key="6"/>
    </div>

    </div>
  )
}

export default App
