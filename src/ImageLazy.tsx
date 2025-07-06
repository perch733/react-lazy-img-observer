import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Tipado completo para props del componente ImageLazy
export type ImagesLazy = {
  src: string; // URL de la imagen principal
  alt: string; // Texto alternativo para accesibilidad
  srcSet?: string; // Opciones de imagen responsiva
  sizes?: string; // Atributo sizes para imágenes adaptativas
  width?: number; // Ancho de la imagen
  height?: number; // Alto de la imagen
  id?: number | string; // ID único opcional
  className?: string; // Clases CSS personalizadas
  title?: string; // Tooltip de la imagen
  useTitleFromAlt?: boolean; // Usa el valor de alt como title si title no se define
  extraData?: React.ImgHTMLAttributes<HTMLImageElement>; // Atributos HTML adicionales para <img>
  viewTransitionName?: string; // Nombre para transición de vista (View Transitions API)
  style?: React.CSSProperties; // Estilos CSS en línea
  backgroundColor?: string; // Color de fondo mientras carga
  animationDuration?: string; // Duración de la animación de transición
  blurAmount?: string; // Intensidad del blur inicial
  fallbackSrc?: string; // Imagen alternativa si hay error de carga
  threshold?: number; // Umbral del IntersectionObserver (porcentaje visible)
  transitionType?: "blur" | "fade" | "scale" | "custom"; // Tipo de efecto visual al cargar
  onLoadComplete?: () => void; // Callback cuando la imagen se carga completamente
  visibleByDefault?: boolean; // Si la imagen se carga inmediatamente sin esperar el viewport
  loadingComponent?: React.ReactNode; // Componente a mostrar mientras se carga la imagen
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
  useTitleFromAlt = false,
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
  const imageRef = useRef<HTMLImageElement>(null); // Referencia al elemento <img>
  const [realSrc, setRealSrc] = useState<string | null>(
    visibleByDefault ? src : null
  ); // src real que se usará (se asigna cuando entra al viewport)
  const [loaded, setLoaded] = useState(false); // Estado de carga completada
  const [hasError, setHasError] = useState(false); // Estado de error en la imagen

  // Validaciones en entorno de desarrollo: alt y src
  useEffect(() => {
    const isDev =
      typeof window !== "undefined" &&
      window?.location?.hostname?.includes("localhost");

    if (isDev) {
      if (!alt) {
        console.warn(
          "[ImageLazy] ⚠️ Se recomienda definir el atributo 'alt' por accesibilidad."
        );
      }
      if (!src) {
        console.warn(
          "[ImageLazy] ⚠️ La prop 'src' está vacía o nula. La imagen no se cargará."
        );
      }
    }
  }, [alt, src]);

  // Configura el IntersectionObserver para cargar la imagen solo si entra al viewport
  useLayoutEffect(() => {
    if (typeof window === "undefined" || visibleByDefault) return;
    if (typeof IntersectionObserver === "undefined" || !imageRef.current)
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRealSrc(src); // Asigna el src real al entrar en vista
            observer.unobserve(entry.target); // Deja de observar una vez cargado
          }
        });
      },
      { root: null, rootMargin: "0px", threshold }
    );

    observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, [src, threshold, visibleByDefault]);

  // Callback cuando la imagen se carga exitosamente
  const handleLoad = () => {
    setLoaded(true);
    onLoadComplete?.();
  };

  // Manejo de error de carga
  const handleError = () => {
    if (fallbackSrc && realSrc !== fallbackSrc) {
      setRealSrc(fallbackSrc); // Si hay fallback, se intenta mostrarlo
    } else {
      setHasError(true); // Marca como error definitivo
    }
  };

  // Define los estilos de transición según el tipo especificado
  const isCustom = transitionType === "custom";

  const transitionStyles: React.CSSProperties = isCustom
    ? {} // Si es custom, el usuario define los estilos
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
      {/* Componente de carga opcional mientras no se ha cargado */}
      {!loaded && loadingComponent}

      {/* Imagen principal, solo si no hubo error */}
      {!hasError && (
        <img
          ref={imageRef}
          src={realSrc ?? undefined}
          alt={alt}
          title={title ?? (useTitleFromAlt ? alt : undefined)} // Si useTitleFromAlt está activo, usa alt como title
          className={className}
          width={width}
          height={height}
          loading="lazy"
          id={id?.toString()}
          onLoad={handleLoad}
          onError={handleError}
          srcSet={realSrc ? srcSet : undefined}
          sizes={realSrc ? sizes : undefined}
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
