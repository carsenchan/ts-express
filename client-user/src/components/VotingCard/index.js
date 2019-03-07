import React, { Component } from 'react'
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import moment from 'moment';
import socketio from 'socket.io-client';

const socketio_URL =  'http://localhost:6001/votes';
const socket_EVENT = 'SUBSCRIBE';

export default class VotingCard extends Component {

  state ={
    socket:undefined,
    summary: []
  }

  componentDidMount(){
    //const socket = socketio(socketio_URL);
    this.initSocket();
  }

  initSocket = (prevCampainId)=>{

    const socket = socketio(socketio_URL);

    if("_id" in this.props.campaign){


      socket.on('connect', ()=>{
        this.socketListenCompaignSummary(socket, this.props.campaign._id);
      });
      
      this.setState({socket});
    } else {
      console.log('Not find Object')
    }
    
  }

  socketListenCompaignSummary = (socket, campaignId)=>{
    console.log("Listen Event", campaignId)
    if(socket){
      this.state.socket.emit(socket_EVENT, campaignId);
      this.state.socket.on(`${socket_EVENT}-${campaignId}`, this.socketDataHandler);
    }
    
  }

  socketDataHandler = (data)=>{
    const d1 = Object.keys(data).map((key)=>data[key])
    if(d1.length>0){
      let newSummary = [];
      d1.forEach((elem, index)=>{
        const cId = elem._id.split('-')[0];
        if(cId === this.props.campaign._id){
          const optionId = elem._id.split('-')[1];
          const count = elem.count;
          newSummary.push({cId, optionId, count});
        }
          
      });
      console.log(newSummary);
      this.setState({summary: newSummary});
    }
  }

  socketRemoveCompaignSummary = (socket, campaignId)=>{
    console.log("Remove Event", campaignId)
    if(socket && campaignId){
      //this.state.socket.removeListener(`${socket_EVENT}-${campaignId}`, ());
      this.state.socket.removeListener(`${socket_EVENT}-${campaignId}`, this.socketDataHandler);

    }
  }

  handleSummary = (summary)=>{
    console.log(summary);
  }

  componentDidUpdate(prevProps, prevState){

    if("_id" in this.props.campaign && (this.props.campaign._id !== prevProps.campaign._id)){
      this.initSocket()
      this.socketListenCompaignSummary(this.state.socket, this.props.campaign._id);
      this.socketRemoveCompaignSummary(this.state.socket, prevProps.campaign._id);
      //this.state.socket.removeAllListeners([`${socket_EVENT}-${prevProps.campaign._id}`]);
    } 
    //this.initSocket();
  }

  componentWillUnmount(){
    console.log("I am Unmount")
  }

  render() {
    const {campaign} = this.props;
    const {summary} = this.state;
    return (
       <div>
        {
           campaign.campaignDesc ? <Card>
           <CardBody>
             <CardTitle>{campaign.campaignDesc}</CardTitle>
             <CardTitle>{`Start Date: ${moment(campaign.campaignStartDate).format('YYYY/MM/DD')}`}</CardTitle>
             <CardTitle>{`End Date: ${moment(campaign.campaignEndDate).format('YYYY/MM/DD')}`}</CardTitle>
             <ul>
               {
                  campaign.campaignOptions.map((option)=>{
                    const opt = summary.find(element=>{return element.optionId === `${option.id}`});

                    const count = opt ? opt.count : 0;
                    return(<li key={option.id}>{`${option.id}. ${option.optionDesc} Vote:${count}`}</li>)})
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
