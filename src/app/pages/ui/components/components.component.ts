import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'appquer-components',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './components.component.html'
})
export class ComponentsComponent {
    ngOnInit(): void {
        jQuery('[data-toggle="tooltip"]').tooltip({
          sanitize: false,
          sanitizeFn: function (content) {
            return null;
          }
        });
        jQuery('[data-toggle="popover"]').popover({
          sanitize: false,
          sanitizeFn: function (content) {
            return null;
          }
        });
    }
}
