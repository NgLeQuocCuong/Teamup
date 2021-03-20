import React, { PureComponent } from 'react'
import Activity from './Activity'

const l = [
    {
        uid: '12',
        time: '2021-03-20T12:59',
        type: 'football',
        location: 'Nha thang Duy',
        description: 'Khong ghi gi ca de trong',
        member: [],
        host: 'Thang Duy'
    },
    {
        uid: '45',
        time: '2021-03-21T23:03',
        type: 'badminton',
        location: 'Nha chu tich Khoi',
        description: '',
        member: [],
        host: 'Anh Cuong'
    },
]

export default class ActivitiesContainer extends PureComponent {
    render() {
        return (
            <div className='activities-container common-content-wrapper'>
                <div className='title-bar'>
                    <div className='label'>{this.props.label}</div>
                    { this.props.isHost && <div 
                        className="add-icon add-button pointer"
                        onClick={() => console.log("Add an Activity")}>
                    </div>}
                </div>

                <div>
                    { l.map(item => 
                        <Activity 
                            key = { item.uid }
                            data = { item }/>    
                    )}
                </div>
            </div>
        )
    }
}