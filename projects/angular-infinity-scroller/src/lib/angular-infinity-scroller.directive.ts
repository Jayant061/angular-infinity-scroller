
import {
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  output,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[angularInfinityScroller]',
  standalone: true
})
export class AngularInfinityScrollerDirective {

  private readonly el = inject(ElementRef<HTMLDivElement>);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  public readonly scrollDistance = input<number>(2);
  public readonly onScrolled = output<void>();

  private readonly scrollDistanceCoefficient = computed(() => {
    return Math.min(9, Math.max(0, this.scrollDistance()));
  });

  private prevScrollHeight = 0;

  ngAfterViewInit(): void {
    const unlisten = this.renderer.listen(
      this.el.nativeElement,
      'scroll',
      () => this.onScroll()
    );

    this.destroyRef.onDestroy(unlisten);
  }

  private onScroll(): void {
    const element = this.el.nativeElement;

    const height = Math.floor(
      element.scrollHeight - element.clientHeight
    );

    const scrollValue = Math.floor(element.scrollTop);

    let unexploredContentHeight = height - this.prevScrollHeight;

    // Reset when content height decreases (e.g. applying a filter).
    if (unexploredContentHeight < 0) {
      this.prevScrollHeight = 0;
      unexploredContentHeight = height;
    }

    const emitTriggerHeight =
      this.prevScrollHeight +
      Math.ceil(
        (1 - this.scrollDistanceCoefficient() / 10) *
        unexploredContentHeight
      );

    if (
      scrollValue >= emitTriggerHeight &&
      this.prevScrollHeight !== height
    ) {
      this.onScrolled.emit();
      this.prevScrollHeight = height;
    }
  }
}
