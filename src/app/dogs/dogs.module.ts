import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FilterSearchPipe } from "../common/filter-search.pipe";
import { DogsRoutingModule } from "./dogs-routing.module";
import { DogsComponent } from "./dogs.component";

@NgModule({
  declarations: [DogsComponent, FilterSearchPipe],
  imports: [CommonModule, DogsRoutingModule],
  exports: [FilterSearchPipe],
})
export class DogsModule {}
