import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { delay, first, take, tap } from 'rxjs';

import { Course } from '../model/courses/model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'http://localhost:8080/api/courses';
  constructor(
    private httpClient: HttpClient
  ) { }

  list(){
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      // take(1), //finaliza a inscrição
      first(), //quero a primeira resposta queo servidor me enviar e finaliza a inscrição
      // delay(1000),
      tap( courses => console.log(courses))
    );
  }

  loadById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(record: Partial<Course>){
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }
}
