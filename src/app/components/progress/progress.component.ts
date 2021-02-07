import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnChanges {
  percentage = 0;

  @Input()
  total = 0;
  @Input()
  completed = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.percentage = (this.completed * 100) / this.total;
  }
}
