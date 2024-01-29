import React from 'react';
import './App.css';

import { useRef } from 'react';

import Sidebar from './sidebar';

function App() {

  const windowSize = useRef([window.innerHeight, window.innerWidth]);

  const sidebarSettingWidth = 360;
  const sidebarSettingHeight = 190;

  const [isMobile, setIsMobile] = React.useState(false);
  const [width, setWidth] = React.useState(windowSize.current[1]);
  const [height, setHeight] = React.useState(windowSize.current[0]);

  const handleResize = () => {
    windowSize.current = [window.innerHeight, window.innerWidth];
    setWidth(windowSize.current[1]);
    setHeight(windowSize.current[0]);
    setIsMobile(window.innerWidth < 2 * sidebarSettingWidth);
  }

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      <div className="h-screen w-screen fixed overflow-hidden">
        {/* <Header /> */}
        <div className={`flex h-full ${isMobile ? 'flex-col-reverse' : 'flex-row'}`}>
          <Sidebar isMobile={isMobile} width={isMobile ? width : sidebarSettingWidth} height={isMobile ? sidebarSettingHeight : height} />
          <ImageContainer width={isMobile ? width : width - sidebarSettingWidth} height={isMobile ? height - sidebarSettingHeight : height} />
        </div>
      </div>
    </div>
  );
}


// ImageContainer : Image Upload, Image Display
function ImageContainer(props: {width: number, height: number}) {

  const { width, height } = props;
  const [image, setImage] = React.useState({
    file: null,
    url: ''
  });

  const handleButtonClicked = () => {
    fileRef.current?.click();
  }

  const fileRef = React.createRef<HTMLInputElement>();
  const imageRef = React.useRef<HTMLImageElement>(null);

  let reader = new FileReader();

  // image upload
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      e.target.value = '';
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        alert('Please upload a valid image file');
        return;
      }
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImage({url: reader.result as string, file: file});
      }
    }
  }

  const deleteImage = () => {
    setImage({url: '', file: null});
  }

  return (
    <div className="canvas-container bg-gray-200" style={{width: width, height: height}}>
      {/* image upload part */}
      <div className="image-upload-container h-full w-full flex items-center justify-center">
        <div className="image-container p-10 w-full h-full items-center justify-center flex flex-col">
          {/* image display */}
          { image.file ?
          <div className="image-display-border w-full h-full flex items-center justify-center flex-col">
            <div className={`image-display-info-container h-7 w-11/12 max-w-3xl flex items-center bg-gray-700 rounded-t-lg bg-gray-700 flex flex-row px-3`} >
              <div className="bg-red-400 rounded-full w-3 h-3 cursor-pointer hover:bg-red-500 duration-300 ease-in-out"
                onClick={deleteImage}
              >
              </div>
            </div>
            <div className="image-display-container rounded-lg w-11/12 flex items-center justify-center">
              <img src={image.url} 
                alt="user-img"
                className="image-display w-full max-w-3xl object-contain rounded-b-lg cursor-pointer hover:opacity-80 duration-300 ease-in-out shadow-lg"
                onClick={handleButtonClicked} 
                ref={imageRef}
                // onLoad={handleImageLoad}
              />
              <input
                type="file"
                ref={fileRef}
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <div
              className="image-download-button bg-indigo-500 w-32 rounded-lg cursor-pointer hover:bg-indigo-600 duration-300 ease-in-out flex items-center justify-center py-2 mt-5 text-white font-bold"
            >
              <a href={image.url} download="image.jpg" onClick={() => console.log(image)}>
                Download
              </a>
            </div>
          </div>
            :
          <div className="image-upload-border bg-white my-80 rounded-lg w-full max-w-4xl h-full flex items-center justify-center flex-col shadow-lg">
            {/* image icon */}
            <div className="image-upload-icon-container bg-white rounded-full w-32 h-32 flex items-center justify-center" onClick={() => console.log(image)}>
              <img src="https://img.icons8.com/ios/452/image.png" alt="icon" className="image-upload-icon" />
            </div>
            <div>
              <div 
                className="image-upload-text-container bg-indigo-500 w-32 h-12 rounded-lg cursor-pointer hover:bg-indigo-600 duration-300 ease-in-out flex items-center justify-center shadow-lg"
                onClick={handleButtonClicked}
                >
                <div className="image-upload-text font-bold text-white select-none">Upload Image</div>
              </div>
              <input 
                type="file" 
                ref={fileRef}
                className="hidden"
                onChange={handleImageUpload} 
              />
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App;
