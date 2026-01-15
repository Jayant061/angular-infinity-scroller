import { computed, Directive, ElementRef, inject, input, output, signal } from '@angular/core';

@Directive({
  selector: '[angularInfinityScroller]',
  standalone: true
})
export class AngularInfinityScrollerDirective {

  constructor() {
    this.onScroll = this.onScroll.bind(this);
  }
  public scrollDistance = input<number>(2);
  private readonly scrollDistanceCoefficient = computed(() => {
    const val = this.scrollDistance();
    if (val > 9) {
      return 2
    }
    return val;
  })
  public onScrolled = output();
  private el: ElementRef<HTMLDivElement> = inject(ElementRef);
  private prevScrollHeight = signal<number>(0);


  ngAfterViewInit(): void {
    this.el.nativeElement.addEventListener('scroll', this.onScroll);
  }

  private onScroll(): void {
    const height = Math.floor(this.el?.nativeElement.scrollHeight - this.el.nativeElement.clientHeight);
    const scrollValue = Math.floor(this.el?.nativeElement.scrollTop);
    const unexploredContentHeight = height - this.prevScrollHeight();
    const emitTriggerHeight = this.prevScrollHeight() + Math.ceil((1 - ((this.scrollDistanceCoefficient()) / 10)) * unexploredContentHeight);
    if (scrollValue >= (emitTriggerHeight) && this.prevScrollHeight() !== height) {
      this.onScrolled.emit();
      this.prevScrollHeight.set(height);
    }
  }
  ngOnDestroy(): void {
    this.el.nativeElement.removeEventListener('scroll', this.onScroll);
  }

}
