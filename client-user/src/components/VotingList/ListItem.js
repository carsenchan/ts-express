import React, { Component } from 'react';
import moment from 'moment';
import helper from '../../helpers';

export default class ListItem extends Component {

  state = {
    printItem : this.props.item
  }

  componentDidMount(){
    const {printItem} = this.state;
    helper.getCampaignSummary(printItem._id)
    .then(data=>{return data.data})
    .then((result)=>{
      let total = 0
      if(result.length>0){
        total= result.map(elem=>elem.count).reduce((partial_sum, a) => partial_sum + a);
      }
      this.setState({printItem: Object.assign({}, printItem, {total})})
    })

    
  }

  render() {
    const {printItem} = this.state;
    return (
      <div className="all-list-item">
        <div className="item-desc">{printItem.campaignDesc}</div>
        <div className="item-startdate">{moment(printItem.campaignStartDate).format('YYYY/MM/DD')}</div>
        <div className="item-enddate">{moment(printItem.campaignEndDate).format('YYYY/MM/DD')}</div>
        <div className="item-total-vote">{printItem.total}</div>
      </div>
    )
  }
}
