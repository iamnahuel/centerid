import './styles/app.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Login from './components/Login';
import Header from './components/Header';
import Admin from './components/Admin';
import Provider from './components/Context/Context';

function App() {
  return (
    <div className="App">
      <Provider>
        <Header />
        <Admin />
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
