import React, { Component } from 'react'
import CoastersService from './../../../service/coasters.service'
import FilesService from './../../../service/upload.service'

import Spinner from './../../shared/Spinner/Loader'

import { Form, Button } from 'react-bootstrap'

class CoasterForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            coaster: {
                title: '',
                description: '',
                inversions: '',
                length: '',
                imageUrl: '',
                owner: this.props.loggedUser ? this.props.loggedUser._id : ''
            },
            uploadingActive: false
        }
        this.coastersService = new CoastersService()
        this.filesService = new FilesService()
    }

    handleInputChange = e => this.setState({ coaster: { ...this.state.coaster, [e.target.name]: e.target.value } })

    handleSubmit = e => {
        e.preventDefault()
        this.coastersService
            .saveCoaster(this.state.coaster)
            .then(res => {
                this.props.updateList()
                this.props.closeModal()
                this.props.handleToast(true, 'Montaña rusa creada')
            })
            .catch(err => console.log(err))
    }


    handleImageUpload = e => {

        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])
        console.log('ESTO ES UNA IMAGEN EN MEMORIA:', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    coaster: { ...this.state.coaster, imageUrl: response.data.secure_url },
                    uploadingActive: false
                })
            })
            .catch(err => console.log('ERRORRR!', err))
    }



    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="length">
                    <Form.Label>Longitud</Form.Label>
                    <Form.Control type="number" name="length" value={this.state.length} onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="inversions">
                    <Form.Label>Inversiones</Form.Label>
                    <Form.Control type="number" name="inversions" value={this.state.inversions} onChange={this.handleInputChange} />
                </Form.Group>
                {/* <Form.Group controlId="imageUrl">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.handleInputChange} />
                    </Form.Group> */}
                <Form.Group>
                    <Form.Label>Imagen (file) {this.state.uploadingActive && <Spinner />}</Form.Label>
                    <Form.Control type="file" onChange={this.handleImageUpload} />
                </Form.Group>
                <Button variant="dark" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Subiendo imagen...' : 'Crear montaña rusa'}</Button>
            </Form>
        )
    }
}

export default CoasterForm