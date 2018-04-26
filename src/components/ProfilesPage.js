import React from "react";
// import ProfileOverlay from "./ProfileOverlay.js";
import "../sass/ProfilesPage.css";
  var data = {"data": {"data.aml": {"profiles": [{"position": "President", "candidates": [{"name": "Joe Bruin Pres", "image": "https://www.w3schools.com/images/w3schools_green.jpg", "slate": "Bruins United", "endorsed": "Yes", "platform": ["this is one", "this is another", "and here is a third"], "endorsement_text": "This is why"}, {"name": "Joe Bruin", "image": "https://www.w3schools.com/images/w3schools_green.jpg", "slate": "Bruins United", "platform": ["this is one", "this is another", "and here is a third"]}]}, {"position": "External VP President", "candidates": [{"name": "Joe Bruin Pres VP", "image": "https://www.w3schools.com/images/w3schools_green.jpg", "slate": "Bruins United", "platform": ["this is one", "this is another", "and here is a third"]}, {"name": "Joe Bruin VP", "image": "https://www.w3schools.com/images/w3schools_green.jpg", "slate": "Bruins United VP", "platform": ["this is one", "this is another", "and here is a third"]}]}], "sanctions": [{"link": "http://features.dailybruin.com/2018/coachella", "time": "04/23/18 2:32PM", "title": "Didn\u2019t put a sticker on laptop", "recipients": ["Joe Bruin", "Joe Bruin Pres"]}, {"link": "http://features.dailybruin.com/2018/coachella", "time": "04/21/18 2:32PM", "title": "Didn\u2019t put a sticker on laptop", "recipients": ["Joe Bruin"]}]}}};


  class DropDown extends React.Component {
  // static propTypes = {
  //   className: React.PropTypes.string
  // };
  // static defaultProps = {
  //   className: ''
  // };
  constructor(...args){
    super(...args);

    this.state = {
      active: false
    };
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.renderSelectionCont = this.renderSelectionCont.bind(this);
  }
  toggleDropDown(action, e){
    switch (action){
      case 'close':
        this.setState({
          active: false
        });
        document.removeEventListener('click', this.handleDocumentClick);
        break;
      default:
        this.setState({
          active: true
        });
        document.addEventListener('click', this.handleDocumentClick);
        break
    }
  }
  handleSelection(item){
    this.props.onClick(item);
    this.toggleDropDown('close');
  }
  handleDocumentClick(){
    this.toggleDropDown('close');
  }
  handleOutsideClick(e){
    e.nativeEvent.stopImmediatePropagation();
  }
  renderSelectionCont(){
    if (!this.state.active) return;

    return <DropDownItems options={this.props.options} onClick={this.handleSelection} displayField={this.props.displayField} />;
  }

  render(){
    let wrapperClassName = 'bd-dropdown' + (this.props.className ? ' ' + this.props.className : '');
    let caretClass = 'fa fa-chevron-down';
    let toggle = 'open';
    if (this.state.active) {
      caretClass = 'fa fa-chevron-up';
      wrapperClassName = wrapperClassName + ' __active';
      toggle = 'close';
    }

    return (
      <div className={wrapperClassName} onClick={this.handleOutsideClick}>
        <div className='__control' onClick={this.toggleDropDown.bind(this, toggle)}>
          <div>{this.props.value}</div>
          <i className={caretClass}></i>
        </div>
        {this.renderSelectionCont()}
      </div>
    );
  }
}

class DropDownItems extends React.Component {
  constructor(...args){
    super(...args);
  }
  render(){
    let options = this.props.options.map((item, idx) => {

      return (
        <li className='__item' key={idx} onClick={this.props.onClick.bind(this, item)}>{item.display}</li>
      );
    });
    return (
      <ul className='__options' onClick={this.props.onOutsideClick}>
        {options}
      </ul>
    );
  }
}
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
      <div id="mount">
        <div className="modal-overlay" onClick={closeModal}></div>
        <div isopen={(!!src).toString()} className="modal">
          <div className='modal-body'>
            <a href="#" className='modal-close' onClick={closeModal} onKeyDown={this.handleKeyDown}>&times;</a>
            {hasPrev && <a href="#" className='modal-prev' onClick={findPrev} onKeyDown={this.handleKeyDown}>&lsaquo;</a>}
            {hasNext && <a href="#" className='modal-next' onClick={findNext} onKeyDown={this.handleKeyDown}>&rsaquo;</a>}
            <div className="candidateModalInfo">
              <div className="candidateModalImageContainer">
	             <img src={src} className="candidateModalImage"/>
              </div>
	            <div className="candidateOverlay">
	            	<div className="candidateOverlayName"> {candidate.name} </div>
	            	<div className="candidateOverlaySlate"> {candidate.slate} </div>
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

    this.state = {
    	// candidates: JSON.parse(xmlHttp.responseText)['data']['data.aml']['profiles'],
    	candidates: data['data']['data.aml']['profiles'],
    	currentIndex: null,
      displayValue: 'All',
    }
    // this.ca = [];
    var dropdownOptions = [{display: 'All', value: 0}]
    var candidates = [];
    var images = [];
    this.handleSelection = this.handleSelection.bind(this);
    this.state.candidates.forEach(function(position, index){
    	dropdownOptions.push({display: position.position, value: index + 1});
    	position.candidates.forEach(function(candidate){
    		candidate.position = position;
    		candidates.push(candidate);
    		images.push(candidate.image);
    	})
    })
    this.images = images;
    this.candidatesAll = candidates;
    this.dropdownOptions = dropdownOptions;
    this.closeModal = this.closeModal.bind(this);
    this.findNext = this.findNext.bind(this);
    this.findPrev = this.findPrev.bind(this);
    // this.renderImageContent = this.renderImageContent.bind(this);
  }
  handleSelection(item){
    this.setState({
      displayValue: item.display
    })
  }
  openModal(e, index) {
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
      let classcandidate = "notEndorsed";
      if(candidate.endorsed == "Yes" || candidate.endorsed == "yes")
        classcandidate = "endorsed";
  		let style = {
  			backgroundImage: "url(" + candidate.image + ")",
  		};
      classcandidate += " circle"
		return <div className="candidate_card" onClick={(e) => this.openModal(e, offset+index)} key={index} index="{offset+index}">
      <div className="break"></div>
			<div className={classcandidate} style={style}></div>
			<div className="candidateName">{candidate.name}</div>
			<div className="candidateSlate">{candidate.slate}</div>
		</div>
	}, this);
	return candidateCards;
  }
  printPositions(){
  	let index = 0;
  	const positions = this.state.candidates.map(function(positionInfo, i){
  		index += positionInfo.candidates.length;
  		if (this.state.displayValue == positionInfo.position || this.state.displayValue == "All")
	  		return <div className="positionRow" key={i}>
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
      	<div className='dropdown-width'>
        <DropDown options={this.dropdownOptions} value={this.state.displayValue} onClick={this.handleSelection} />
      </div>
        {this.printPositions()}
        <ProfileOverlay
          closeModal={this.closeModal}
          findPrev={this.findPrev}
          findNext={this.findNext}
          hasPrev={this.state.currentIndex > 0}
          hasNext={this.state.currentIndex + 1 < this.candidatesAll.length}
          src={this.images[this.state.currentIndex]}
          candidate={this.candidatesAll[this.state.currentIndex]}
        />
      </div>
    );
  }
}

export default ProfilePage;
