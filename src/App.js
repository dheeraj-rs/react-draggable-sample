import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import CallFlowManagement from './features/TestFlow/CallFlowManagement';

function App() {
  return (
    <Suspense>
      <div className="App">
        <Routes>
          <Route path="/">
            <Route path="main" element={<Main />} />
            <Route path="sample" element={<CallFlowManagement />} />
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
