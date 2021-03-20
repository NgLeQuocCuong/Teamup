import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet';
import Calendar from 'react-calendar';
import PageHeader from '../../utils/PageHeader';
import ProfileContext from '../../context/ProfileContext';
import { Modal } from 'reactstrap';
import Login from '../../utils/Login';


export default class HomePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isFormOpen: false,
            form: null,
        }
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
                    {profile => <PageHeader loggedin={profile.userName} openLoggin={() => this.openForm(this.LoginForm)} toggleForm={this.toggleForm} toggle={profile.toggleValue} />}
                </ProfileContext.Consumer>
                <div className='home-page'>
                    <div className='left-wrapper'>
                        <Calendar
                            className='default-calendar'
                            value={this.state.date}
                            minDetail='year'
                            locale='en'
                        />

                        <div>

                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isFormOpen} toggle={this.toggleForm} zIndex="1600">
                    {this.state.form}
                </Modal>
            </div>
        )
    }
}
