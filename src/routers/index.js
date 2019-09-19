import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';

// import checkLogin from '../service/checkLogin'
import Index from '../components'

const fn = ({ history, app }) => {
    return (
        <Router history={ history }>
            <Switch>
                <Route path="/index" component={ Index }/>
                {/* <Route path="/index" component={ checkLogin(Index) }/> */}
                <Redirect to="/index"/>
            </Switch>
        </Router>
    )
}

export default fn;

export { Route }