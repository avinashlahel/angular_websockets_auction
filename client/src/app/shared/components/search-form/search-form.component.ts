import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material';

function withoutEmptyValues(form: any) {
  return Object.keys(form)
    .reduce((queryParam, key) => {
      if (form[key]) {
        queryParam[key] = form[key];
      }
      return queryParam;
    }, {});
}

@Component({
  selector: 'nga-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit {
  @Output() search = new EventEmitter();
  matcher = new ShowOnFormInvalidStateMatcher();
  searchForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router) {
    this.searchForm = this.fb.group({
      title: ['', Validators.minLength(2)],
      minPrice: ['', Validators.min(0)],
      maxPrice: ['', [Validators.min(0), Validators.max(10000)]]
    }, {
      validator: [minLessThanMax]
    });

  }


  ngOnInit() {}

  onSearch() {
    if (this.searchForm.valid) {
      this.search.emit();
      this.router.navigate(['/search-results'], {
          queryParams: withoutEmptyValues(this.searchForm.value)
        }
      );
    }
  }
}

export class ShowOnFormInvalidStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!((control && control.invalid) || (form && form.hasError('minLessThanMax')));
  }
}

function minLessThanMax(group: FormGroup): ValidationErrors | null {
  const min = group.controls['minPrice'].value;
  const max = group.controls['maxPrice'].value;

  if (min && max) {
    return min < max ? null : {minLessThanMax: true};
  } else {
    return null;
  }
}
