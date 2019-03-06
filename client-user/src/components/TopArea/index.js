import React, { Component } from 'react'

import ActiveCards from '../ActiveCard';
import VotingCard from '../VotingCard';
import './styles.css';
export default class TopArea extends Component {

  state = {
    defaultCampaign : this.props.defaultCampaign,
    activedCampaigns: this.props.activedCampaigns
  }

  render() {
    const {defaultCampaign, activedCampaigns} = this.state
    return (
      <div className='top-area'>
        <VotingCard campaign={defaultCampaign}/>
        <ActiveCards/>
      </div>
    )
  }
}
