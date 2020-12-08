import React, { Component } from 'react'
import CoastersService from './../../../service/coasters.service'

import CoasterCard from './Coaster-card'
import Loader from './../../shared/Spinner/Loader'
import CoasterForm from './../Coaster-form/Coaster-form'

import Alert from './../../shared/Alert/Alert'
import Popup from './../../shared/Popup/Popup'

import { Container, Row, Button, Modal, Toast } from 'react-bootstrap'


import './Coaster-list.css'

class CoasterList extends Component {

    constructor() {
        super()
        this.state = {
            coasters: undefined,
            showModal: false,
            showToast: false,
            toastText: ''
        }
        this.coastersService = new CoastersService()
    }

    componentDidMount = () => this.refreshCoasters()

    refreshCoasters = () => {
        this.coastersService
            .getCoasters()
            .then(res => this.setState({ coasters: res.data }))
            .catch(err => console.log(err))
    }

    handleModal = visible => this.setState({ showModal: visible })
    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })

    render() {
        return (
            <>
                <Container>

                    <h1>Listado de montañas rusas</h1>

                    {this.props.loggedUser && <Button onClick={() => this.handleModal(true)} variant="dark" size="sm">Crear nueva montaña rusa</Button>}

                    <Row>
                        {
                            this.state.coasters
                                ?
                                this.state.coasters.map(elm => <CoasterCard key={elm._id} {...elm} loggedUser={this.props.loggedUser} />)
                                :
                                <Loader />
                        }
                    </Row>
                </Container>

                <Popup show={this.state.showModal} handleModal={this.handleModal} title="Nueva montaña rusa">
                    <CoasterForm handleToast={this.handleToast} closeModal={() => this.handleModal(false)} updateList={this.refreshCoasters} loggedUser={this.props.loggedUser} />
                </Popup>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />

            </>
        )
    }
}

export default CoasterList