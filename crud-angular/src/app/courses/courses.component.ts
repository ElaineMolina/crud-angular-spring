import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

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
  courses$: Observable<Course[]> | null = null;
  displayedColumns = ['name', 'category','actions'];

  constructor(
    private coursesService: CoursersService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.courses$ = this.coursesService.list().pipe(
      catchError(() => {
        this.onError('Error loading courses.');
        return of([]);
      })
    );
  }
  
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }


  onAdd(){
    // console.log('onAdd');
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
