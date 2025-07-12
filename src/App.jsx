
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <HomePage />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="mt-16"
          toastClassName="relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
          bodyClassName="flex text-sm font-white font-med block p-3"
        />
      </div>
    </AuthProvider>
  );
}

export default App;