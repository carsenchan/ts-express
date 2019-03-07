import React, { Component } from 'react'
import { Card } from 'reactstrap';
import moment from 'moment';

import './styles.css';
export default class ActiveCard extends Component {

  state={
    activeCampaign:{}

  }


  render() {
    const {campaigns} = this.props;
    return (
      <div>
        Active List
        { campaigns? campaigns.map(campaign=><SimpleCard key={campaign._id} campaign={campaign} onClick={this.props.updateDefault} defaultCampaign={this.props.defaultCampaign}/> ): <div/>}
      </div>
    )
  }
}

const SimpleCard = (props)=>{
  const {campaign, defaultCampaign} = props;
  return (<div><Card onClick={()=>props.onClick(campaign)} className={defaultCampaign._id === campaign._id? "card simple-active-item item-active": "card simple-active-item"}>
    <div className="simple-card-desc">{campaign.campaignDesc}</div>
    <div className="simple-card-startdate">{`Start Date: ${moment(campaign.campaignStartDate).format('YYYY/MM/DD')}`}</div>
    <div className="simple-card-enddate">{`End Date: ${moment(campaign.campaignEndDate).format('YYYY/MM/DD')}`}</div>
  </Card></div>);
}
