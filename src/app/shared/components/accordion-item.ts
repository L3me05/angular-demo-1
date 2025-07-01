import {booleanAttribute, Component, Input} from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  imports: [],
  template: `

    <div class="collapse bg-base-100 border border-base-300">
      <input type="radio" [name]="groupName" [checked]="selected" />
      <div class="collapse-title font-semibold">
        {{title}}
      </div>
      <div class="collapse-content text-sm">
        <ng-content />
      </div>
    </div>
  `,
  styles: ``
})
export class AccordionItem {
  @Input() title = ''
  @Input() groupName = 'accordion-group'
  @Input({transform: booleanAttribute}) selected = false

}
