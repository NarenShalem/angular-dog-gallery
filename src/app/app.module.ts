import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ModalModule } from "ngx-bootstrap/modal";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SubBreedModalComponent } from "./common/sub-breed-modal/sub-breed-modal.component";
import DogsService from "./_services/dogs.service";

@NgModule({
  declarations: [AppComponent, SubBreedModalComponent, SubBreedModalComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [DogsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
