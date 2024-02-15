import React from 'react';
import './main.css';

import test from './Assets/test.svg';

export default function Main(props: { width: number, height: number}) {

    const [windowWidth, windowHeight] = [props.width, props.height];
    const [image, setImage] = React.useState(
        {
            file: null,
            url: ""
        }
    );

    const fileRef = React.createRef<HTMLInputElement>();
    const imageRef = React.useRef<HTMLImageElement>(null);

    let reader = new FileReader();

    const handleImageClick = () => {
        fileRef.current?.click();
    }

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            e.target.value = '';

            const type = file.type.split('/')[0];
            
            if (type !== 'image') {
                alert('Please upload an image');
                return;
            }

            reader.readAsDataURL(file);

            reader.onloadend = () => {
                setImage({
                    file: file,
                    url: reader.result as string
                });
            }
        }
    }

    return (
        <div className="main-body-container inside-layout">
            <div style={{maxWidth: 1500}} className="main-body-component inside-layout">
                <div style={{maxHeight: 130}} className="main-body-title-container inside-layout">
                    <div className="main-body-title-box">
                        <div className="main-body-title inside-layout">
                            <span style={{}} className="main-body-title-text dark:text-[#FFFFFF] inside-layout">
                                Style Shift
                            </span>
                        </div>
                        <div className="main-body-subtitle inside-layout">
                            <div className="main-body-subtitle-layout">
                                <span className="main-body-subtitle-text inside-layout dark:text-[#9CA1BA]">
                                    Apply AI to your images
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="style-title-container inside-layout-1">
                    <div className="style-title inside-layout-0">
                        <span className="style-title-text inside-layout-0 dark:text-[#FFFFFF]">
                            Choose a style
                        </span>
                    </div>
                </div>

                <div className="style-container inside-layout-0">
                </div>

                <div  className="style-title-container inside-layout-1">
                    <div className="style-title inside-layout-0">
                        <span className="style-title-text inside-layout-0 dark:text-[#FFFFFF]">
                            Upload an Image
                        </span>
                    </div>
                </div>
                
                <div style={{marginTop: "1%"}} className="user-image-container">
                    <div className="user-image-box inside-layout-0">
                        {
                            image.file? 
                            <img 
                                src={image.url} 
                                style={{width: "100%"}} 
                                className="user-image cursor-pointer duration-300 hover:opacity-90"
                                alt="test" 
                                ref={imageRef} onClick={handleImageClick} />
                            :
                            <div style={{height: windowHeight * 0.45}} className="dashed-box inside-layer-0 dark:border-[#3B3D54]">
                                <div className="dashed-box-text dark:text-[#FFFFFF]">
                                    Click to upload
                                </div>
                                <button className="dashed-box-btn dark:bg-[#26293B] dark:text-[#FFFFFF]" onClick={handleImageClick}>
                                    Upload Image
                                </button>
                            </div>
                        }
                        <input type="file" ref={fileRef} onChange={handleImageChange} style={{display: "none"}} />
                    </div>
                </div>

                <button className="style-button inside-layout-0">
                    <span className="style-button-text inside-layout-0">
                        Start
                    </span>
                </button>
            </div>
        </div>
    );
}

