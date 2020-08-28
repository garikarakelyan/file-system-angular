import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {fromEvent, ReplaySubject} from "rxjs";
import {debounceTime, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('searchRef', {static: true}) searchRef: ElementRef;
  @Input('currentPath') currentPath: string = 'root';
  @Output() onSearch = new EventEmitter();
  @Output() onBack = new EventEmitter();
  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    fromEvent(this.searchRef.nativeElement, 'input').pipe(
        debounceTime(600),
    ).pipe(
        takeUntil(this.unsubscribe$)
    )
        .subscribe(
            (event: KeyboardEvent) => {
              this.onSearch.emit(event['srcElement']['value']);
            }
        );
  }

  _onBack() {
    const nextPath = this.currentPath.split('/').reverse()[1];
    this.onBack.emit(nextPath !== undefined ? nextPath : null);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
