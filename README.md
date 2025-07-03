# 📷 ImageLazy (v1.4.0)

**ImageLazy** is a lightweight and customizable React component for lazy loading images using the Intersection Observer API. It includes fallback handling, visual effects, and support for custom loaders and transitions — perfect for performance-oriented applications.

**ImageLazy** es un componente liviano y personalizable de React para cargar imágenes perezosamente (lazy load) usando la API de Intersection Observer. Incluye manejo de errores, efectos visuales, y soporte para spinners personalizados y transiciones — ideal para aplicaciones optimizadas.

---

## 📦 Installation / Instalación

```bash
npm install react-lazy-img-observer
```

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

## 💫 Custom Transition with Your Own CSS / Transiciones Personalizadas con CSS Propio

```tsx
<ImageLazy
  src="/img/circle.jpg"
  alt="Spinning Image"
  transitionType="custom"
  className="my-custom-transition"
/>
```

**CSS**

```css
.my-custom-transition {
  opacity: 0;
  transform: rotate(10deg) scale(0.95);
  transition: all 0.8s ease-in-out;
}

.my-custom-transition.loaded {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}
```

---

## 🧩 Props

| Prop                 | Type                                | Default | Description / Descripción                                  |
| -------------------- | ----------------------------------- | ------- | ---------------------------------------------------------- |
| `src`                | `string`                            | -       | Image URL / URL de imagen ✅                                |
| `alt`                | `string`                            | -       | Alt text / Texto alternativo ✅                             |
| `width`              | `number`                            | -       | Width / Ancho                                              |
| `height`             | `number`                            | -       | Height / Alto                                              |
| `srcSet`             | `string`                            | -       | Responsive image set                                       |
| `sizes`              | `string`                            | -       | Responsive sizes                                           |
| `fallbackSrc`        | `string`                            | -       | Fallback if image fails / Imagen alternativa si falla      |
| `backgroundColor`    | `string`                            | -       | Background color before load                               |
| `blurAmount`         | `string`                            | `20px`  | Initial blur / Desenfoque inicial                          |
| `animationDuration`  | `string`                            | `0.9s`  | Transition duration / Duración de transición               |
| `threshold`          | `number`                            | `0.5`   | Intersection threshold / Umbral de visibilidad             |
| `transitionType`     | `"blur"\|"fade"\|"scale"\|"custom"` | `blur`  | Type of transition / Tipo de transición                    |
| `loadingComponent`   | `ReactNode`                         | -       | Custom loader / Componente de carga personalizado ✅        |
| `onLoadComplete`     | `() => void`                        | -       | Callback when loaded / Al terminar de cargar               |
| `visibleByDefault`   | `boolean`                           | `false` | Skip lazy load / Saltar carga diferida si ya está en caché |
| `viewTransitionName` | `string`                            | -       | View Transitions API                                       |
| `extraData`          | `ImgHTMLAttributes`                 | -       | Additional attributes                                      |
| `style`              | `CSSProperties`                     | -       | Inline styles                                              |
| `className`          | `string`                            | -       | Custom CSS class                                           |
| `id`                 | `string`\|`number`                  | -       | Element ID                                                 |

---

## 🔧 How it works / ¿Cómo funciona?

- When `visibleByDefault` is `false` (default), the image loads only when it's in the viewport (IntersectionObserver).
- If `visibleByDefault` is `true`, the image is loaded immediately (useful for SSR or cached images).
- You can add a custom CSS transition, fallback, background color, and even a loading spinner.

---

## 🔁 Effects / Efectos Visuales

| Effect   | Description                           |
| -------- | ------------------------------------- |
| `blur`   | Apply blur and remove it after load   |
| `fade`   | Fade in the image                     |
| `scale`  | Slight zoom effect                    |
| `custom` | Use your own CSS (add class to image) |

---

## 🌐 SSR Compatible / Compatible con SSR

ImageLazy is safe to use in SSR environments (like Next.js). It checks for `window` and disables IntersectionObserver logic when rendering on the server.

ImageLazy es seguro para entornos con renderizado del lado del servidor como Next.js. Detecta si `window` está disponible antes de usar IntersectionObserver.

---

## 🖼 Spinner / Carga Personalizada

You can use `loadingComponent` to display a spinner while the image loads:

```tsx
<ImageLazy
  src="/img/pic.webp"
  alt="Custom Spinner"
  loadingComponent={<div className="my-spinner" />}
/>
```

```css
.my-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## 📊 Comparison with react-lazy-load-image-component / Comparación con react-lazy-load-image-component

| Feature / Característica                      | `ImageLazy` ✅                      | `react-lazy-load-image-component` ❌              |
|----------------------------------------------|------------------------------------|--------------------------------------------------|
| Lightweight & no external dependencies       | ✅ Yes / Sí                         | ❌ No (más pesado y con múltiples componentes)   |
| SSR Friendly (Next.js compatible)            | ✅ Yes / Sí                         | ✅ Yes / Sí                                      |
| Custom transitions via CSS (`custom`)        | ✅ Yes / Sí                         | ❌ No                                            |
| Native spinner support (`loadingComponent`)  | ✅ Yes / Sí                         | ❌ No (solo con workarounds)                     |
| Fallback support (`fallbackSrc`)             | ✅ Yes / Sí                         | ✅ Yes / Sí                                      |
| Responsive images (`srcSet` and `sizes`)     | ✅ Yes / Sí                         | ✅ Yes / Sí                                      |
| Load other elements lazily                   | ❌ Images only / Solo imágenes      | ✅ Yes (via `LazyLoadComponent`)                 |
| Built-in effects                             | ✅ `blur`, `fade`, `scale`, custom  | ✅ `blur`, `opacity`, `bw`                        |
| Transition customization                     | ✅ Total freedom with CSS           | ❌ Limited                                       |

---

## 📄 License / Licencia

[ISC License](./LICENSE)

---

## 👤 Author / Autor

**Percy Chuzon**\
📧 [contacto@percychuzon.com](mailto\:contacto@percychuzon.com)\
🌐 [https://percychuzon.com](https://percychuzon.com)

---

## 💡 Tip

If you want more control, just set `transitionType="custom"` and style the image with CSS. It’s that simple.

Si deseas más control, usa `transitionType="custom"` y aplica tus estilos con CSS. Así de simple.

---

Happy loading! 🎉 / ¡Carga feliz! 🎉

