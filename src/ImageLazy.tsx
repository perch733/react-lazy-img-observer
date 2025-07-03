// ImageLazy v1.4.0 con loadingComponent y efecto personalizado ("custom")
import { useEffect, useRef, useState } from "react";

export type ImagesLazy = {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  id?: number | string;
  className?: string;
  title?: string;
  extraData?: React.ImgHTMLAttributes<HTMLImageElement>;
  viewTransitionName?: string;
  style?: React.CSSProperties;
  backgroundColor?: string;
  animationDuration?: string;
  blurAmount?: string;
  fallbackSrc?: string;
  threshold?: number;
  transitionType?: "blur" | "fade" | "scale" | "custom";
  onLoadComplete?: () => void;
  visibleByDefault?: boolean;
  loadingComponent?: React.ReactNode; // NUEVO
};

const ImageLazy = ({
  src,
  alt,
  srcSet,
  sizes,
  width,
  height,
  className,
  id,
  extraData,
  title,
  viewTransitionName,
  style,
  backgroundColor,
  animationDuration = "0.9s",
  blurAmount = "20px",
  fallbackSrc,
  threshold = 0.5,
  transitionType = "blur",
  onLoadComplete,
  visibleByDefault = false,
  loadingComponent,
}: ImagesLazy) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [realSrc, setRealSrc] = useState<string | null>(
    visibleByDefault ? src : null
  );
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || visibleByDefault) return;
    if (typeof IntersectionObserver === "undefined" || !imageRef.current)
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRealSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold }
    );

    observer.observe(imageRef.current);
    return () => observer.disconnect();
  }, [src, threshold, visibleByDefault]);

  const handleLoad = () => {
    setLoaded(true);
    onLoadComplete?.();
  };

  const handleError = () => {
    if (fallbackSrc && realSrc !== fallbackSrc) {
      setRealSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  const isCustom = transitionType === "custom";

  const transitionStyles: React.CSSProperties = isCustom
    ? {}
    : transitionType === "fade"
    ? {
        opacity: loaded ? 1 : 0,
        transition: `opacity ${animationDuration}`,
      }
    : transitionType === "scale"
    ? {
        transform: loaded ? "scale(1)" : "scale(1.05)",
        opacity: loaded ? 1 : 0,
        transition: `transform ${animationDuration}, opacity ${animationDuration}`,
      }
    : {
        filter: loaded ? "none" : `blur(${blurAmount})`,
        transition: `filter ${animationDuration}`,
      };

  return (
    <>
      {!loaded && loadingComponent}
      {!hasError && (
        <img
          ref={imageRef}
          src={realSrc ?? ""}
          alt={alt}
          title={title}
          className={className}
          width={width}
          height={height}
          loading="lazy"
          id={id?.toString()}
          onLoad={handleLoad}
          onError={handleError}
          srcSet={srcSet}
          sizes={sizes}
          style={{
            backgroundColor:
              !loaded && backgroundColor ? backgroundColor : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            ...(viewTransitionName ? { viewTransitionName } : {}),
            ...transitionStyles,
            ...style,
          }}
          {...extraData}
        />
      )}
    </>
  );
};

export default ImageLazy;
export { ImageLazy };
