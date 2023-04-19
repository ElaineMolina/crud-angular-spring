import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursersService } from '../services/coursers.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: CoursersService,
    private _snackBar: MatSnackBar,
    private location: Location) {
      this.form = this.formBuilder.group({
        name: [null],
        category: [null]
      });
  }

  ngOnInit(): void {

  }
  onSubmit(){
    this.service.save(this.form.value)
    .subscribe(result => this.onSuccess(), error => this.onError());
  }

  onCancel(){
    this.location.back();

  }
  private onSuccess(){
    this._snackBar.open('Curso salvo com sucesso!', '', {duration: 2000});
    this.onCancel();
  }

  private onError(){
    this._snackBar.open('Erro ao salvar curso', '', {duration: 2000});
  }
}
