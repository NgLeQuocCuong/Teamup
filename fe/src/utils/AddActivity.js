import React, { PureComponent } from 'react'
import { Button } from 'antd'
import FieldType from '../utils/constants/enums/FieldType'
import Field from '../utils/field/Field'
import MapViewer from './MapViewer'
import { SportServices } from '../services/SportServices'
export default class AddActivity extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            typeOption: [],
            location: '',
            time: '',
            current_members: 0,
            max_members: 0,
            isSubmitting: false,
            description: '',
        }
    }
    async componentDidMount() {
        let [success, body] = await SportServices.getListSport()
        if (success) {
            this.setState({
                typeOption: body.data,
            })
        }
    }

    handleChange = ({ name, value }) => {
        console.log(name, value)
        const { current_members, max_members } = this.state
        this.setState({
            [name]: value,
            max_members: name === 'current_members' ? Math.max(value, max_members) : max_members,
            current_members: name === 'max_members' ? Math.min(value, current_members) : current_members,
        })
    }

    handleSubmit = async () => {
        this.setState({
            isSubmitting: true
        })
        let data = new FormData()
        data.append('name', this.state.name)
        data.append('description', this.state.description)
        data.append('sport', this.state.type)
        data.append('location', this.state.location)
        data.append('time', '2021-03-21T16:00')
        data.append('current_members', this.state.current_members)
        data.append('max_members', this.state.max_members)
        let [success, body] = await SportServices.createActivity(data)
        if (success) {
            this.props.handleClose()
        }
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
                    name='name'
                    type={FieldType.TEXT}
                    label='Activity Name'
                    onChange={this.handleChange}
                    value={this.state.name}
                />
                <Field
                    name='type'
                    type={FieldType.SINGLE_SELECT}
                    label='Activity Type'
                    onChange={this.handleChange}
                    value={this.state.type}
                    options={this.state.typeOption}
                />
                <Field
                    name='current_members'
                    type={FieldType.NUMBER}
                    label='Current Members'
                    id='current_members'
                    onChange={this.handleChange}
                    value={this.state.current_members}
                    minValue={0}
                />
                <Field
                    name='max_members'
                    type={FieldType.NUMBER}
                    label='Max Members'
                    id='max_members'
                    onChange={this.handleChange}
                    value={this.state.max_members}
                    minValue={0}
                />
                <Field
                    name='description'
                    type={FieldType.TEXTAREA}
                    label='Description'
                    id='description'
                    onChange={this.handleChange}
                    value={this.state.description}
                />
                <div className='map-viewer'>
                    <MapViewer onChange={this.handleChange} />
                </div>
                <Button
                    loading={this.state.isSubmitting}
                    onClick={this.handleSubmit}>Add
                </Button>
            </div>
        )
    }
}