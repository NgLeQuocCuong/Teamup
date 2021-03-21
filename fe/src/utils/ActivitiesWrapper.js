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
    render() {
        return (
            <div className="right-wrapper">
                <ActivitiesContainer
                    label='PERSONAL'
                    isHost={true}
                    datas={this.state.personal}
                    toggle={this.toggle}
                    userPos={this.props.userPos}
                />
                <ActivitiesContainer
                    label='FRIENDS'
                    userPos={this.props.userPos}
                    datas={this.state.friends}
                    toggle={this.toggle}
                />
                <ActivitiesContainer
                    label='NEARBY'
                    userPos={this.props.userPos}
                    datas={this.state.other}
                    toggle={this.toggle}
                />
            </div>
        )
    }
}
