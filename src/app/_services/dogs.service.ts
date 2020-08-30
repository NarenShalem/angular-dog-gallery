import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export default class DogsService {
  private dogsUrl = "https://dog.ceo/api"; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  /** GET dogs from the server */
  getBreeds(): Observable<any> {
    return this.http.get<any[]>(`${this.dogsUrl}/breeds/list/all`).pipe(
      tap((_) => console.log("fetched dogs")),
      catchError(this.handleError<any[]>("getBreeds", []))
    );
  }

  /** GET random images by breed Name and Sub breed from the server */
  getRandomImageByName(
    breedName: string,
    subBreed?: string,
    randomNumber?: number
  ): Observable<any> {
    const requiredUrl = !subBreed
      ? randomNumber
        ? `${this.dogsUrl}/breed/${breedName}/images/random/3`
        : `${this.dogsUrl}/breed/${breedName}/images/random`
      : `${this.dogsUrl}/breed/${breedName}/${subBreed}/images/random`;
    return this.http.get<any[]>(requiredUrl).pipe(
      tap((_) => console.log("fetched random images")),
      catchError(this.handleError<any[]>("getRandomImageByName", []))
    );
  }

  /** GET sub breeds from the server */
  getAllSubBreedsByBreedName(breedName: string): Observable<any> {
    const requiredUrl = `${this.dogsUrl}/breed/${breedName}/list`;
    return this.http.get<any[]>(requiredUrl).pipe(
      tap((_) => console.log("fetched sub breeds")),
      catchError(this.handleError<any[]>("getAllSubBreedsByBreedName", []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
