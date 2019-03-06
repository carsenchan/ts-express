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
          console.log(defaultCamp)
        });



        this.setState({endedCampaigns: ended, activedCampaigns: actived, defaultCampaign: defaultCamp});
      }
      
    })
  }

  render() {
    const {votingCampaigns, activedCampaigns, endedCampaigns, votedCampaigns, defaultCampaign} = this.state;
    return (
      <div className="App">
        <mCompo.TopArea defaultCampaign={defaultCampaign} activedCampaigns={activedCampaigns}/>
        <mCompo.MostEnd />
        <mCompo.VotingList campaigns={votingCampaigns}/>
      </div>
    );
  }
}

export default App;