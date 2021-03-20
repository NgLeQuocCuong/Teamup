import React, { PureComponent } from 'react'

export default class ActivitiesContainer extends PureComponent {
    render() {
        return (
            <div className='activities-container'>
                <div className='title-bar'>
                    <div className='label'>{this.props.label}</div>

                    {/* <div className='add-button-container'> */}
                        <div 
                            className="add-icon add-button"
                            onClick={() => console.log("Add an Activity")}>
                        </div>
                    {/* </div> */}
                        
                </div>
            </div>
        )
    }
}