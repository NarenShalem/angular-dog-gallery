import { Component, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import SubBreedModalComponent from "@app/common/sub-breed-modal/sub-breed-modal.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs";
import Dog from "../_models/dogs/dog";
import DogsService from "../_services/dogs.service";
@Component({
  selector: "app-dogs",
  templateUrl: "./dogs.component.html",
  styleUrls: ["./dogs.component.css"],
})
export class DogsComponent implements OnInit, OnDestroy {
  //#region variables
  dogs: any[] = [];
  loading: boolean = false;
  search: any = "";
  dogsSubscription: Subscription;
  modalRef: BsModalRef;
  //#endregion

  constructor(
    private dogsService: DogsService,
    private modalService: BsModalService
  ) {}

  //#region hanlders
  openBreedModal(breedName: string, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(SubBreedModalComponent, {
      initialState: { breedName: breedName },
    });
    this.modalRef.setClass("modal-lg");
  }
  //#endregion

  ngOnInit(): void {
    this.getAllDogs();
  }

  getAllDogs(): void {
    this.dogsSubscription = this.dogsService
      .getDogs()
      .subscribe((dogBreed: Dog) => {
        Object.keys(dogBreed.message).map((dog: any) => {
          this.dogsService
            .getRandomImageByName(dog)
            .subscribe((randomBreedImage: any) => {
              this.dogs.push({
                name: dog,
                imageUrl: randomBreedImage.message,
              });
            });
        });
      });
  }

  ngOnDestroy() {
    this.dogsSubscription && this.dogsSubscription.unsubscribe();
  }
}
