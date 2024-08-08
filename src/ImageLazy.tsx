import { useEffect, useRef, useState } from "react";

// Definición del tipo para las props del componente ImageLazy
type ImagesLazy = {
  src: string; // URL de la imagen a cargar
  alt: string; // Texto alternativo para la imagen
  width?: number; // Ancho opcional de la imagen
  height?: number; // Alto opcional de la imagen
  id?: number | string; // ID opcional de la imagen
  className?: string; // Clase CSS opcional para estilizar la imagen
  title?: string; // Título opcional que se muestra al pasar el mouse sobre la imagen
  extraData?: React.ImgHTMLAttributes<HTMLImageElement>; // Atributos adicionales opcionales para la etiqueta <img>
};

// Componente ImageLazy para cargar imágenes de forma perezosa (lazy loading)
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
  // Referencia a la imagen en el DOM
  const imageRef = useRef<HTMLImageElement>(null);
  // Estado para saber si la imagen está en el viewport (intersección con la pantalla)
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  // useEffect para manejar la observación del elemento de imagen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Si la imagen está en el viewport
            setIsIntersecting(true); // Actualiza el estado para indicar que está en el viewport
            if (imageRef.current) {
              // Asigna la URL de la imagen al atributo src del elemento img
              imageRef.current.src = imageRef.current.dataset.src || "";
            }
            // Deja de observar la imagen una vez que ha sido cargada
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // Usa el viewport como el contenedor de referencia
        rootMargin: "0px", // No añade margen adicional al viewport
        threshold: 0.5, // El 50% de la imagen debe estar visible para activar el callback
      }
    );

    // Comienza a observar la imagen si el ref está asignado
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    // Limpieza del efecto: deja de observar la imagen al desmontar el componente
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [src]); // El efecto se ejecuta nuevamente si cambia el src

  // Renderizado de la imagen con soporte para lazy loading y estilos condicionales
  return (
    <img
      title={title} // Título opcional
      className={className} // Clase CSS opcional
      loading="lazy" // Atributo para indicar carga diferida (nativo en navegadores modernos)
      ref={imageRef} // Asigna el ref a la imagen
      data-src={src} // Asigna la URL de la imagen a data-src para ser usada más adelante
      alt={alt} // Texto alternativo
      width={width} // Ancho opcional
      height={height} // Alto opcional
      style={{
        filter: isIntersecting ? "none" : "blur(20px)", // Aplica desenfoque si la imagen no está visible
        transition: "filter 0.9s", // Transición suave al cargar la imagen
      }}
      id={id?.toString()} // Asigna el ID si está presente
      {...extraData} // Atributos adicionales opcionales
    />
  );
};

export default ImageLazy;
