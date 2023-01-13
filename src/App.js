import React, { Component } from 'react'; // 리액트를 구현할 수 있는 플러그인을 연결
import Header from './component/Header';
import Main from './component/Main';
import Graph from './component/Graph';

function App() {
  return (
    <div>
      <Header />
      <Main />
      {/* <Graph /> */}
    </div>
  );
}

export default App;