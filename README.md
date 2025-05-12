# 📷 ImageLazy

**ImageLazy** is a lightweight React component for lazy loading images using the Intersection Observer API. It delays the loading of off-screen images until they appear in the viewport, helping optimize performance and reduce initial load times.

![npm](https://img.shields.io/npm/v/react-lazy-img-observer.svg)  
![license](https://img.shields.io/npm/l/react-lazy-img-observer.svg)

---

## 📦 Installation

```bash
npm install react-lazy-img-observer
```

---

## 🚀 Usage

### Basic example (JSX or TSX)

```tsx
import ImageLazy from "react-lazy-img-observer";

const Example = () => (
  <ImageLazy
    src="https://example.com/image.jpg"
    alt="Description of the image"
    width={600}
    height={400}
    className="custom-class"
    id="image-1"
    title="Image title"
    extraData={{ "data-custom": "value" }}
  />
);
```

---

## 🧩 Props

| Prop        | Type                                        | Required | Description                                           |
|-------------|---------------------------------------------|----------|-------------------------------------------------------|
| `src`       | `string`                                    | ✅        | The source URL of the image.                          |
| `alt`       | `string`                                    | ✅        | The alt text for accessibility.                       |
| `width`     | `number`                                    | ❌        | The width of the image.                               |
| `height`    | `number`                                    | ❌        | The height of the image.                              |
| `id`        | `string \| number`                          | ❌        | Optional ID for the image element.                    |
| `className` | `string`                                    | ❌        | CSS class for custom styling.                         |
| `title`     | `string`                                    | ❌        | Tooltip text shown on hover.                          |
| `extraData` | `React.ImgHTMLAttributes<HTMLImageElement>` | ❌        | Any extra HTML attributes (e.g., `data-*`).           |

---

## 📚 How It Works

The component uses the [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API to detect when the image enters the viewport. Once at least **50%** of the image is visible, the real `src` is assigned to the image, triggering the browser to load it.

---

## ⚙️ Intersection Observer Configuration

- `root`: `null` (default viewport)
- `rootMargin`: `"0px"`
- `threshold`: `0.5` (50% visibility required)

---

## 🎨 Styling

The image starts blurred and transitions smoothly once it’s loaded. You can override or enhance this with your own styles:

```css
.custom-class {
  filter: blur(20px);
  transition: filter 0.9s ease;
}

.custom-class.loaded {
  filter: none;
}
```

You may also override the `style` prop directly if preferred.

---

## 📄 License

[ISC License](./LICENSE)

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to [open an issue](https://github.com/perch33/react-lazy-img-observer/issues) or submit a pull request.

---

## 👤 Author

**Percy Chuzon**  
📧 contacto@percychuzon.com  
🌐 [https://percychuzon.com](https://percychuzon.com)

---

## 🙏 Acknowledgments

Thanks to the React community and the MDN docs for inspiration and guidance.