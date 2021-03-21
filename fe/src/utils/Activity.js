import { Button } from 'antd';
import React, { PureComponent } from 'react';
import { Modal } from 'reactstrap';
import { SportServices } from '../services/SportServices';
import ActivityType from '../utils/constants/enums/ActivityType'
import { commonFunction } from '../utils/constants/commonFunction'
import { getDistance } from 'geolib'

const TO_KM = 1000

function mapTypeToIcon(type) {
    switch (type) {
        case ActivityType.FOOTBALL: return 'football-icon'
        case ActivityType.BADMINTON: return 'badminton-icon'
        case ActivityType.BASKETBALL: return 'basketball-icon'
        default: return ''
    }
}

export default class Activity extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        const isOpen = !this.state.isOpen
        this.setState({
            isOpen: isOpen,
        })
    }
    handleJoin = async () => {
        let [success, body] = await SportServices.joinActivity(this.props.data.uid)
        if (success) {
            this.props.toggle()
        }
    }
    render() {
        return (
            <div className='relative'>
                <div className="activity common-content-wrapper" onClick={this.toggle}>
                    <div className='activity-row'>
                        <div className={'activity-icon icon-24 ' + mapTypeToIcon(this.props.data.sport[0].name)} />

                        <div className='activity-name'>{this.props.data.name}</div>

                        <div className=
                            {(this.props.data.current_members + this.props.data.members.length === this.props.data.max_members) ? 'activity-current-nmem-full' : 'activity-current-nmem-vacant'}>
                            {`${commonFunction.formatNumString(this.props.data.current_members + this.props.data.members.length)}/${commonFunction.formatNumString(this.props.data.max_members)}`}
                        </div>
                    </div>

                    <div className='activity-row'>
                        <div className='right-margin-10 icon-24 time-icon' />
                        <div>
                            {this.props.data.time.split('T')[0] + ' ' + this.props.data.time.split('T')[1]}
                        </div>
                    </div>

                    <div className='activity-row'>
                        {/* {console.log(this.props.data.location)} */}
                        <div className='right-margin-10 icon-24 location-icon'></div>

                        <div>
                            {(getDistance(this.props.userPos,
                                { lat: parseFloat(this.props.data.location.split('|')[0]), lng: parseFloat(this.props.data.location.split('|')[1]) }) / TO_KM)
                                + ' km'}
                        </div>
                    </div>

                    <div className='activity-row'>
                        <div style={{ marginRight: 10 }}>{this.props.data.host[0].name}</div>
                        <div
                            className="icon-24 add-friend-icon pointer"
                            onClick={() => console.log("Add Friend")} />
                    </div>
                </div>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle} zIndex="1600">
                    <div className="activity">
                        <div className='activity-row'>
                            <div className={'activity-icon icon-24 ' + mapTypeToIcon(this.props.data.sport[0].name)} />

                            <div className='activity-name'>{this.props.data.name}</div>

                            <div className=
                                {(this.props.data.current_members + this.props.data.members.length === this.props.data.max_members) ? 'activity-current-nmem-full' : 'activity-current-nmem-vacant'}>
                                {`${commonFunction.formatNumString(this.props.data.current_members + this.props.data.members.length)}/${commonFunction.formatNumString(this.props.data.max_members)}`}
                            </div>
                        </div>

                        <div className='activity-row'>
                            <div className='right-margin-10 icon-24 time-icon' />
                            <div>
                                {this.props.data.time.split('T')[0] + ' ' + this.props.data.time.split('T')[1]}
                            </div>
                        </div>

                        <div className='activity-row'>
                            {/* {console.log(this.props.data.location)} */}
                            <div className='margin-right-20 icon-24 location-icon'></div>

                            <div>
                                {(getDistance(this.props.userPos,
                                    { lat: parseFloat(this.props.data.location.split('|')[0]), lng: parseFloat(this.props.data.location.split('|')[1]) }) / TO_KM)
                                    + ' km'}
                            </div>
                        </div>

                        <div className='activity-row'>
                            <div style={{ marginRight: 10 }}>{this.props.data.host[0].name}</div>
                            <div
                                className="icon-24 add-friend-icon pointer"
                                onClick={() => console.log("Add Friend")} />
                        </div>
                        <div className='activity-row'>
                            Members:
                        </div>
                        {this.props.data.members.map(item => <div className='activity-row'>{' + ' + item.name}</div>)}
                    </div>
                </Modal>
                <Button shape="round" className='join-btn' disabled={this.props.disableJoin} onClick={this.handleJoin}>Join</Button>
            </div>
        )
    }
}
