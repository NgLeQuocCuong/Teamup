import React, { PureComponent } from 'react'
import { SportServices } from '../services/SportServices';
import ActivitiesContainer from './ActivitiesContainer';
import { getDistance } from 'geolib'

const TO_KM = 1000

export default class ActivitiesWrapper extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            personal: [],
            friends: [],
            other: [],
            toggle: true,
        }
    }
    componentDidMount() {
        this.prepareActivities(this.props.loggedin)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.toggle !== this.state.toggle) {
            this.prepareActivities(this.props.loggedin)
        }
    }
    toggle = () => {
        const toggle = !this.state.toggle
        this.setState({
            toggle: toggle
        })
    }

    prepareActivities = async loggedin => {
        let [success, body] = await SportServices.getListActivity(loggedin)
        if (success) {
            console.log(body.data)
            this.setState({
                personal: body.data.personal || [],
                friends: body.data.friends || [],
                other: body.data.other || [],
            })
        }
    }
    activityFilter = (data, distance, sport) => {
        console.log(this.props.userPos)

        if (sport && data.sport[0].name !== sport) {
            return false
        } else if (getDistance(this.props.userPos,
            { lat: parseFloat(data.location.split('|')[0]), lng: parseFloat(data.location.split('|')[1]) }) / TO_KM > distance) {
            return false

        }
        return true
    }
    render() {
        return (
            <div className="right-wrapper">
                <ActivitiesContainer
                    label='PERSONAL'
                    isHost={true}
                    datas={this.state.personal.filter(item => this.activityFilter(item, this.props.distance, this.props.sport))}
                    toggle={this.toggle}
                    userPos={this.props.userPos}
                    distance={this.props.distance}
                    sport={this.props.sport}
                />
                <ActivitiesContainer
                    label='FRIENDS'
                    userPos={this.props.userPos}
                    datas={this.state.friends.filter(item => this.activityFilter(item, this.props.distance, this.props.sport))}
                    toggle={this.toggle}
                    distance={this.props.distance}
                    sport={this.props.sport}
                />
                <ActivitiesContainer
                    label='NEARBY'
                    userPos={this.props.userPos}
                    datas={this.state.other.filter(item => this.activityFilter(item, this.props.distance, this.props.sport))}
                    toggle={this.toggle}
                    distance={this.props.distance}
                    sport={this.props.sport}
                />
            </div>
        )
    }
}
