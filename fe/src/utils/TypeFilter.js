import React, { PureComponent } from 'react'
import ActivityType from './constants/enums/ActivityType'
import FieldType from './constants/enums/FieldType'
import Field from './field/Field'

export default class TypeFilter extends PureComponent {
    render() {
        const options = [
            {
                value: '',
                label: <div style={{ display: 'flex' }}>
                    <div style={{ marginLeft: 34 }}>All</div>
                </div>,
            },
            {
                value: ActivityType.BADMINTON,
                label: <div style={{ display: 'flex' }}>
                    <div className='activity-icon icon-24 badminton-icon'></div>
                    <div style={{ marginLeft: 10 }}>Badminton</div>
                </div>,
            },
            {
                value: ActivityType.FOOTBALL,
                label: <div style={{ display: 'flex' }}>
                    <div className='activity-icon icon-24 football-icon'></div>
                    <div style={{ marginLeft: 10 }}>Football</div>
                </div>,
            },
            {
                value: ActivityType.BASKETBALL,
                label: <div style={{ display: 'flex' }}>
                    <div className='activity-icon icon-24 basketball-icon'></div>
                    <div style={{ marginLeft: 10 }}>Basketball</div>
                </div>,
            },
        ]
        return (
            <div className='common-content-wrapper'>
                <div className='label'>Select Activity</div>
                {/* <Field
                    name={ActivityType.BADMINTON}
                    type={FieldType.CHECKBOX}
                    onChange={this.props.handleChange}
                    value={this.props.datas.badminton}
                >
                    <div style={{ display: 'flex' }}>
                        <div className='activity-icon icon-24 badminton-icon'></div>
                        <div style={{ marginLeft: 10 }}>Badminton</div>
                    </div>
                </Field>
                <Field
                    name={ActivityType.FOOTBALL}
                    type={FieldType.CHECKBOX}
                    onChange={this.props.handleChange}
                    value={this.props.datas.football}
                >
                    <div style={{ display: 'flex' }}>
                        <div className='activity-icon icon-24 football-icon'></div>
                        <div style={{ marginLeft: 10 }}>Football</div>
                    </div>
                </Field>
                <Field
                    name={ActivityType.BASKETBALL}
                    type={FieldType.CHECKBOX}
                    onChange={this.props.handleChange}
                    value={this.props.datas.basketball}
                >
                    <div style={{ display: 'flex' }}>
                        <div className='activity-icon icon-24 basketball-icon'></div>
                        <div style={{ marginLeft: 10 }}>Basketball</div>
                    </div>
                </Field> */}
                <Field
                    type={FieldType.RADIO}
                    onChange={this.props.handleChange}
                    value=''
                    options={options}
                    name='sport'
                />
            </div>
        )
    }
}
