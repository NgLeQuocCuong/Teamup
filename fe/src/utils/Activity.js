import React, { PureComponent } from 'react';
import ActivityType from '../utils/constants/enums/ActivityType'

function mapTypeToIcon(type) {
    switch (type) {
        case ActivityType.FOOTBALL: return 'football-icon'
        case ActivityType.BADMINTON: return 'badminton-icon'
        default: return ''
    } 
}

export default class Activity extends PureComponent {
    render() {
        return (
            <div className="activity common-content-wrapper">
                <div className='activity-row'>
                    <div className={'activity-icon icon-24 ' + mapTypeToIcon(this.props.data.type)}/>
                    
                    <div style={{flex:30}}> 
                        { this.props.data.time.split('T')[0] + ' ' + this.props.data.time.split('T')[1] }
                    </div>
                    
                    <div className='activity-current-nmem-vacant'>08/10</div>
                </div>

                <div className='activity-row'> 
                    { this.props.data.location }    
                </div>

                <div className='activity-row'>
                    <div style={{ marginRight: 10 }}>{ this.props.data.host }</div>
                    <div 
                        className="icon-24 add-friend-icon pointer"
                        onClick={() => console.log("Add Friend")}/>
                        {/* <div></div>  */}
                </div>
            </div>
        )
    }
}