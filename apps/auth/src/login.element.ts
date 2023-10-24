import { UUITextStyles } from '@umbraco-ui/uui-css';
import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { UUIButtonState } from '@umbraco-ui/uui';
import type { IUmbAuthContext } from './types.js';
import { UmbAuthLegacyContext } from './auth-legacy.context.js';
import { UmbAuthContext } from './auth.context.js';

import './auth-layout.element.js';

@customElement('umb-login')
export default class UmbLoginElement extends LitElement {
	#authContext: IUmbAuthContext;

	@property({ type: String, attribute: 'return-url' })
	returnUrl = '';

	@property({ type: Boolean })
	isLegacy = false;

	@state()
	private _loginState: UUIButtonState = undefined;

	@state()
	private _loginError = '';

	constructor() {
		super();
		if (this.isLegacy) {
			this.#authContext = new UmbAuthLegacyContext();
		} else {
			this.#authContext = new UmbAuthContext();
		}
	}

	#handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		if (!form) return;

		if (!form.checkValidity()) return;

		const formData = new FormData(form);

		const username = formData.get('email') as string;
		const password = formData.get('password') as string;
		const persist = formData.has('persist');

		this._loginState = 'waiting';

		const response = await this.#authContext.login({ username, password, persist });

		this._loginError = response.error || '';
		this._loginState = response.error ? 'failed' : 'success';

		if (response.error) return;

		location.href = this.returnUrl;
	};

	get #greeting() {
		return 'Welcome';
		return [
			'Happy super Sunday',
			'Happy marvelous Monday',
			'Happy tubular Tuesday',
			'Happy wonderful Wednesday',
			'Happy thunderous Thursday',
			'Happy funky Friday',
			'Happy Saturday',
		][new Date().getDay()];
	}

	render() {
		return html`
			<umb-auth-layout>
				<div id="auth" class="uui-text">
					<h1 id="welcome">${this.#greeting}</h1>
					<uui-form>
						<form id="LoginForm" name="login" @submit="${this.#handleSubmit}">
							<uui-form-layout-item>
								<uui-label id="emailLabel" for="email" slot="label" required>Email</uui-label>
								<uui-input
									type="email"
									id="input-email"
									name="email"
									label="Email"
									required
									required-message="Email is required"></uui-input>
							</uui-form-layout-item>

							<uui-form-layout-item>
								<uui-label id="passwordLabel" for="password" slot="label" required>Password</uui-label>
								<uui-input-password
									id="input-password"
									name="password"
									label="Password"
									required
									required-message="Password is required"></uui-input-password>
							</uui-form-layout-item>

							${this.#authContext.supportsPersistLogin
								? html`<uui-form-layout-item>
										<uui-checkbox name="persist" label="Remember me">Remember me</uui-checkbox>
								  </uui-form-layout-item>`
								: nothing}

							<uui-form-layout-item id="form-error-message">${this.#renderErrorMessage()}</uui-form-layout-item>

							<uui-button
								id="button-login"
								type="submit"
								label="Login"
								look="primary"
								color="default"
								state=${this._loginState}></uui-button>
						</form>
					</uui-form>
				</div>
			</umb-auth-layout>
		`;
	}

	#renderErrorMessage() {
		if (!this._loginError || this._loginState !== 'failed') return nothing;

		return html`<p class="text-danger">${this._loginError}</p>`;
	}

	static styles: CSSResultGroup = [
		UUITextStyles,
		css`
			@media (max-width: 1200px) {
				#welcome {
					font-size: 3rem;
				}
			}
			@media (max-width: 800px) {
				#welcome {
					font-size: 2.5rem;
				}
			}
			#auth {
				display: flex;
				flex-direction: column;
			}
			#welcome {
				color: var(--uui-color-interactive);
				text-align: center;
				margin-bottom: 32px;
				font-weight: 400;
			}
			#input-email,
			#input-password,
			#button-login {
				width: 100%;
				height: 40px;
				border-radius: var(--uui-border-radius);
			}
			#button-login {
				margin-top: var(--uui-size-layout-1);
			}
			#form-error-message {
				margin-bottom: 0;
			}
			p.text-danger {
				color: var(--uui-color-danger-standalone);
				margin: 0;
			}
		`,
	];
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-login': UmbLoginElement;
	}
}
