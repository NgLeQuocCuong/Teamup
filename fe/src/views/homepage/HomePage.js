import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet';
import Calendar from 'react-calendar';
import PageHeader from '../../utils/PageHeader';
import ProfileContext from '../../context/ProfileContext';
import { Modal } from 'reactstrap';
import Login from '../../utils/Login';
import DistanceFilter from '../../utils/DistanceFilter';
import TypeFilter from '../../utils/TypeFilter';
import ActivitiesWrapper from '../../utils/ActivitiesWrapper';


export default class HomePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isFormOpen: false,
            form: null,
            lat: 0,
            lng: 0,
            badminton: true,
            football: true,
            distance: 1,
        }
    }
    componentDidMount() {
        this.getPosition()
    }

    handleChange = ({ name, value }) => {
        console.log(name, value)
        if (name === 'distance') {
            value = parseFloat(value.toString().slice(0, 3))
        }
        this.setState({
            [name]: value
        })
    }
    getPosition = () => {
        navigator.geolocation.getCurrentPosition(position =>
            this.setState({
                lat: parseFloat(position.coords.latitude),
                lng: parseFloat(position.coords.longitude),
            })
        )
    }
    toggleForm = () => {
        const isFormOpen = !this.state.isFormOpen
        this.setState({
            isFormOpen: isFormOpen,
        })
    }
    LoginForm = <ProfileContext.Consumer>
        {profile => <Login handleClose={this.toggleForm} toggle={profile.toggleFunction} />}
    </ProfileContext.Consumer>
    openForm = form => {
        this.setState({
            isFormOpen: true,
            form: form,
        })
    }
    render() {
        return (
            <div id='web-page'>
                <Helmet>
                    <title>Trang chủ</title>
                </Helmet>
                <ProfileContext.Consumer>
                    {profile => <PageHeader loggedin={profile.name} openLoggin={() => this.openForm(this.LoginForm)} toggleForm={this.toggleForm} toggle={profile.toggleValue} />}
                </ProfileContext.Consumer>
                <div className='home-page'>
                    <div className='left-wrapper'>
                        <Calendar
                            className='default-calendar common-content-wrapper'
                            value={this.state.date}
                            minDetail='year'
                            locale='en'
                        />
                        <TypeFilter handleChange={this.handleChange} datas={this.state} />
                        <DistanceFilter handleChange={this.handleChange} value={this.state.distance} />
                    </div>

                    <ProfileContext.Consumer>
                        {profile => <ActivitiesWrapper loggedin={profile.name} userPos={{ lat: this.state.lat, lng: this.state.lng }} />}
                    </ProfileContext.Consumer>
                </div>
                <Modal isOpen={this.state.isFormOpen} toggle={this.toggleForm} zIndex="1600">
                    {this.state.form}
                </Modal>
            </div>
        )
    }
}
