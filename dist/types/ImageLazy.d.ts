type ImagesLazy = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    id?: number | string;
    className?: string;
    title?: string;
    extraData?: React.ImgHTMLAttributes<HTMLImageElement>;
};
declare const ImageLazy: ({ src, alt, width, height, className, id, extraData, title, }: ImagesLazy) => import("react/jsx-runtime").JSX.Element;
export default ImageLazy;
