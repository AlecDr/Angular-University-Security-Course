import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Lesson } from '../model/lesson';

@Injectable()
export class LessonsService {
  constructor(private http: HttpClient) {}

  loadAllLessons(): Observable<Lesson[]> {
    return this.http.get<{ lessons: Lesson[] }>('/api/lessons').pipe(
      map(response => response.lessons),
      catchError((errorResponse: HttpErrorResponse) => {
        let error = new Error('Something went wrong!');

        switch (errorResponse.status) {
          case 401:
            error = new Error('You cant access that area!');
            break;
        }

        return throwError(error);
      })
    );
  }

  findLessonById(id: number) {
    return this.http.get<Lesson>('/api/lessons/' + id);
  }
}
