import {Component} from "react"
import styles from "./Form.module.css"

class Form extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		repeatPassword: "",
		checkbox: false,
		success: "",

		errors: {
			name: false,
			email: false,
			password: false,
			repeatPassword: false,
			checkbox: false,
			success: false,
		},
	}

	message = {
		name: "Min. 3 znaki bez spacji!",
		email: "E-mail jest nie poprawny!",
		password: "Min. 8 znaków!",
		checkbox: "Musisz zaznaczyć zgodę!",
	}

	handleChange = e => {
		if (e.target.type === "checkbox") {
			this.setState({
				[e.target.name]: e.target.checked,
			})
		} else {
			this.setState({
				[e.target.name]: e.target.value,
			})
		}
	}

	selectAnswerPassword = () => {
		if (this.state.password !== this.state.repeatPassword) {
			this.message.repeatPassword = "Hasła nie pasują do siebie!"
		} else if (!this.state.repeatPassword) {
			this.message.repeatPassword = "Powtórz hasło!"
		}
	}

	handleSubmit = e => {
		e.preventDefault()
		const validation = this.handleValidation()
		this.selectAnswerPassword()
		if (validation.correctValidation) {
			this.setState({
				name: "",
				email: "",
				password: "",
				repeatPassword: "",
				checkbox: false,
				success: "Formularz wysłany!",

				errors: {
					name: false,
					email: false,
					password: false,
					repeatPassword: false,
					checkbox: false,
				},
			})
		} else {
			this.setState({
				errors: {
					name: !validation.nameValidation,
					email: !validation.emailValidation,
					password: !validation.passwordValidation,
					repeatPassword: !validation.repeatPasswordValidation,
					checkbox: !validation.checkboxValidation,
				},
			})
		}
	}

	handleValidation = () => {
		let nameValidation = false
		let emailValidation = false
		let passwordValidation = false
		let repeatPasswordValidation = false
		let checkboxValidation = false
		let correctValidation = false

		const reg =
			/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/

		const {name, email, password, checkbox, repeatPassword} = this.state
		if (name.length > 2 && name.indexOf(" ") === -1) {
			nameValidation = true
		}
		if (reg.test(email)) {
			emailValidation = true
		}
		if (password.length >= 8) {
			passwordValidation = true
		}
		if (password === repeatPassword && repeatPassword.length) {
			repeatPasswordValidation = true
		}
		if (checkbox) {
			checkboxValidation = true
		}
		if (
			nameValidation &&
			emailValidation &&
			passwordValidation &&
			repeatPasswordValidation &&
			checkboxValidation
		) {
			correctValidation = true
		}
		return {
			nameValidation,
			emailValidation,
			passwordValidation,
			repeatPasswordValidation,
			checkboxValidation,
			correctValidation,
		}
	}

	componentDidUpdate() {
		if (this.state.success !== "") {
			setTimeout(() => {
				this.setState({
					success: "",
				})
			}, 2000)
		}
	}

	render() {
		const {name, email, password, repeatPassword, checkbox} = this.state.errors
		return (
			<div className={styles.section}>
				<h1>Zarejestruj się</h1>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor='name'>Nazwa użytkownika:</label>
					<input
						style={name ? {border: "1px solid tomato"} : {}}
						type='text'
						id='name'
						name='name'
						onChange={this.handleChange}
						value={this.state.name}
					/>
					{name && <p>{this.message.name}</p>}

					<label htmlFor='email'>E-mail</label>
					<input
						style={email ? {border: "1px solid tomato"} : {}}
						type='text'
						id='email'
						name='email'
						onChange={this.handleChange}
						value={this.state.email}
					/>
					{email && <p>{this.message.email}</p>}

					<label htmlFor='password'>Hasło</label>
					<input
						style={password ? {border: "1px solid tomato"} : {}}
						type='password'
						id='password'
						name='password'
						onChange={this.handleChange}
						value={this.state.password}
					/>
					{password && <p>{this.message.password}</p>}

					<label htmlFor='repeatPassword'>Powtórz Hasło</label>
					<input
						style={repeatPassword ? {border: "1px solid tomato"} : {}}
						type='password'
						id='repeatPassword'
						name='repeatPassword'
						onChange={this.handleChange}
						value={this.state.repeatPassword}
					/>
					{repeatPassword && <p>{this.message.repeatPassword}</p>}

					<div className={styles.checkbox}>
						<input
							type='checkbox'
							id='checkbox'
							name='checkbox'
							onChange={this.handleChange}
							checked={this.state.checkbox}
						/>
						<label htmlFor='checkbox'>Akceptuję regulamin</label>
					</div>
					{checkbox && <p>{this.message.checkbox}</p>}

					<button>Załóż konto</button>
				</form>

				{this.state.success && <h2>{this.state.success}</h2>}
			</div>
		)
	}
}

export default Form
