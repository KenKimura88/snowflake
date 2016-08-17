/**
 * # ForgotPassword.js
 * 
 */
'use strict';
/**
 * ## Imports
 * 
 * Redux 
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions';

/**
 * Immutable
 */ 
import {Map} from 'immutable';

/**
 *   LoginRender
 */
import LoginRender from '../components/LoginRender';

/**
 * Need React
 */
import React from 'react';

const {
  REGISTER, 
  LOGIN,
  FORGOT_PASSWORD
} = require('../lib/constants').default;

/**
  * ## Redux boilerplate
  */
const actions = [
  authActions
];

function mapStateToProps(state) {
  return {
      ...state
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

function buttonPressHandler(resetPassword, email) {
  resetPassword (email);
}
/**
 * ### Translations
 */
var I18n = require('react-native-i18n');
import Translations from '../lib/Translations';
I18n.translations = Translations;

let ForgotPassword = React.createClass({

  render() {
    let loginButtonText = I18n.t("ForgotPassword.reset_password");
    let onButtonPress = buttonPressHandler.bind(null,
					        this.props.actions.resetPassword,
					        this.props.auth.form.fields.email
		                               );

    return(
      <LoginRender 
          formType={ FORGOT_PASSWORD }
          loginButtonText={ loginButtonText }
          onButtonPress={ onButtonPress }
          displayPasswordCheckbox={ false }
          leftMessageType = { REGISTER }
          rightMessageType = { LOGIN }
          auth={ this.props.auth }
          global={ this.props.global }
      />
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);