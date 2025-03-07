import { Directive, ElementRef, inject, input, output } from '@angular/core';

@Directive({
  selector: '[angularInfinityScroller]',
  standalone: true
})
export class AngularInfinityScrollerDirective {

  constructor() { }
  public scrollDistance = input<number>();
  public onScrolled = output();
  private el:ElementRef<HTMLDivElement> = inject(ElementRef);
  private prevScrollHeight:number = 0;
  ngAfterViewInit(): void {
    this.el.nativeElement.addEventListener('scroll',this.onScroll.bind(this));
  }

  ngOnDestroy(): void {
    this.el.nativeElement.removeEventListener('scroll',this.onScroll.bind(this));
  }
  private isEmit:boolean = true;
  private onScroll():void{
      const height = Math.floor(this.el?.nativeElement.scrollHeight - this.el.nativeElement.clientHeight);
      const scrollValue = Math.floor(this.el?.nativeElement.scrollTop);
      const emitTriggerHeight  = Math.ceil((1-((this.scrollDistance()??2)/10))*height);
      if(scrollValue>= (emitTriggerHeight) && !this.isEmit){
        return;
      }
      else if(scrollValue < (emitTriggerHeight)){
        this.isEmit = true;
      }
      if(scrollValue>= (emitTriggerHeight) && this.prevScrollHeight !== height){
        this.onScrolled.emit();
        this.prevScrollHeight = height;
        this.isEmit = false;
      }
  }

}
