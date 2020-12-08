import React, { Component } from 'react'
import AuthService from '../../../service/auth.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import Alert from './../../shared/Alert/Alert'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            formInfo: {
                username: '',
                password: ''
            },
            showToast: false,
            toastText: ''
        }
        this.authService = new AuthService()
    }

    handleInputChange = e => this.setState({ formInfo: { ...this.state.formInfo, [e.target.name]: e.target.value } })

    handleSubmit = e => {
        e.preventDefault()

        this.authService
            .login(this.state.formInfo)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/montañas')        // redirección JS
            })
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })


    render() {

        return (

            <>
                <Container>

                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <h1>Inicio de sesión</h1>
                            <hr />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Button variant="dark" type="submit">Iniciar sesión</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />
            </>
        )
    }
}

export default Login