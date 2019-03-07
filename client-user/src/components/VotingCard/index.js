import React, { Component } from 'react'
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Modal, ModalHeader, 
  ModalBody, ModalFooter, InputGroup, Input , InputGroupAddon, FormGroup, Label} from 'reactstrap';
import moment from 'moment';
import socketio from 'socket.io-client';
import helpers from '../../helpers';
import idValidator from './IDInput';
import './styles.css';

const socketio_URL =  'http://localhost:6001/votes';
const socket_EVENT = 'SUBSCRIBE';

export default class VotingCard extends Component {

  state ={
    socket:undefined,
    summary: [],
    modal: false,
    voteOption: {
      campaignId: undefined, 
      hkId: undefined,
      campaignOptionId: undefined
    },
    idCharacter: '',
    idMiddleNum: '',
    idBracket: '',
  }

  componentDidMount(){
    //const socket = socketio(socketio_URL);
    this.initSocket();
  }

  toggle = ()=>{
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
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
      this.state.socket.on(`${socket_EVENT}`, this.socketDataHandler);
    }
    
  }

  socketDataHandler = (data)=>{
    const d1 = Object.keys(data).map((key)=>data[key])

    if(d1.length>0){
      let newSummary = [];
      if(d1[0]._id.split('-')[0] === this.props.campaign._id){
        d1.forEach((elem, index)=>{
          const cId = elem._id.split('-')[0];
          if(cId === this.props.campaign._id){
            const optionId = elem._id.split('-')[1];
            const count = elem.count;
            newSummary.push({cId, optionId, count});
          }
            
        });
        
        this.setState({summary: newSummary});
      }
     
    }
  }

  socketRemoveCompaignSummary = (socket, campaignId)=>{
    console.log("Remove Event", campaignId)
    if(socket && campaignId){
      //this.state.socket.removeListener(`${socket_EVENT}-${campaignId}`, ());
      this.state.socket.removeListener(`${socket_EVENT}-${campaignId}`, this.socketDataHandler);

    }
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
    
  }

  // Update Redio Button Change
  handleVoteRadio = (event)=>{
    let newVoteOption = Object.assign({}, this.state.voteOption);
    newVoteOption.campaignOptionId = `${event.target.value}`;
    this.setState({voteOption: newVoteOption});
  }

  // Update HK ID Character Change
  handleIdCharacterUpdate = (event)=>{
    let newVoteOption = Object.assign({}, this.state.voteOption);
    
    let newChara = event.target.value;
    
    newVoteOption.hkId = `${newChara.toUpperCase()}${this.state.idMiddleNum}${this.state.idBracket}`;
    this.setState({idCharacter: newChara, voteOption: newVoteOption });
  }
  
  // Update HK ID Character Change
  handleIdNumberUpdate = (event)=>{
    let newVoteOption = Object.assign({}, this.state.voteOption);
    
    let newChara = event.target.value;
    newVoteOption.hkId = `${this.state.idCharacter}${newChara}${this.state.idBracket}`;
    this.setState({idMiddleNum: newChara, voteOption: newVoteOption });
  }

  handleBracketUpdate = (event)=>{
    let newVoteOption = Object.assign({}, this.state.voteOption);
    
    let newChara = event.target.value;
    newVoteOption.hkId = `${this.state.idCharacter}${this.state.idMiddleNum}${newChara.toUpperCase()}`;
    this.setState({idBracket: newChara, voteOption: newVoteOption });
  }

  handleSubmitVote = (callback)=>()=>{
    let newVoteOption = Object.assign({}, this.state.voteOption);
    newVoteOption.campaignId = this.props.campaign._id;
    if(!newVoteOption.hkId || !newVoteOption.campaignOptionId || !this.state.idCharacter || !this.state.idMiddleNum || !this.state.idBracket){
      alert("Please select option and input your HKID number");
      if(callback)callback();
    } else {
      if(idValidator(newVoteOption.hkId)) {
        helpers.createVoting(newVoteOption.campaignId, newVoteOption)
        .then((data)=>{
          alert("Thanks for your voting!")
          if(callback)callback();
        })
        .catch(error=>console.log(error))
      } else {
        alert("Your ID Number is not valid, voting will NOT be submitted!");
        if(callback)callback();
      }
    }
  }


  render() {
    const {campaign} = this.props;
    const {summary} = this.state;
    return (
       <div>
        {
           campaign.campaignDesc ? <Card className='main-voting-card'>
           <CardBody>
             <CardTitle>{campaign.campaignDesc}</CardTitle>
             <div className="main-card-startdate">{`Start Date: ${moment(campaign.campaignStartDate).format('YYYY/MM/DD')}`}</div>
             <div className="main-card-enddate">{`End Date: ${moment(campaign.campaignEndDate).format('YYYY/MM/DD')}`}</div>
             <ul>
               {
                  campaign.campaignOptions.map((option)=>{
                    const opt = summary.find(element=>{return element.optionId === `${option.id}`});

                    const count = opt ? opt.count : 0;
                    return(<li key={option.id}>{`${option.id}. ${option.optionDesc} - Vote:${count}`}</li>)})
               }
             </ul>
             <Button color="primary" onClick={this.toggle}>Vote</Button>
           </CardBody>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Vote</ModalHeader>
              {
                campaign.campaignOptions.map((option)=><RadioOption option={option} key={option.id} onChange={this.handleVoteRadio}/>)
              }
              <br/>

              Input your Hong Kong ID number:
              <InputGroup>
                <InputGroupAddon addonType="prepend">e.g: 'R' or 'AB'</InputGroupAddon>
                <Input placeholder="character" onChange={this.handleIdCharacterUpdate}/>
                <InputGroupAddon addonType="prepend"># </InputGroupAddon>
                <Input placeholder="number" onChange={this.handleIdNumberUpdate}/>
                <InputGroupAddon addonType="prepend"># in bracket</InputGroupAddon>
                <Input placeholder="bracket" onChange={this.handleBracketUpdate}/>
              </InputGroup>
              <ModalFooter>
                <Button color="primary" onClick={ this.handleSubmitVote(this.toggle)}>Vote</Button>{' '}
              </ModalFooter>
            </Modal>
         </Card>:<div/>
        }
        
      </div>
    
    )
  }
}

const RadioOption = (props)=>{

  const {option, onChange} = props;
  return (<FormGroup check>
    <Label check>
      <Input type="radio" name="radio1" value={option.id} onChange={onChange}/>
      {`${option.id}. ${option.optionDesc}`}
    </Label>
  </FormGroup>
  )
}