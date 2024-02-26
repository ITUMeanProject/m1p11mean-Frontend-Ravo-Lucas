import { Component, OnInit } from '@angular/core';
import { Image } from "src/app/models/image/image.model";
import { ImageService } from "src/app/services/images/image.service";

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
    images: Image[] = [];
    actualImage: string;
    changeBackgroundCounter = 0;
    descriptionImage: string;
    titreImage : string;
    constructor(private imagesService: ImageService) { }

    ngOnInit() {
        this.images = this.imagesService.getImages();
        this.actualImage = this.images[0].image;            
        this.descriptionImage = this.images[0].imageDesciption;
        this.titreImage = this.images[0].titre;


        setInterval(() => {
            this.changeBackgroundCounter++;
            if (this.changeBackgroundCounter > this.images.length - 1) {
                this.changeBackgroundCounter = 0;
            }
            this.descriptionImage = this.images[this.changeBackgroundCounter].imageDesciption;
            this.titreImage = this.images[this.changeBackgroundCounter].titre;
            this.actualImage = this.images[this.changeBackgroundCounter].image;
        }, 5000);
    }
}
