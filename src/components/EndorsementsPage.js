import React from "react";

class ProfileOverlay extends React.Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
    console.log("loaded");
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
	            	<div className="candidateOverlaySlate"> {candidate.slate.toUpperCase()} </div>
	            	<div className="candidateOverlayPlatform">{candidate.endorsement_text}</div>
	            </div>
	        </div>
          </div>

        </div>
      </div>
    )
  }
}

class EndorsementsPage extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		loaded: false,
  		currentIndex: null,
  	};
  	this.endorsedCandidates = [];
  	this.images = [];
  }

  getCandidateInfo() {
  	fetch("https://kerckhoff.dailybruin.com/api/packages/flatpages/usac.elections2018/")
      .then(res => res.json())
      .then(data => {

      		// Go through the candidates that have endorsed field set to true
      		const profiles = data.data["data.aml"].profiles;
      		var endorsedCandidates = [];
      		var index = -1; // Works correctly for selection
      		var images = [];
      		profiles.map(pos => {

      			pos.candidates.map(candidate => {
      				/*if (candidate["endorsed"] == "Yes") {
      					// save candidates info for the position in object state only if the candidate is endorsed
      					endorsedCandidates[pos.position] = candidate;
      				}
      				else
      				{

      					//console.log("Candidate Not Endorsed: " + candidate.name)
      				}*/

      				//TODO: Move this code inside the if statement and uncomment the if statement
      				index += 1;
      				candidate.position = pos.position;
      				candidate.index = index;
      				endorsedCandidates.push(candidate); 
      				images.push(data.images.s3[candidate.image]['url']);
              candidate.image = data.images.s3[candidate.image]['url']
      			})
      		});
      		this.images = images;
      		this.endorsedCandidates = endorsedCandidates;
      		this.setState({loaded: true});

      		this.closeModal = this.closeModal.bind(this);
    		this.findNext = this.findNext.bind(this);
    		this.findPrev = this.findPrev.bind(this);

      	});
  }

  componentDidMount() {
  	this.getCandidateInfo();
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
      currentIndex: prevState.currentIndex - 1
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

  printCandidates() {
  	var index = 0;
  	const candidateCards = this.endorsedCandidates.map( (candidate) => {
  		console.log(candidate);
  		let classcandidate = "endorsed circle";
  		let style = {
  			backgroundImage: "url(" + candidate.image + ")",
  		}
  		return <div className="candidate_card" onClick={(e) => this.openModal(e, candidate.index)} key={candidate.index} index="{offset+index}">
					<div className="endorsedPositionName">
						{candidate.position}
					</div>

					<div className={classcandidate} style={style}></div>
     		 		<div className="candidate-info">
       				 	<div className="candidateName">{candidate.name}</div>
        				<div className="candidateSlate">{candidate.slate.toUpperCase()}</div>
      				</div>
				</div>
  	}, this);

  	return candidateCards;
  }

  render() {
  	if(this.state.loaded) {
  		return <div> <div className="positionRow" key={0}><div className="positionCandidates"> {this.printCandidates()} </div>
  					</div>
  					<ProfileOverlay
	  					closeModal = {this.closeModal}
	  					findPrev = {this.findPrev}
	  					findNext={this.findNext}
	            		hasPrev={this.state.currentIndex > 0}
	            		hasNext={this.state.currentIndex + 1 < this.endorsedCandidates.length}
	            		src={this.images[this.state.currentIndex]}
	            		candidate={this.endorsedCandidates[this.state.currentIndex]} />
	            </div>

  	}
  	else
  	{
  		return <div> Loading... </div>
  	}
  }
}

export default EndorsementsPage;
