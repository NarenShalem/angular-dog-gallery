import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import DogsService from "../_services/dogs.service";
import { DogsComponent } from "./dogs.component";

const routes: Routes = [{ path: "", component: DogsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule, FormsModule],
  providers: [DogsService],
})
export class DogsRoutingModule {}
