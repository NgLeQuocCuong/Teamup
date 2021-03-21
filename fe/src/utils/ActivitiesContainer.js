import React, { PureComponent } from 'react'
import { Modal } from 'reactstrap'
import Activity from './Activity'
import AddActivity from './AddActivity'

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

    AddActivityForm = <AddActivity handleClose={this.toggleForm} />

    openForm = form => {
        this.setState({
            isFormOpen: true,
            form: form,
        })
    }

    render() {
        return (
            this.props.datas && this.props.datas.length ?
                <div className='activities-container common-content-wrapper'>
                    <div className='title-bar'>
                        <div className='label'>{this.props.label}</div>
                        {this.props.isHost && <div
                            className="add-icon add-button pointer"
                            onClick={() => this.openForm(this.AddActivityForm)}>
                        </div>}
                    </div>

                    <div>
                        {this.props.datas && this.props.datas.map(item =>
                            <Activity
                                key={item.uid}
                                disableJoin={this.props.isHost}
                                toggle={this.props.toggle}
                                userPos={this.props.userPos}
                                data={item} />
                        )}
                    </div>

                    <Modal isOpen={this.state.isFormOpen} toggle={this.toggleForm} zIndex="1600">
                        {this.state.form}
                    </Modal>
                </div> : null
        )
    }
}