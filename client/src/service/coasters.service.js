import axios from 'axios'

export default class CoasterService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/coasters',
            withCredentials: true
        })
    }

    getCoasters = () => this.apiHandler.get('/getAllCoasters')
    getCoaster = coasterId => this.apiHandler.get(`/getOneCoaster/${coasterId}`)
    saveCoaster = coasterInfo => this.apiHandler.post(`/newCoaster/`, coasterInfo)
}