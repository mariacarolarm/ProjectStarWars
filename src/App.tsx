import React from 'react';
import './App.css';
import StarProvider from './context/provider';
import StarTable from './components/Table';

function App() {
  return (
    <StarProvider>
      <StarTable />
    </StarProvider>
  );
}

export default App;
