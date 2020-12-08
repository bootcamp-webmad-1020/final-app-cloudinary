import React, { Component } from 'react'
import CoastersService from './../../../service/coasters.service'

import './Coaster-details.css'

import Loader from './../../shared/Spinner/Loader'

import { Container, Row, Col } from 'react-bootstrap'

import { Link } from 'react-router-dom'

class CoasterDetails extends Component {

    constructor() {
        super()
        this.state = {
            coaster: undefined
        }
        this.coastersService = new CoastersService()
    }

    componentDidMount = () => {

        const coaster_id = this.props.match.params.coaster_id

        this.coastersService
            .getCoaster(coaster_id)
            .then(res => this.setState({ coaster: res.data }))
            .catch(err => console.log(err))
    }

    render() {

        return (
            <Container className="coaster-details">
                {this.state.coaster
                    ?
                    <>
                        <h1>Detalles {this.state.coaster.title}</h1>
                        <Row>
                            <Col md={{ span: 6, offset: 1 }} >
                                <img src={this.state.coaster.imageUrl} alt={this.state.coaster.title} />
                            </Col>
                            <Col md={4}>
                                <h3>Detalles</h3>
                                <p>{this.state.coaster.description}</p>
                                <hr />
                                <p>Longitud: {this.state.coaster.length} metros</p>
                                <p>Inversiones: {this.state.coaster.inversions} metros</p>
                                <Link to="/montañas" className="btn btn-sm btn-dark">Volver</Link>
                            </Col>
                        </Row>
                    </>
                    :
                    <Loader />
                }

            </Container>
        )
    }
}

export default CoasterDetails