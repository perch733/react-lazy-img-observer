import { useEffect, useRef, useState } from "react";

// Tipo para las props del componente
type ImagesLazy = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  id?: number | string;
  className?: string;
  title?: string;
  extraData?: React.ImgHTMLAttributes<HTMLImageElement>;
  viewTransitionName?: string;
  style?: React.CSSProperties;
};

// Componente principal
const ImageLazy = ({
  src,
  alt,
  width,
  height,
  className,
  id,
  extraData,
  title,
  viewTransitionName,
  style,
}: ImagesLazy) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // Verifica si el navegador soporta IntersectionObserver
    if (typeof IntersectionObserver === "undefined" || !imageRef.current) {
      return;
    }

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
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <img
      ref={imageRef}
      data-src={src}
      alt={alt}
      title={title}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      id={id?.toString()}
      style={{
        filter: isIntersecting ? "none" : "blur(20px)",
        transition: "filter 0.9s",
        viewTransitionName,
        ...style,
      }}
      {...extraData}
    />
  );
};

export default ImageLazy;
export { ImageLazy };
