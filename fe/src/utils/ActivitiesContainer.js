import React, { PureComponent } from 'react'
import { Modal } from 'reactstrap'
import Activity from './Activity'
import AddActivity from './AddActivity'

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
    
    AddActivityForm = <AddActivity />

    openForm = form => {
        this.setState({
            isFormOpen: true,
            form: form,
        })
    }

    render() {
        return (
            <div className='activities-container common-content-wrapper'>
                <div className='title-bar'>
                    <div className='label'>{this.props.label}</div>
                    { this.props.isHost && <div 
                        className="add-icon add-button pointer"
                        // onClick={() => console.log("Add an Activity")}>
                        onClick={() => this.openForm(this.AddActivityForm)}>
                    </div>}
                </div>

                <div>
                    { l.map(item => 
                        <Activity 
                            key = { item.uid }
                            data = { item }/>    
                    )}
                </div>

                <Modal isOpen={this.state.isFormOpen} toggle={this.toggleForm} zIndex="1600">
                    {this.state.form}
                </Modal>
            </div>
        )
    }
}