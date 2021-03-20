import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet';
import Calendar from 'react-calendar';
import PageHeader from '../../utils/PageHeader';
import ProfileContext from '../../context/ProfileContext';

export default class HomePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }

    render() {
        return (
            <div id='web-page'>
                <Helmet>
                    <title>Trang chủ</title>
                </Helmet>
                <ProfileContext.Consumer>
                    {profile => <PageHeader loggedin={profile.access} />}
                </ProfileContext.Consumer>
                <div className='home-page'>
                    <div className='left-wrapper'>
                        <Calendar
                            className='default-calendar'
                            value={this.state.date}
                            minDetail='year'
                            locale='en'
                        />
                    </div>
                </div>
            </div>
        )
    }
}
