import "./Gallery.css";
import {useState} from "react";

export default function Gallery({images, inStock}) {
    const [image, setImage] = useState(0);

    const onGalleryClick = (e) => {
        setImage(e);
    }

    return (
        <div className={"product-gallery"}>
            <ul className={"gallery"}>
                {images.map((gallery, index) =>
                    <li key={index} onClick={() => onGalleryClick(index)}
                        className={inStock ? "image-container" : "image-container opacity-05"}>
                        <img src={gallery} alt={""}/>
                        {inStock ? "" : <p className={"out-of-stock-text-l"}>OUT OF STOCK</p>}
                    </li>
                )}
            </ul>
            <div className={inStock ? "main-image-holder" : "main-image-holder opacity-05"}>
                <img src={images[image]} alt={""} />
                {inStock ? "" : <p className={"out-of-stock-text-xxl"}>OUT OF STOCK</p>}
            </div>
        </div>
    )
}