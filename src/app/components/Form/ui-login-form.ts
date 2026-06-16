import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { Button } from '../Button/ui-button';

@Component({
  selector: 'ui-login-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  styleUrls: ['./Form.css', './Label.css', './Input.css'],
  template: `
    <form class="form" [class.form--inverted]="inverted()">
      <div>
        <label
          for="lf-email"
          class="label label--linked"
          [class.label--inverted]="inverted()"
        >
          Email
        </label>
        <input
          id="lf-email"
          type="email"
          placeholder="Enter your email"
          class="input"
          [class.input--inverted]="inverted()"
        />
      </div>
      <div>
        <label
          for="lf-password"
          class="label label--linked"
          [class.label--inverted]="inverted()"
        >
          Password
        </label>
        <input
          id="lf-password"
          type="password"
          placeholder="Enter your password"
          class="input"
          [class.input--inverted]="inverted()"
        />
      </div>
      <ui-button label="Login" (clicked)="loginClick.emit()"></ui-button>
    </form>
  `
})
export class LoginForm {
  inverted = input(false);
  loginClick = output<void>();
}
