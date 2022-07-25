import "./GalleryMini.css";
import {useState} from "react";

export default function GalleryMini({gallery}) {
    const [image, setImage] = useState(0);

    const nextImage = () => {
        if (image < gallery.length - 1) {
            setImage(image => image + 1);
        }
    }

    const previousImage = () => {
        if (image > 0) {
            setImage(image => image - 1);
        }
    }

    return (
        <div className={"image-container"}>
            <img src={gallery[image]} alt={""}/>
            {gallery.length > 1 ?
                <div className={"image-navigation"}>
                    <div onClick={previousImage}>&lt;</div>
                    <div onClick={nextImage}>&gt;</div>
                </div> : ""}
        </div>
    )
}