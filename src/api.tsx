import axios from 'axios';

export class StyleTag {
    id: number;
    tag: string;

    constructor(id: number, tag: string) {
        this.id = id;
        this.tag = tag;
    }
}

export class StyleImage {
    id: number;
    styleTagId: number;
    imageUrl: string;
    title: string;

    constructor(id: number, styleTagId: number, imageUrl: string, title: string) {
        this.id = id;
        this.styleTagId = styleTagId;
        this.imageUrl = imageUrl;
        this.title = title;
    }
}

export class API {
    static async createStyleTag(tag: string): Promise<StyleTag> {
        const response = await axios(
            {
                method: 'post',
                url: `${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/style-tag/`,
                data: {
                    tag: tag
                }
            }
        );
        return response.data;
    }

    static async getStyleTags(): Promise<StyleTag[]> {
        const response = await axios(
            {
                method: 'get',
                url: `${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/style-tag/`
            }
        );
        return response.data;
    }

    static async createStyleImage(styleTagId: number, imageUrl: string, title: string): Promise<StyleImage> {
        const response = await axios(
            {
                method: 'post',
                url: `${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/style-image/`,
                data: {
                    styleTagId: styleTagId,
                    imageUrl: imageUrl,
                    title: title
                }
            }
        );
        return response.data;
    }

    static async getStyleImages(): Promise<StyleImage[]> {
        const response = await axios(
            {
                method: 'get',
                url: `${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/style-image/`
            }
        );
        return response.data;
    }

    static async getStyleImagesByTagId(styleTagId: number): Promise<StyleImage[]> {
        const response = await axios(
            {
                method: 'get',
                url: `${process.env.REACT_APP_API_SERVER_URL}:${process.env.REACT_APP_API_SERVER_PORT}/style-tag/${styleTagId}/image/`
            }
        );
        return response.data;
    }
}