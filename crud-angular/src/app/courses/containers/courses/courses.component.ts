import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';

import { Course } from '../../model/courses/model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$: Observable<Course[]> | null = null;

  constructor(
    private coursesService: CoursesService,
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

  onEdit(course: Course){
    this.router.navigate(['edit', course._id], {relativeTo: this.route});
  }
}
