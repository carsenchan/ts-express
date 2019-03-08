import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,FormGroup, Label, Input } from 'reactstrap';

import ListItem from './ListItem';
import './styles.css';
export default class CampaignList extends React.PureComponent {

  state ={
    sortBy: 'endDate', // 'startDate' | 'endDate' | 'totalCount'
    sortOrder: 'desc', // 'desc' | 'asc'
    campaigns: this.props.campaigns,
    modal: false
  }

  toggle= () =>{
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  reOrderCampaign = ()=>{
    const {sortBy, sortOrder} = this.state;
    let newCampaigns:any[]  = Object.assign([], this.state.campaigns)
    switch (sortBy) {
      case 'startDate':
      default:
        return newCampaigns.sort( (elemA, elemB)=>{
          if(sortOrder === 'desc'){
            return elemB.campaignStartDate-elemA.campaignStartDate;
          }else{
            return elemA.campaignStartDate-elemB.campaignStartDate;
          }
        })
      case 'endDate':
        return newCampaigns.sort( (elemA, elemB)=>{
          if(sortOrder === 'desc'){
            return elemB.campaignEndDate-elemA.campaignEndDate;
          }else{
            return elemA.campaignEndDate-elemB.campaignEndDate;
          }
        })

      case 'totalCount':
        return newCampaigns.sort( (elemA, elemB)=>{
          if(sortOrder === 'desc'){
            return elemB.total-elemA.total;
          }else{
            return elemA.total-elemB.total;
          }
        })
    }
  }

  handleSortByRadio = (event)=>{
    this.setState({sortBy: event.target.value});
  }

  handleSortOrderRadio = (event)=>{
    this.setState({sortOrder: event.target.value});
  }

  handleSubmitSort = ()=>{
    //this.setState({campaigns: this.reOrderCampaign()});
    this.toggle();
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.campaigns.length>0 && prevProps.campaigns.length !== this.props.campaigns.length){
      this.setState({campaigns: this.props.campaigns});
    }

    if(prevState.sortBy !== this.state.sortBy || prevState.sortOrder !== this.state.sortOrder){
      this.setState({campaigns: this.reOrderCampaign()});
    }
  }

  render() {
    const {campaigns, sortBy, sortOrder} = this.state;
    return (
      <div className="all-list">
        <div><Button color='primary' size='sm' onClick={this.toggle}>Sort</Button></div>
        <div className="list-header all-list-item">
          <div className="list-header-desc">Campaign</div>
          <div className="list-header-enddate">End Date</div>
          <div className="list-header-startdate">Start Date</div>
          
          <div className="list-header-total">Total</div>
        </div>
        {
          campaigns.map( (item, index)=><ListItem key={item._id} item={item}/>)
        }
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <div>Sort By</div>
              <RadioOption name='sortBy' value="startDate" text="Start Date" onChange={this.handleSortByRadio} currentValue={sortBy}/>
              <RadioOption name='sortBy' value="endDate"text="End Date" onChange={this.handleSortByRadio} currentValue={sortBy}/>
              <RadioOption name='sortBy' value="totalCount" text="Total # of voting" onChange={this.handleSortByRadio} currentValue={sortBy}/>
            <div>with</div>
              <RadioOption name='sortOrder' value="desc" text="Descending order" onChange={this.handleSortOrderRadio} currentValue={sortOrder}/>
              <RadioOption name='sortOrder' value="asc" text="Ascending order" onChange={this.handleSortOrderRadio} currentValue={sortOrder}/>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleSubmitSort}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const RadioOption = (props)=>{
  const {value, text, onChange, name, currentValue} = props;
  return (<FormGroup check>
    <Label check>
      <input type="radio" name={name} value={value} onChange={onChange} checked={value===currentValue}/>
      {text}
    </Label>
  </FormGroup>
  )
}
