import Navigation from './components/Navigation';
import Home from './components/Home';
import ProductDesc from './components/ProductDesc';
import ColdEmails from './components/ColdEmails';
import Tweets from './components/Tweets';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/product-desc" exact element={<ProductDesc />} />
          <Route path="/cold-emails" exact element={<ColdEmails />} />
          <Route path="/tweets" exact element={<Tweets />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
