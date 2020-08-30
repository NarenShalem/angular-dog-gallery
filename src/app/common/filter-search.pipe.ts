import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterSearch",
})
export class FilterSearchPipe implements PipeTransform {
  transform(value: any, searchValue): any {
    if (!searchValue) return value;
    return value.filter(
      (v: any) => v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
  }
}
