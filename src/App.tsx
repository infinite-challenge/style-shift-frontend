import React, { useEffect } from 'react';
import { useRef } from 'react';
import './App.css';

import Header from './header';
import Main from './main';
import GlobalStyle from './GlobalStyle';

function App() {

  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const [width, setWidth] = React.useState(windowSize.current[1]);
  const [height, setHeight] = React.useState(windowSize.current[0]);

  const handleResize = () => {
    windowSize.current = [window.innerHeight, window.innerWidth];
    setWidth(windowSize.current[1]);
    setHeight(windowSize.current[0]);
  }

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
    <GlobalStyle />
    <div className="App dark:bg-[#121217]"
      style={{height: height, width: width}}>
      <Header width={width} height={height * 0.065} />
      <Main width={width} height={height * 0.935} />
    </div>
    </>
  );
}

export default App;
