import React from "react";
// import ProfileOverlay from "./ProfileOverlay.js";
import "../sass/ProfilesPage.css";
var data = {"data": {"data.aml": {"profiles": [{"position": "President", "candidates": [{"name": "Joe Bruin Pres", "image": "https://www.w3schools.com/images/w3schools_green.jpg", "slate": "Bruins United", "platform": ["this is one", "this is another", "and here is a third"]}, {"name": "Joe Bruin", "image": "https://www.w3schools.com/images/w3schools_green.jpg", "slate": "Bruins United", "platform": ["this is one", "this is another", "and here is a third"]}]}, {"position": "External VP President", "candidates": [{"name": "Joe Bruin Pres VP", "image": "https://www.w3schools.com/images/w3schools_green.jpg", "slate": "Bruins United", "platform": ["this is one", "this is another", "and here is a third"]}, {"name": "Joe Bruin VP", "image": "https://www.w3schools.com/images/w3schools_green.jpg", "slate": "Bruins United VP", "platform": ["this is one", "this is another", "and here is a third"]}]}], "sanctions": [{"link": "http://features.dailybruin.com/2018/coachella", "time": "04/23/18 2:32PM", "title": "Didn\u2019t put a sticker on laptop", "recipients": ["Joe Bruin"]}, {"link": "http://features.dailybruin.com/2018/coachella", "time": "04/21/18 2:32PM", "title": "Didn\u2019t put a sticker on laptop", "recipients": ["Joe Bruin"]}]}}};
var candidates = []
var images = [];
const imgUrls = ['https://source.unsplash.com/PC_lbSSxCZE/800x600','https://source.unsplash.com/lVmR1YaBGG4/800x600','https://source.unsplash.com/5KvPQc1Uklk/800x600','https://source.unsplash.com/GtYFwFrFbMA/800x600'];

class ProfileOverlay extends React.Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
  }  
  componentWillUnMount() {
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown(e) {
    if (e.keyCode === 27)
      this.props.closeModal();
    if (e.keyCode === 37 && this.props.hasPrev)
      this.props.findPrev();
    if (e.keyCode === 39 && this.props.hasNext)
      this.props.findNext();
  }
  render () {
    const { closeModal, hasNext, hasPrev, findNext, findPrev, src, candidate} = this.props;
    if (!src) {
      console.log('whut')
      return null;
    }
    return (
      <div>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div isopen={(!!src).toString()} className="modal">
          <div className='modal-body'>
            <a href="#" className='modal-close' onClick={closeModal} onKeyDown={this.handleKeyDown}>&times;</a>
            {hasPrev && <a href="#" className='modal-prev' onClick={findPrev} onKeyDown={this.handleKeyDown}>&lsaquo;</a>}
            {hasNext && <a href="#" className='modal-next' onClick={findNext} onKeyDown={this.handleKeyDown}>&rsaquo;</a>}
            <div className="candidateModalInfo">
	            <img src={src} />
	            <div className="candidateOverlay"> 
	            	<div className="candidateName"> {candidate.name} </div>
	            	<div className="candidateSlate"> {candidate.slate} </div>
	            	<div className="candidateOverlayPlatform">{candidate.platform}</div> 
	            </div>
	        </div>
          </div>
          
        </div>
      </div>
    )
  }
}

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'https://kerckhoff.dailybruin.com/api/packages/flatpages/usac.elections2018/', false ); // false for synchronous request
    xmlHttp.send( null );
    candidates = [];
    this.state = {
    	// candidates: JSON.parse(xmlHttp.responseText)['data']['data.aml']['profiles'],
    	candidates: data['data']['data.aml']['profiles'],
    	currentIndex: null
    }
    // this.ca = [];
    this.state.candidates.forEach(function(position){
    	position.candidates.forEach(function(candidate){
    		candidate.position = position;
    		candidates.push(candidate);
    		images.push(candidate.image);
    	})
    })
    this.closeModal = this.closeModal.bind(this);
    this.findNext = this.findNext.bind(this);
    this.findPrev = this.findPrev.bind(this);
    // this.renderImageContent = this.renderImageContent.bind(this);
  }

  openModal(e, index) {
  	console.log('index', index, candidates[index].image);
    this.setState ({ currentIndex: index });
  }
  closeModal(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState ({ currentIndex: null });
  }
  findPrev(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex -1
    }));
  }
  findNext(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }));
  }
  		// eventually use images from candidates array as inline style for background image
		// TODO: onclick handler passes in whole candidate
  printCandidates(candidates, offset){
  	const candidateCards = candidates.map(function(candidate, index){
  		console.log(candidate.image);
  		let style = {
  			backgroundImage: "url(" + candidate.image + ")",
  		};
		return <div className="candidate_card" onClick={(e) => this.openModal(e, offset+index)} index="{offset+index}">
			<div className="candidate_image circle" style={style}></div>
			<div className="candidateName">{candidate.name}</div>
			<div className="candidateSlate">{candidate.slate}</div>
		</div>
	}, this);
	return candidateCards;
  }
  printPositions(){
  	let index = 0;
  	console.log(candidates);
  	const positions = this.state.candidates.map(function(positionInfo){
  		index += positionInfo.candidates.length;
  		return <div className="positionRow">
  			<div className="positionName">
  				{positionInfo.position}
  			</div>
  			<div className="positionCandidates">
  				{this.printCandidates(positionInfo.candidates, index - positionInfo.candidates.length)}
  			</div>
  		</div>
  	}, this);

  	return positions;
  }

  render() {
    return(
      <div>
        {this.printPositions()}
        <ProfileOverlay
          closeModal={this.closeModal} 
          findPrev={this.findPrev} 
          findNext={this.findNext} 
          hasPrev={this.state.currentIndex > 0} 
          hasNext={this.state.currentIndex + 1 < candidates.length} 
          src={images[this.state.currentIndex]}
          candidate={candidates[this.state.currentIndex]}
        />
      </div>
    );
  }
}

export default ProfilePage;
