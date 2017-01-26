'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavigationPanelDetails from '../navigationPanelDetails'
import NavigationPanel from '../navigationPanel'
import LoginPage from '../loginPage'
import SnippetTable from '../snippetTable'
import SearchPage from '../searchPage'
import AlertCard from '../alertCard'

import './index.scss'

class AppContainer extends Component {

  renderSearchPage () {
    if (this.props.searchWindowStatus === 'OFF') return null
    return (
      <SearchPage searchIndex = { this.props.searchIndex } />
    )
  }

  render () {
    let {
        userSession,
        getLoggedInUserInfo,
        launchAuthWindow,
        updateLocalStorage,
        updateActiveGistAfterClicked,
        reSyncUserGists,
        searchWindowStatus,
        searchIndex } = this.props

    if (userSession.activeStatus === 'ACTIVE') {
      return (
        <div className='app-container'>
          { this.renderSearchPage() }
          <NavigationPanel
            searchIndex = { searchIndex }
            updateLocalStorage = { updateLocalStorage }
            updateActiveGistAfterClicked = { updateActiveGistAfterClicked }
            reSyncUserGists = { reSyncUserGists } />
          <NavigationPanelDetails />
          <SnippetTable
            searchIndex = { searchIndex }
            reSyncUserGists = { reSyncUserGists } />
          <div className='alertCard'>
            <AlertCard/>
          </div>
        </div>
      )
    }

    return (
      <div className='app-container'>
        <LoginPage
          getLoggedInUserInfo = { getLoggedInUserInfo }
          launchAuthWindow = { launchAuthWindow }/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    userSession: state.userSession,
    searchWindowStatus: state.searchWindowStatus
  }
}

export default connect(mapStateToProps)(AppContainer)
