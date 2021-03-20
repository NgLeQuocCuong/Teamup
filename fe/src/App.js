import React, { PureComponent } from 'react';
import Loadable from 'react-loadable';
import LoadingPage from './utils/LoadingPage';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import { routeConstants } from './utils/constants/RouteConstant';
import ProfileContext from './context/ProfileContext';
import { ProfileServices } from './services/ProfileService';


const HomePage = Loadable({
    loader: () => import('./views/homepage/HomePage'),
    loading: LoadingPage,
})

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            listFriend: [],
            toggle: true,
        }
    }

    componentDidMount() {
        console.log('hihi')
        let [success, body] = ProfileServices.getUserInfo()
        if (success) {
            this.setState(body.data)
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.toggle !== this.state.toggle) {
            let [success, body] = ProfileServices.getUserInfo()
            if (success) {
                this.setState(body.data)
            }
        }
    }

    toggle = () => {
        console.log('HIHI')
        const tg = !this.state.toggle
        this.setState({
            toggle: tg,
        })
    }
    render() {
        console.log(this.state)
        return (
            <HashRouter>
                <ScrollToTop>
                    <ProfileContext.Provider
                        value={{
                            userName: this.state.userName,
                            listFriend: this.state.listFriend,
                            toggleFunction: this.toggle,
                            toggleValue: this.state.toggle,
                        }}
                    >
                        <Switch>
                            <Route path={routeConstants.ROUTE_ROOT} default name='Home' component={HomePage} />
                        </Switch>
                    </ProfileContext.Provider>
                </ScrollToTop>
            </HashRouter >
        );
    }
}

export default App;
