import { Button } from 'antd'
import React, { PureComponent } from 'react'
import FieldType from '../utils/constants/enums/FieldType'
import Field from '../utils/field/Field'
import { ProfileServices } from '../services/ProfileService'

export default class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: null,
            passwordError: null,
            isSubmitting: false,
        }
    }
    validateEmail = value => {
        if (value === void 0) {
            value = this.state.email
        }
        if (value === '') {
            this.setState({
                emailError: 'Nhập email của bạn.',
            });
            return false;
        } else if ((/\S+@\S+\.\S+/.test(value)) === false) {
            this.setState({
                emailError: 'Email của bạn không hợp lệ',
            });
            return false;
        } else {
            this.setState({
                emailError: null,
            });
            return true
        }
    }

    validatePassword = (value) => {
        if (value === void 0) {
            value = this.state.password
        }
        if (value === '') {
            this.setState({
                passwordError: 'Nhập mật khẩu của bạn',
            });
            return false;
        } else {
            this.setState({
                passwordError: null,
            });
            return true
        }
    }

    validateInput = (name, value) => {
        if (name === 'email') {
            return this.validateEmail(value)
        }
        else if (name === 'password') {
            return this.validatePassword(value)
        }
        else {
            const emailFlag = this.validateEmail()
            const passwordFlag = this.validatePassword()
            return emailFlag && passwordFlag
        }
    }
    handleSubmit = async () => {
        this.setState({
            isSubmitting: true
        })
        let data = new FormData()
        data.append('email', this.state.email)
        data.append('password', this.state.password)
        let [success, body] = await ProfileServices.login(data)
        this.setState({
            isSubmitting: false,
        })
        if (success) {
            localStorage.setItem('access', body.data && body.data.access)
            localStorage.setItem('refesh', body.data && body.data.refresh)
            this.props.handleClose()
            this.props.toggle()
        }
    }
    handleChange = ({ name, value }) => {
        this.validateInput(name, value)
        this.setState({
            [name]: value,
        })
    }
    render() {
        const { emailError, passwordError, isSubmitting } = this.state
        return (
            <div className='account-form'>
                <span className='align-left title'>Login</span>
                <Field
                    name='email'
                    type={FieldType.TEXT}
                    label='Email'
                    id='email'
                    onChange={this.handleChange}
                    errorMessage={emailError}
                />
                <Field
                    type={FieldType.PASSWORD}
                    label='Password'
                    id='password'
                    name='password'
                    onChange={this.handleChange}
                    errorMessage={passwordError}
                />
                <Button loading={isSubmitting} onClick={this.handleSubmit} disabled={emailError || passwordError}>Login</Button>
            </div>
        )
    }
}
