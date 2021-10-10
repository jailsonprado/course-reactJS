import React from 'react';

const App = () => {
  const video = React.useRef();
  console.log(video);

  return (
    <>
      <div ref={video}>Teste</div>
    </>
  );
};

export default App;
