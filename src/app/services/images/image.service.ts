import { Image } from "src/app/models/image/image.model";

export class ImageService {
    private images: Image[] = [
        {
            imageDesciption: "Les soins du corps englobent un ensemble de pratiques et de rituels visant à maintenir.",
            image: "assets/images/image_2.jpg",
            titre : "SOIN DU CORPS"
        }
    ];

    getImages() {
        return this.images.slice();
    }
}
