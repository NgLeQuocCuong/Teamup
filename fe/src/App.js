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
            name: '',
            friend: [],
            toggle: true,
        }
    }

    async componentDidMount() {
        let [success, body] = await ProfileServices.getUserInfo()
        if (success) {
            this.setState(body.data)
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevState.toggle !== this.state.toggle) {
            let [success, body] = await ProfileServices.getUserInfo()
            if (success) {
                this.setState(body.data)
            }
        }
    }

    toggle = () => {
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
                            name: this.state.name,
                            friend: this.state.friend,
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
