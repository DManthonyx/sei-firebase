import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Navigation from '../Navigation'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
import AccountPage from '../Account'
import AdminPage from '../Admin'

import * as ROUTES from '../../constants/routes'
import { withFirebase } from '../Firebase'


class App extends Component {

  state = {
    authUser: null
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.props.firebase.user(authUser.uid).get()
            .then(snapShot => this.setState({ authUser: snapShot.data() }))
        : this.setState({ authUser: null })
    })
  }

  render() {
    return (
      <div>
        <Navigation authUser={this.state.authUser}/>
        <hr />
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.SIGN_UP} render={() => <SignUpPage />} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          {
            this.state.authUser
             ? <Route exact path={ROUTES.HOME} render={() => <HomePage authUser={this.state.authUser}/>} />
             : null
          }
          <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        </Switch>
      </div>
    )
  }
}


export default withFirebase(App)