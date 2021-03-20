import React, { PureComponent } from 'react';
import Loadable from 'react-loadable';
import LoadingPage from './utils/LoadingPage';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import { routeConstants } from './utils/constants/RouteConstant';
import ProfileContext from './context/ProfileContext';

const HomePage = Loadable({
    loader: () => import('./views/homepage/HomePage'),
    loading: LoadingPage,
})

class App extends PureComponent {
    render() {
        return (
            <HashRouter>
                <ScrollToTop>
                    <ProfileContext.Provider
                        value={{
                            access: 'hihi',
                            refresh: 'ahuhu',
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
