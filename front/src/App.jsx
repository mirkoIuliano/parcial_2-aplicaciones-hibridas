import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import AppRoutes from './routes/AppRoutes';



const App = () => {

  
  
  
  return (
    <div>
      

      <Header />
      <main className="container">
        <div className="row">
          <div className="col-12 p-0 my-5">
          
            <AppRoutes/> {/* Acá va a ir todo el contenido */}

          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default App;

