import React, { Component } from 'react';
import './App.css';

import helper, {Campaign} from './helpers';

import mCompo from './components';

class App extends Component {

  state = {
    votingCampaigns:[],
    endedCampaigns: [],
    activedCampaigns: [],
    votedCampaigns: [],
    defaultCampaign: {}
  }

  updateVotedList = (voted)=>{
    let newVotedList: any[] = Object.assign([], this.state.votedCampaigns);

    if(!newVotedList.includes(`${voted.campaignId}-${voted.campaignOptionId}`)){
      newVotedList.push(`${voted.campaignId}-${voted.campaignOptionId}`);
    }
    this.setState({votedCampaigns: newVotedList});
  }

  updateDefault = (campaign)=>{
    this.setState({defaultCampaign: campaign});
  }

  componentDidMount(){
    helper.getAllCampaign()
    .then(data=>{return data.data})
    .then((campaigns: Campaign[])=>{
      this.setState({votingCampaigns: campaigns})

      if(campaigns.length>0){
        let ended = [];
        let actived = [];
        let defaultCamp = campaigns[0];
        const current = new Date();
        campaigns.forEach( campaign =>{
          campaign.campaignStartDate = new Date(campaign.campaignStartDate);
          campaign.campaignEndDate = new Date(campaign.campaignEndDate);
          if(campaign.campaignEndDate < current){
            ended.push(campaign);
          } else if(campaign.campaignStartDate < current && campaign.campaignEndDate > current){
            actived.push(campaign);
          }

          if(defaultCamp.campaignStartDate < campaign.campaignStartDate){
            defaultCamp = campaign;
            
          }
        });



        this.setState({endedCampaigns: ended, activedCampaigns: actived, defaultCampaign: defaultCamp});
      }
      
    })
  }

  render() {
    const {votingCampaigns, activedCampaigns, endedCampaigns, votedCampaigns, defaultCampaign} = this.state;
    return (
      <div className="App">
        <mCompo.TopArea defaultCampaign={defaultCampaign} activedCampaigns={activedCampaigns} updateDefault={this.updateDefault} updateVotedList={this.updateVotedList} votedCampaigns={votedCampaigns}/>
        <mCompo.MostEnd campaigns={votingCampaigns}/>
        <mCompo.VotingList campaigns={votingCampaigns}/>
      </div>
    );
  }
}

export default App;
