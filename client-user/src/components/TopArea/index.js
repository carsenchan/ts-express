import React, { Component } from 'react'

import ActiveCards from '../ActiveCard';
import VotingCard from '../VotingCard';
import './styles.css';
export default class TopArea extends React.PureComponent {

  state = {
    defaultCampaign : this.props.defaultCampaign,
    activedCampaigns: this.props.activedCampaigns
  }

  componentDidMount(){
    this.setState({defaultCampaign : this.props.defaultCampaign})
  }

  render() {
    const {defaultCampaign, activedCampaigns} = this.props;
    console.log(this.state);
    return (
      <div className='top-area'>
        <VotingCard campaign={defaultCampaign}/>
        <ActiveCards campaigns={activedCampaigns} updateDefault={this.props.updateDefault} defaultCampaign={defaultCampaign}/>
      </div>
    )
  }
}
