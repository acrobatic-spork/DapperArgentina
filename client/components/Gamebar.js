const React = require('react');
const SporkEntry = require('./SporkEntry');

class GameBar extends React.Component {
  
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div className="game-stats">
        {this.state.sporks.map ((spork, index) => (
              <SporkEntry number={number} key={index} i={index} />
            )
          )}
      </div>
    );
  }
}

module.exports = GameBar;