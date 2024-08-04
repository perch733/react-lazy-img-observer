"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ImageLazy = ({ src, alt, width, height, className, id, extraData, title, }) => {
    const imageRef = (0, react_1.useRef)(null);
    const [isIntersecting, setIsIntersecting] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    if (imageRef.current) {
                        imageRef.current.src = imageRef.current.dataset.src || "";
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: "0px", threshold: 0.5 });
        if (imageRef.current) {
            observer.observe(imageRef.current);
        }
        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, [src]);
    return ((0, jsx_runtime_1.jsx)("img", { title: title, className: className, loading: "lazy", ref: imageRef, "data-src": src, alt: alt, width: width, height: height, style: {
            filter: isIntersecting ? "none" : "blur(20px)",
            transition: "filter 0.9s",
        }, id: id?.toString(), ...extraData }));
};
exports.default = ImageLazy;
