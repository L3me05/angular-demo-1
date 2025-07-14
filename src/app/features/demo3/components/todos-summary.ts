import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-todos-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `

    <div>{{ completed }} completed | {{ todos }} todos</div>

  `,
  styles: ``
})
export class TodosSummary {
  @Input() completed: number | undefined;
  @Input() todos: number | undefined;

}
