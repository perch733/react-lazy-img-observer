# 📷 ImageLazy (v1.5.0)

![npm](https://img.shields.io/npm/v/react-lazy-img-observer)
![downloads](https://img.shields.io/npm/dw/react-lazy-img-observer)
![license](https://img.shields.io/npm/l/react-lazy-img-observer)

---

**ImageLazy** is a lightweight and customizable React component for lazy loading images using the Intersection Observer API. It includes fallback handling, visual effects, and support for custom loaders and transitions — perfect for performance-oriented applications.

**ImageLazy** es un componente liviano y personalizable de React para cargar imágenes perezosamente (lazy load) usando la API de Intersection Observer. Incluye manejo de errores, efectos visuales, y soporte para spinners personalizados y transiciones — ideal para aplicaciones optimizadas.

---

## 📚 Contenido

- [📦 Instalación](#-installation--instalación)
- [🚀 Uso Básico](#-usage--uso-básico)
- [📃 Tabla de Props](#-props-table--tabla-de-props)
- [🎨 Ejemplos Avanzados](#-advanced-example-with-spinner-and-fallback--ejemplo-avanzado-con-spinner-y-fallback)
- [💡 Uso de Props](#-prop-usage-with-examples--uso-de-props-con-ejemplos)
- [🔁 Efectos Visuales](#-effects--efectos-visuales)
- [🔧 Cómo funciona](#-how-it-works--cómo-funciona)
- [❓ FAQ](#-faq)
- [📊 Comparación](#-comparison-with-react-lazy-load-image-component--comparación-con-react-lazy-load-image-component)
- [📄 Licencia](#-license--licencia)
- [👤 Autor](#-author--autor)

---

## 📦 Installation / Instalación

```bash
npm install react-lazy-img-observer
```

## 📃 Props Table / Tabla de Props

| Prop                 | Tipo                                      | Por Defecto | Descripción (ES) / Description (EN)                             |
| -------------------- | ----------------------------------------- | ----------- | --------------------------------------------------------------- |
| `src`                | `string`                                  | –           | URL de la imagen / Image URL                                    |
| `alt`                | `string`                                  | –           | Texto alternativo / Alt text                                    |
| `srcSet`             | `string`                                  | –           | Set de imágenes responsive / Responsive image set               |
| `sizes`              | `string`                                  | –           | Tamaños para srcSet / Responsive sizes                          |
| `width`              | `number`                                  | –           | Ancho fijo / Fixed width                                        |
| `height`             | `number`                                  | –           | Alto fijo / Fixed height                                        |
| `id`                 | `string \| number`                        | –           | ID del elemento / Element ID                                    |
| `className`          | `string`                                  | –           | Clase CSS personalizada / Custom CSS class                      |
| `title`              | `string`                                  | –           | Atributo title del tag img / Tooltip text                       |
| `useTitleFromAlt`    | `boolean`                                 | `false`     | Usa el alt como title / Use `alt` value as `title`              |
| `extraData`          | `ImgHTMLAttributes<HTMLImageElement>`     | –           | Props adicionales para img / Extra native props                 |
| `viewTransitionName` | `string`                                  | –           | Nombre para View Transitions API                                |
| `style`              | `CSSProperties`                           | –           | Estilos inline / Inline styles                                  |
| `backgroundColor`    | `string`                                  | –           | Color de fondo mientras carga / Background while loading        |
| `animationDuration`  | `string`                                  | `0.9s`      | Duración de la transición / Animation duration                  |
| `blurAmount`         | `string`                                  | `20px`      | Desenfoque inicial / Initial blur effect                        |
| `fallbackSrc`        | `string`                                  | –           | Imagen fallback si falla / Fallback image if loading fails      |
| `threshold`          | `number`                                  | `0.5`       | Umbral de visibilidad / Intersection threshold                  |
| `transitionType`     | `'blur' \| 'fade' \| 'scale' \| 'custom'` | `'blur'`    | Tipo de transición visual / Type of transition                  |
| `onLoadComplete`     | `() => void`                              | –           | Callback al cargar / Callback after image is fully loaded       |
| `visibleByDefault`   | `boolean`                                 | `false`     | Cargar sin lazy / Load immediately without waiting for viewport |
| `loadingComponent`   | `ReactNode`                               | –           | Componente mientras carga / Custom loader component             |

---

---

## 🔁 Effects / Efectos Visuales

| Effect   | Description                                                                               |
| -------- | ----------------------------------------------------------------------------------------- |
| `blur`   | Apply blur and remove it after load / Aplicar desenfoque y eliminarlo después de cargar   |
| `fade`   | Fade in the image / Desvanecimiento de la imagen                                          |
| `scale`  | Slight zoom effect / Ligero efecto de zoom                                                |
| `custom` | Use your own CSS (add class to image) / Utilice su propio CSS (agregue clase a la imagen) |

---

---

## 🚀 Usage / Uso Básico

```tsx
import ImageLazy from "react-lazy-img-observer";

function App() {
  return (
    <ImageLazy
      src="https://example.com/photo.jpg"
      alt="Example image"
      width={400}
      height={300}
    />
  );
}
```

### ✅ Explicación:

- `src`: URL de la imagen / Image URL.
- `alt`: Texto descriptivo para accesibilidad y SEO / Descriptive text for accessibility and SEO.
- `width` / `height`: Definen tamaño fijo (opcional pero recomendable para evitar reflow / Define fixed size (optional but recommended to avoid reflow).

---

## 🎨 Advanced Example with Spinner and Fallback / Ejemplo Avanzado con Spinner y Fallback

```tsx
import ImageLazy from "react-lazy-img-observer";

const Spinner = () => <div className="spinner">Loading...</div>;

function GalleryImage() {
  return (
    <ImageLazy
      src="/img/cat.webp"
      alt="Cute Cat"
      width={300}
      height={200}
      fallbackSrc="/img/fallback.webp"
      backgroundColor="#eee"
      animationDuration="1s"
      blurAmount="8px"
      transitionType="fade"
      loadingComponent={<Spinner />}
    />
  );
}
```

---

## 💡 Prop Usage with Examples / Uso de Props con Ejemplos

### 📍 `fallbackSrc`

```tsx
<ImageLazy
  src="/img/main.jpg"
  fallbackSrc="/img/fallback.jpg"
  alt="Imagen principal"
/>
```

👉 Si la imagen original falla, se muestra automáticamente la alternativa / If the original image fails, the alternative is automatically displayed.

---

### 🎨 `backgroundColor`

```tsx
<ImageLazy
  src="/img/pic.jpg"
  alt="Imagen con fondo gris"
  backgroundColor="#f0f0f0"
/>
```

👉 Color visible mientras la imagen carga (mejora UX) / Color visible while image loads (UX improvement).

---

### 💫 `blurAmount` y `animationDuration`

```tsx
<ImageLazy
  src="/img/blurred.jpg"
  alt="Efecto blur personalizado"
  blurAmount="5px"
  animationDuration="2s"
/>
```

👉 Controla el desenfoque inicial y duración del efecto / Controls the initial blur and duration of the effect.

---

### 🌀 `transitionType`

```tsx
<ImageLazy src="/img/pic.jpg" alt="Fade in" transitionType="fade" />
<ImageLazy src="/img/pic.jpg" alt="Scale in" transitionType="scale" />
<ImageLazy src="/img/pic.jpg" alt="Custom CSS" transitionType="custom" className="img-fx" />
```

**CSS (ejemplo avanzado):**

```css
.img-fx {
  opacity: 0;
  transform: scale(0.8) rotate(-2deg);
  transition: all 0.8s ease;
}
.img-fx.loaded {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}
```

👉 Usa `custom` para controlar completamente la animación con tu propio CSS / Use `custom` to fully control the animation with your own CSS.

---

### 🔁 `visibleByDefault`

```tsx
<ImageLazy src="/img/pic.jpg" alt="Carga inmediata" visibleByDefault={true} />
```

👉 Útil cuando no deseas esperar a que la imagen entre al viewport (ej: SSR o cuando ya está precargada / Useful when you don't want to wait for the image to enter the viewport (e.g. SSR or when it is already pre-loaded).

---

## 🔧 How it works / ¿Cómo funciona?

- When `visibleByDefault` is `false` (default), the image loads only when it's in the viewport (IntersectionObserver)/Cuando `visibleByDefault` es `false` (predeterminado), la imagen se carga solo cuando está en la ventana gráfica (IntersectionObserver).
- If `visibleByDefault` is `true`, the image is loaded immediately (useful for SSR or cached images)/Si `visibleByDefault` es `true`, la imagen se carga inmediatamente (útil para SSR o imágenes almacenadas en caché).
- You can add a custom CSS transition, fallback, background color, and even a loading spinner/Puede agregar una transición CSS personalizada, una alternativa, un color de fondo e incluso un indicador de carga.

---

### 🧭 `loadingComponent`

```tsx
<ImageLazy
  src="/img/loading.jpg"
  alt="Con spinner"
  loadingComponent={<div className="spinner">Cargando...</div>}
/>
```

👉 Muestra un componente personalizado mientras se carga la imagen / Display a custom component while the image is loading.

---

### 🧪 `onLoadComplete`

```tsx
function handleLoad() {
  console.log("¡Imagen completamente cargada!");
}

<ImageLazy
  src="/img/event.jpg"
  alt="Imagen con evento"
  onLoadComplete={handleLoad}
/>;
```

### 🔁 `onLoadComplete` con lógica avanzada / with advanced logic

```tsx
const [estado, setEstado] = useState("cargando");

<ImageLazy
  src="/img/camara.jpg"
  alt="Avanzado"
  onLoadComplete={() => setEstado("cargada")}
/>
<p>Estado de imagen: {estado}</p>
```

### ✅ `onLoadComplete` con múltiples imágenes / with multiple images

```tsx
const [cargas, setCargas] = useState(0);

const incrementar = () => setCargas((prev) => prev + 1);

<ImageLazy src="/img/uno.jpg" alt="uno" onLoadComplete={incrementar} />
<ImageLazy src="/img/dos.jpg" alt="dos" onLoadComplete={incrementar} />
<p>Imágenes cargadas: {cargas}</p>
```

---

### 🧷 `useTitleFromAlt`

```tsx
<ImageLazy
  src="/img/title.jpg"
  alt="Una imagen informativa"
  useTitleFromAlt={true}
/>
```

👉 Usa el valor de `alt` también como atributo `title` automáticamente. Útil para tooltips nativos / Automatically uses the `alt` value as the `title` attribute as well. Useful for native tooltips..

---

### 🖼 `viewTransitionName`

```tsx
<ImageLazy
  src="/img/view.jpg"
  alt="Transición de vista"
  viewTransitionName="fade-image"
/>
```

👉 Para integrar con la API de `view-transition` (Chrome ≥ 111) y hacer animaciones entre páginas con `<ViewTransition>` / To integrate with the `view-transition` API (Chrome ≥ 111) and make animations between pages with `<ViewTransition>`.

---

### 🏷️ `id` (uso en scroll o testing)

```tsx
<ImageLazy
  src="/img/anchor.jpg"
  alt="Imagen anclada"
  id="fotoPrincipal"
/>
<a href="#fotoPrincipal">Ir a la imagen</a>
```

👉 Permite identificar la imagen fácilmente para navegación, testing u operaciones DOM / Allows you to easily identify the image for navigation, testing, or DOM operations..

---

### 📐 `srcSet` y `sizes`

```tsx
<ImageLazy
  src="/img/400.jpg"
  srcSet="/img/400.jpg 400w, /img/800.jpg 800w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Imagen responsive"
/>
```

👉 Mejora el rendimiento en dispositivos móviles cargando imágenes más ligeras según el ancho de pantalla / Improves performance on mobile devices by loading images smaller based on screen width.

---

### 🧩 `extraData`, `className`, `style`

```tsx
<ImageLazy
  src="/img/extra.jpg"
  alt="Con extras"
  className="rounded shadow"
  style={{ objectFit: "cover" }}
  extraData={{ draggable: false, crossOrigin: "anonymous" }}
/>
```

👉 Puedes personalizar todo el comportamiento nativo de `<img>` sin limitaciones / You can customize all native behavior of `<img>` without limitations.

---

## 🌐 SSR Compatible / Compatible con SSR

ImageLazy is safe to use in SSR environments (like Next.js). It checks for `window` and disables IntersectionObserver logic when rendering on the server.

ImageLazy es seguro para entornos con renderizado del lado del servidor como Next.js. Detecta si `window` está disponible antes de usar IntersectionObserver.

---

## 📊 Comparison with react-lazy-load-image-component / Comparación con react-lazy-load-image-component

| Feature / Característica                    | `ImageLazy` ✅                     | `react-lazy-load-image-component` ❌           |
| ------------------------------------------- | ---------------------------------- | ---------------------------------------------- |
| Lightweight & no external dependencies      | ✅ Yes / Sí                        | ❌ No (más pesado y con múltiples componentes) |
| SSR Friendly (Next.js compatible)           | ✅ Yes / Sí                        | ✅ Yes / Sí                                    |
| Custom transitions via CSS (`custom`)       | ✅ Yes / Sí                        | ❌ No                                          |
| Native spinner support (`loadingComponent`) | ✅ Yes / Sí                        | ❌ No (solo con workarounds)                   |
| Fallback support (`fallbackSrc`)            | ✅ Yes / Sí                        | ✅ Yes / Sí                                    |
| Responsive images (`srcSet` and `sizes`)    | ✅ Yes / Sí                        | ✅ Yes / Sí                                    |
| Load other elements lazily                  | ❌ Images only / Solo imágenes     | ✅ Yes (via `LazyLoadComponent`)               |
| Built-in effects                            | ✅ `blur`, `fade`, `scale`, custom | ✅ `blur`, `opacity`, `bw`                     |
| Transition customization                    | ✅ Total freedom with CSS          | ❌ Limited                                     |

---

## ❓ FAQ

**¿Por qué mi imagen no se muestra?** / **Why isn't my image showing?**  
Asegúrate de que `src` no sea `null`, y revisa si `visibleByDefault` está en `true` / Make sure `src` is not `null`, and check if `visibleByDefault` is set to `true`..

**¿Puedo usarlo en SSR como Next.js?** / **Can I use it in SSR like Next.js?**
Sí. Internamente revisa si `window` existe antes de ejecutar el observer / Yes. Internally it checks if `window` exists before running the observer.

**¿Cómo puedo aplicar una animación personalizada?** / **How ​​can I apply a custom animation?**  
Usa `transitionType="custom"` y define tu clase con efectos CSS / Use `transitionType="custom"` and define your class with CSS effects.

---

## 📄 License / Licencia

[MIT License](./LICENSE)

---

## 👤 Author / Autor

**Percy Chuzon**\
📧 [contacto@percychuzon.com](mailto:contacto@percychuzon.com)\
🌐 [https://percychuzon.com](https://percychuzon.com)

---

## 💡 Tip

If you want more control, just set `transitionType="custom"` and style the image with CSS. It’s that simple.

Si deseas más control, usa `transitionType="custom"` y aplica tus estilos con CSS. Así de simple.

---

Happy loading! 🎉 / ¡Carga feliz! 🎉
