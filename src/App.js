import Navigation from "./components/Navigation";
import Home from "./components/Home";
import LetterTemplate from "./components/LetterTemplate";
import EssayOutline from "./components/EssayOutline";
import GrammarCorrector from "./components/GrammarCorrector";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/letter-template" exact element={<LetterTemplate />} />
          <Route path="/essay-outline" exact element={<EssayOutline />} />
          <Route
            path="/grammar-corrector"
            exact
            element={<GrammarCorrector />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
