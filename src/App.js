import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Detalhes from "./pages/Detalhes";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/detalhes" exact component={Detalhes} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
