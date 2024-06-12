import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthWrapper } from './context/authContext.jsx';
import { SearchWrapper } from './context/SearchContext.jsx';
import { CartWrapper } from './context/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthWrapper>
    <SearchWrapper>
      <CartWrapper>
        <App />
      </CartWrapper>
    </SearchWrapper>
  </AuthWrapper>,
)
