import React from 'react'

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
    const {defaultCampaign, activedCampaigns, updateVotedList} = this.props;
    return (
      <div className='top-area'>
        <VotingCard campaign={defaultCampaign} updateVotedList={updateVotedList}/>
        <ActiveCards campaigns={activedCampaigns} updateDefault={this.props.updateDefault} defaultCampaign={defaultCampaign}/>
      </div>
    )
  }
}
