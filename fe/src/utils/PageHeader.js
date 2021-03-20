import React, { PureComponent } from 'react'

export default class PageHeader extends PureComponent {
    render() {
        return (
            <div className='page-header'>
                <div className='left-content'>
                    <div className='logo' />
                </div>
                {
                    this.props.loggedin ?
                        <div className='right-content'>
                            <div className='icon-24 white-notification-icon' />
                            <div className='icon-24 white-person-icon' />
                        </div> :
                        <div className='right-content'>
                            <div className='' onClick={this.props.openLoggin}>Login</div>
                        </div>
                }
            </div>
        )
    }
}
