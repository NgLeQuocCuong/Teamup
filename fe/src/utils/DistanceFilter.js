import React, { PureComponent } from 'react'
import FieldType from './constants/enums/FieldType'
import Field from './field/Field'

export default class DistanceFilter extends PureComponent {
    onClickLeft = value => {
        if (value > 1) {
            value -= 1
            return value.toPrecision(1)
        } else if (value >= 0.2) {
            value -= 0.1
            return value.toPrecision(1)
        }
        return value
    }
    onClickRight = value => {
        if (value < 1) {
            value += 0.1
            return value.toPrecision(1)
        } else if (value < 10) {
            value += 1
            return value
        }
        return value
    }
    render() {
        return (
            <div className='common-content-wrapper distance-filter'>
                <div className='label'>Select Distance</div>
                <Field
                    name='distance'
                    type={FieldType.TEXT_WITH_BTN}
                    viewOnly
                    onClickLeft={this.onClickLeft}
                    onClickRight={this.onClickRight}
                    value={this.props.value}
                    onChange={this.props.handleChange}
                    suffix='km'
                />

            </div>
        )
    }
}
