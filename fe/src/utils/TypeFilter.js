import React, { PureComponent } from 'react'
import ActivityType from './constants/enums/ActivityType'
import FieldType from './constants/enums/FieldType'
import Field from './field/Field'

export default class TypeFilter extends PureComponent {
    render() {
        return (
            <div className='common-content-wrapper'>
                <Field
                    name={ActivityType.BADMINTON}
                    type={FieldType.CHECKBOX}
                    onChange={this.props.handleChange}
                    value={this.props.datas.badminton}
                >
                    <div className='activity-icon icon-24 badminton-icon'></div>
                </Field>
                <Field
                    name={ActivityType.FOOTBALL}
                    type={FieldType.CHECKBOX}
                    onChange={this.props.handleChange}
                    value={this.props.datas.football}
                >
                    <div className='activity-icon icon-24 football-icon'></div>
                </Field>
            </div>
        )
    }
}
