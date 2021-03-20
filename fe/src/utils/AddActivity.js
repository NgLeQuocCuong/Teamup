import React, { PureComponent } from 'react'
import { Button } from 'antd'
import FieldType from '../utils/constants/enums/FieldType'
import Field from '../utils/field/Field'

export default class AddActivity extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            location: '',
            time: '',
            nCurrentMembers: 0,
            nMaxMembers: 0,
            isSubmitting: false,
        }
    }
    
    handleChange = ({ name, value }) => {
        // this.validateInput(name, value)
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = async () => {
        this.setState({
            isSubmitting: true
        })
        let data = new FormData()
        data.append('type', this.state.type)
        // data.append('host', ???)
        data.append('location', this.state.location)
        data.append('time', this.state.time)
        data.append('nCurrentMembers', this.state.nCurrentMembers)
        data.append('nMaxMembers', this.state.nMaxMembers)
        // let [success, body] = await ProfileServices.login(data)
        this.setState({
            isSubmitting: false,
        })
        // if (success) {
        //     localStorage.setItem('access', body.data && body.data.access)
        //     localStorage.setItem('refesh', body.data && body.data.refresh)
        //     this.props.handleClose()
        //     this.props.toggle()
        // }
    }

    render() {
        return (
            <div className='account-form'>
                <span className='align-left title'>Add Activity</span>

                

                <Field
                    name='location'
                    type={FieldType.TEXT}
                    label='Location'
                    id='location'
                    onChange={this.handleChange}
                />

                <div style={{display:'flex'}}>
                    <Field
                        name='nCurrentMembers'
                        type={FieldType.TEXT}
                        label='Current Members'
                        id='nCurrentMembers'
                        onChange={this.handleChange}
                    />

                    <div> / </div>

                    <Field
                        name='nMaxMembers'
                        type={FieldType.TEXT}
                        label='Max Members'
                        id='nMaxMembers'
                        onChange={this.handleChange}
                    />
                    </div>
                <Field
                    name='description'
                    type={FieldType.TEXTAREA}
                    label='Description'
                    id='description'
                    onChange={this.handleChange}
                />

                <Button 
                    loading={this.state.isSubmitting} 
                    onClick={this.handleSubmit}>Add
                </Button>
            </div>
        )
    }
}