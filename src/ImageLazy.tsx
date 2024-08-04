import { useEffect, useRef, useState } from "react";

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

const ImageLazy = ({
  src,
  alt,
  width,
  height,
  className,
  id,
  extraData,
  title,
}: ImagesLazy) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            if (imageRef.current) {
              imageRef.current.src = imageRef.current.dataset.src || "";
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [src]);

  return (
    <img
      title={title}
      className={className}
      loading="lazy"
      ref={imageRef}
      data-src={src}
      alt={alt}
      width={width}
      height={height}
      style={{
        filter: isIntersecting ? "none" : "blur(20px)",
        transition: "filter 0.9s",
      }}
      id={id?.toString()}
      {...extraData}
    />
  );
};

export default ImageLazy;
