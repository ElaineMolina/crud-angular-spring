import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch(value){
      case 'front-end': return 'code';
      case 'Front-End': return 'code';
      case 'back-end': return 'laptop';
      case 'Back-End': return 'laptop';
      case 'devOps': return 'api';
      case 'DevOps': return 'api';
      case 'microservices': return 'wysiwyg';
      case 'Microsserviços': return 'wysiwyg';

    }
    return 'keyboard_double_arrow_up';
  }

}
