import React, { Component } from 'react'
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class VotingCard extends Component {
  state = {
    campaign: this.props.campaign
  }
  render() {
    const {campaign} = this.state
    console.log(campaign)
    
    return (
       <div>

        {
           campaign.campaignDesc ? <Card>
           <CardBody>
             <CardTitle>{campaign.campaignDesc}</CardTitle>
             <ul>
               {
                 campaign.campaignOptions.map((option)=><li key={option.id}>{`${option.id}. ${option.optionDesc}`}</li>)
               }
             </ul>
             <Button>Vote</Button>
           </CardBody>
         </Card>:<div/>
        }
        
      </div>
    
    )
  }
}
