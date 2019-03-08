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

  getItemCount = async (item)=>{
    let newItem = Object.assign({}, item);
    let campaignSummary = await helper.getCampaignSummary(item._id);
    campaignSummary = campaignSummary.data;
    let total = 0;
    if(campaignSummary.length > 0){
      total= campaignSummary.map(elem=>elem.count).reduce((partial_sum, a) => partial_sum + a);
    }
    newItem.total = total;
    return newItem;
  }

  componentDidMount(){
    helper.getAllCampaign()
    .then(data=>{return data.data})
    .then((campaigns: Campaign[])=>{

      Promise.all(campaigns.map((item)=> {return this.getItemCount(item)}))
      .then((data)=>this.setState({votingCampaigns: data}))

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
        <mCompo.MostEnd campaigns={endedCampaigns}/>
        <mCompo.VotingList campaigns={votingCampaigns}/>
      </div>
    );
  }
}

export default App;
