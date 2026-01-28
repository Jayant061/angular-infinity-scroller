# Angular Infinite Scroller

A **lightweight, high‑performance infinite scrolling directive for Angular applications**, designed to work smoothly with modern Angular versions and SSR setups.

---

## ✨ Features

- 🚀 Simple directive‑based API
- ⚡ High‑performance scroll detection
- 🧩 Works with standalone components
- 🌐 Compatible with Angular 17+
- 📦 Zero external dependencies

---

## 📦 Installation

Install the package using npm:

```bash
npm install angular-infinity-scroller
```

---

## 🚀 Getting Started

Import `AngularInfinityScrollerDirective` into your component and add it to `imports`.

### Example Component

```ts
import { Component } from '@angular/core';
import { AngularInfinityScrollerDirective } from 'angular-infinity-scroller';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [AngularInfinityScrollerDirective],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
})
export class ExampleComponent {
  handleScroll() {
    // load more data here
  }
}
```

---

## 🧪 Usage

Apply the directive to a scrollable container.

```html
<div
  class="scrollable-parent"
  angularInfinityScroller
  [scrollDistance]="2"
  (onScrolled)="handleScroll()"
>
</div>
```

---

## ⚙️ Directive API

### `scrollDistance` (Input)

- **Type:** `number`
- **Range:** `1 – 9`
- **Default:** `2`

Defines when the scroll event should trigger.

Example:
- `[scrollDistance]="2"` → emits when remaining scroll height is **≤ 20%**

If an invalid value is provided, the directive automatically falls back to the default value.

---

### `onScrolled` (Output)

- **Type:** `() => void`

Emits when the scroll threshold is reached.

```html
(onScrolled)="handleScroll()"
```

---

## 🔧 Compatibility

- ✅ Angular **17 and above**
- ✅ Standalone components
- ✅ SSR‑friendly

---

## 🤝 Contributing

Suggestions, improvements, and pull requests are welcome.

If you encounter any issues, please raise them on GitHub:
👉 https://github.com/Jayant061/angular-infinity-scroller/issues

---

## ⭐ Support

If this package helps you, please consider starring the repository ⭐

Happy coding! 🚀

