# ImageLazy Component

The `ImageLazy` component is a React component designed for lazy loading images. It leverages the Intersection Observer API to load images only when they are within the viewport, optimizing the loading performance of your web application.

## Installation

```bash
npm install react-lazy-img-observer
```

# Usage

```javascript
import ImageLazy from "react-lazy-img-observer";

const Example = () => {
  return (
    <ImageLazy
      src="path/to/your/image.jpg"
      alt="Description of the image"
      width={600}
      height={400}
      className="your-class-name"
      id="unique-image-id"
      title="Image Title"
      extraData={{ "data-custom-attribute": "value" }}
    />
  );
};
```

## Props

The ImageLazy component accepts the following props:

| Prop        | Type                                        | Default | Description                                         |
| ----------- | ------------------------------------------- | ------- | --------------------------------------------------- |
| `src`       | `string`                                    | -       | The source URL of the image.                        |
| `alt`       | `string`                                    | -       | The alt text for the image.                         |
| `width`     | `number`                                    | -       | The width of the image.                             |
| `height`    | `number`                                    | -       | The height of the image.                            |
| `id`        | `number \| string`                          | -       | The ID of the image element.                        |
| `className` | `string`                                    | -       | Additional class names for the image element.       |
| `title`     | `string`                                    | -       | The title attribute for the image element.          |
| `extraData` | `React.ImgHTMLAttributes<HTMLImageElement>` | -       | Additional attributes to pass to the image element. |


## Example 

```javascript
import React from 'react';
import ImageLazy from 'your-library-name';

const App = () => {
  return (
    <div>
      <h1>Lazy Loaded Images</h1>
      <ImageLazy
        src="https://example.com/image1.jpg"
        alt="Image 1"
        width={600}
        height={400}
        className="image-class"
        id="image1"
        title="First Image"
      />
      <ImageLazy
        src="https://example.com/image2.jpg"
        alt="Image 2"
        width={600}
        height={400}
        className="image-class"
        id="image2"
        title="Second Image"
      />
    </div>
  );
};

export default App;

```

## How it works

The `ImageLazy` component uses the IntersectionObserver API to detect when the image enters the viewport. When the image is about to enter the viewport (50% visibility by default), the component sets the `src` attribute of the image element to load the actual image.

## Intersection Observer Options

- **`root`**: The element that is used as the viewport for checking visibility of the target. Defaults to `null` (the browser viewport).
- **`rootMargin`**: Margin around the root. Can be used to grow or shrink the area used for intersection. Defaults to `"0px"`.
- **`threshold`**: A single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. Defaults to `0.5`.


## Styling

The `ImageLazy` component applies a blur filter to the image until it is fully loaded. You can customize the transition effect and blur amount through the `style` prop or CSS class.

```css
.image-class {
  filter: blur(10px);
  transition: filter 0.9s;
}

.image-class[data-src] {
  filter: none;
}

```

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or feature requests.

## Author

Percy Chuzon

## Acknowledgments

Thanks to the React and Intersection Observer API documentation for guidance.
