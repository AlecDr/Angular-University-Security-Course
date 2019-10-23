import { Component, OnInit, OnDestroy } from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { Observable, Subscription } from 'rxjs';
import { Lesson } from '../model/lesson';

@Component({
  selector: 'lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit, OnDestroy {
  lessons: Lesson[] = [];
  lessonsSubscription: Subscription = new Subscription();
  loading: boolean;
  errorMsg: string = null;

  constructor(private lessonsService: LessonsService) {}

  ngOnInit() {
    this.loading = true;
    this.lessonsSubscription = this.lessonsService.loadAllLessons().subscribe(
      lessons => {
        console.log(lessons);
        this.loading = false;
        this.lessons = lessons;
      },
      (error: Error) => {
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
  }

  ngOnDestroy() {
    if (this.lessonsSubscription) {
      this.lessonsSubscription.unsubscribe();
      console.log('unsubed');
    }
  }
}
