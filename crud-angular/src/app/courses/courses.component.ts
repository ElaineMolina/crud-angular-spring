import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { Course } from './model/courses/model/course';
import { CoursersService } from './services/coursers.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  constructor(
    private coursesService: CoursersService,
    public dialog: MatDialog
  ) {
    // this.courses = [];
    this.courses$ = this.coursesService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.');
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
}
