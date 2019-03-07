import React, { Component } from 'react'
import ListItem from './ListItem';
import './styles.css';
export default class CampaignList extends Component {
  render() {
    const {campaigns} = this.props;
    return (
      <div className="all-list">
        <div className="list-header all-list-item">
          <div className="list-header-desc">Campaign</div>
          <div className="list-header-startdate">Start Date</div>
          <div className="list-header-enddate">End Date</div>
          <div className="list-header-total">Total</div>
        </div>
        {
          campaigns.map( (item, index)=><ListItem key={item._id} item={item}/>)
        }
      </div>
    )
  }
}
