import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import DogsService from "@app/_services/dogs.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sub-breed-modal",
  templateUrl: "./sub-breed-modal.component.html",
  styleUrls: ["./sub-breed-modal.component.css"],
  // encapsulation: ViewEncapsulation.None,
})
export class SubBreedModalComponent implements OnInit, OnDestroy {
  breedName: string = "";
  subBreeds: Array<any> = [];
  dogBreedMoreImages: Array<string> = [];
  subBreedSubscription: Subscription;

  constructor(
    public bsModalRef: BsModalRef,
    private dogsService: DogsService,
    private http: HttpClient
  ) {}

  //#region handlers
  handleSubBreedClose() {
    this.bsModalRef.hide();
  }
  //#endregion

  ngOnInit() {
    this.getSubBreeds();
    this.getRandomBreedImages();
  }

  getSubBreeds(): void {
    this.subBreedSubscription = this.dogsService
      .getAllSubBreedsByBreedName(this.breedName)
      .subscribe((breed: any) => {
        breed.message.forEach((subBreed: any) => {
          this.dogsService
            .getRandomImageByName(this.breedName, subBreed)
            .subscribe((subBreedRandom: any) => {
              this.subBreeds.push({
                name: subBreed,
                imageUrl: subBreedRandom.message,
              });
            });
        });
      });
  }

  getRandomBreedImages(): void {
    this.dogsService
      .getRandomImageByName(this.breedName, null, 3)
      .subscribe((breedMore: any) => {
        this.dogBreedMoreImages = breedMore.message;
      });
  }

  ngOnDestroy() {
    this.subBreedSubscription && this.subBreedSubscription.unsubscribe();
  }
}

export default SubBreedModalComponent;
