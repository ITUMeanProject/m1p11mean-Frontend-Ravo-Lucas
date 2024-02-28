import { Image } from "src/app/models/image/image.model";

export class ImageService {
    private images: Image[] = [
        {
            imageDesciption: "Les soins du corps englobent un ensemble de pratiques et de rituels visant à maintenir.",
            image: "assets/images/image_2.jpg",
            titre : "SOIN DU CORPS"
        },

        {
            imageDesciption: "Le microblading est une technique de maquillage permanent permettant de redessiner les sourcils.",
            image: "assets/images/Microblanding.jpg",
            titre : "MICRO BLANDING"
        }
    ];

    getImages() {
        return this.images.slice();
    }
}
