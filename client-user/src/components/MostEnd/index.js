import React, { Component } from 'react';
import { Card, CardBody, CardSubtitle} from 'reactstrap';
import './styles.css';
import helper from '../../helpers'

export default class MostEnd extends Component {

  state = {
    mostEnd: undefined,
    summary: []
  }

  componentDidMount(){
    this.findMostCurrentEnd()
  }

  findMostCurrentEnd = ()=>{
    const {campaigns} = this.props;
    let newCamps = Object.assign([], campaigns);
    if(newCamps && newCamps.length>0){
      if(newCamps.length === 1){
        this.setState({mostEnd: campaigns[0]})
      } else {
        newCamps.sort((elemA, elemB)=>{
          return elemA.campaignEndDate - elemB.campaignEndDate;
        })

        this.setState({mostEnd:newCamps[0]});//console.log(newCamps)
      }
      this.getSummary(newCamps[0]);
    }
   
  }

  getSummary = (campaign)=>{
    helper.getCampaignSummary(campaign._id)
    .then(data=>{return data.data})
    .then((result)=>{
      if(result.length> 0){
        let newSummary = result.map(elem=>{
          const optionId = elem._id.split('-')[1];
          return {optionId: `${optionId}`, count: elem.count}
        })
        this.setState({summary: newSummary});
      }
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.campaigns && this.props.campaigns.length > 0){
      if(prevProps.campaigns.length !== this.props.campaigns.length) this.findMostCurrentEnd();
      
    }
  }

  render() {
    
    const {mostEnd, summary} = this.state;
    return (
      <div className="most-end">
        <h3>Most End Campaign</h3>
        {mostEnd ?<div>
          <Card>
            <CardBody>
              
              <CardSubtitle>{mostEnd.campaignDesc}</CardSubtitle>
              <ul>
               {
                  mostEnd.campaignOptions.map((option)=>{
                    const opt = summary.find(element=>{return element.optionId === `${option.id}`});

                    const count = opt ? opt.count : 0;
                    return(<li key={option.id}>{`${option.id}. ${option.optionDesc} Vote:${count}`}</li>)})
               }
             </ul>
              
            </CardBody>
          </Card>
        </div>: <div/>}
      </div>
    )
  }
}
