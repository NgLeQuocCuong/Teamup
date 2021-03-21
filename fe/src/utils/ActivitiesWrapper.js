import React, { PureComponent } from 'react'
import { SportServices } from '../services/SportServices';
import ActivitiesContainer from './ActivitiesContainer'

export default class ActivitiesWrapper extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            personal: [],
            friends: [],
            other: [],
        }
    }
    componentDidMount() {
        this.prepareActivities(this.props.loggedin)
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
    render() {
        return (
            <div className="right-wrapper">
                <ActivitiesContainer
                    label='PERSONAL'
                    isHost='true'
                    datas={this.state.personal}
                />
                <ActivitiesContainer
                    label='FRIENDS'
                    datas={this.state.friends}
                />
                <ActivitiesContainer
                    label='NEARBY'
                    datas={this.state.other}
                />
            </div>
        )
    }
}
