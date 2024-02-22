import React from 'react';
import './main.css';
import { API, StyleTag, StyleImage } from './api';

export default function Main(props: { width: number, height: number}) {

    const [windowWidth, windowHeight] = [props.width, props.height];
    const [image, setImage] = React.useState(
        {
            file: null,
            url: ""
        }
    );
    const [styleTagList, setStyleTagList] = React.useState([] as StyleTag[]);
    const [styleImageList, setStyleImageList] = React.useState([] as StyleImage[]);
    const [styleTag, setStyleTag] = React.useState(-1);
    const [style, setStyle] = React.useState(-1);

    const styleList = {
        "normal": "dark:text-[#FFFFFF] text-[#000000] dark:hover:bg-[#FAFAFA] bg-[#EDF0F2] hover:bg-[#3B3D54] dark:bg-[#26293B] dark:hover:text-[#000000] hover:text-[#FFFFFF]",
        "clicked": "dark:text-[#000000] text-[#FFFFFF] dark:bg-[#FAFAFA] bg-[#3B3D54] hover:opacity-90"
    }

    const getStyleTagList = async () => {
        const styleTags = await API.getStyleTags();
        setStyleTagList(styleTags);
    }

    const getStyleImageList = async (styleTagId: number) => {
        const styleImages = await API.getStyleImagesByTagId(styleTagId);
        setStyleImageList(styleImages);
    }

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

    const handleStyleTagClick = (index: number) => {
        
        if (styleTag === index) {
            setStyleTag(-1);
            return;
        }

        getStyleImageList(index);
        setStyleTag(index);
    }

    const handleStyleClick = (index: number) => {

        if (style === index) {
            setStyle(-1);
            return;
        }

        setStyle(index);
    }

    React.useEffect(() => {
        getStyleTagList();
    }, []);

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
                <div className="style-list-container inside-layout-1">
                    <div className="style-list inside-layout-1">
                        {
                            styleTagList.map((tagObject, index) => {
                                return (
                                    <div key={tagObject.id} className={`style-item inside-layout-0 cursor-pointer duration-0 
                                        ${styleTag === tagObject.id ? styleList["clicked"] : styleList["normal"]}
                                        `}
                                        onClick={() => handleStyleTagClick(tagObject.id)}    
                                    >
                                        <div className="style-item-layout duration-0">
                                            <div className="style-text duration-0">
                                                {tagObject.tag}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                        
                    </div>
                </div>
                <div className={`${styleTag !== -1 && styleImageList.length > 0 ? "style-list-container inside-layout-1" : ""}`} style={{paddingTop: 0}}>
                    {
                            (styleTag !== -1 && styleImageList.length > 0) &&
                            <div className="style-list inside-layout-1">
                                <div className="style-list-layout" style={{width: Math.max(windowWidth, 500) * 0.72192 }}>
                                {
                                    styleImageList.map((imageObject, index) => {
                                        return (
                                            <div key={imageObject.id} className={`style-image-container style-text style-select ${imageObject.id === style ? "border-[#3B3D54] dark:border-[#FFFFFF]" : "border-transparent"} hover:opacity-70 text-[#000000] dark:text-[#FFFFFF] cursor-pointer duration-0 `}
                                                onClick={() => handleStyleClick(imageObject.id)}
                                            >
                                                <img src={imageObject.imageUrl} className='style-image' />
                                                {imageObject.title}
                                            </div>
                                        );
                                    })
                                }
                                </div>
                            </div>
                        }
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
                                <button className={"dashed-box-btn cursor-pointer " + styleList.normal}
                                onClick={handleImageClick}>
                                    Upload Image
                                </button>
                            </div>
                        }
                        <input type="file" ref={fileRef} onChange={handleImageChange} style={{display: "none"}} />
                    </div>
                </div>
                <div className="style-button-container inside-layout-2">
                    <button className="style-button inside-layout-0">
                        <span className="style-button-text inside-layout-0">
                            Start
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}