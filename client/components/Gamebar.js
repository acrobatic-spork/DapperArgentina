const React = require('react');
const SporkEntry = require('./SporkEntry');

class GameBar extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      sporks: []
    };
    
    this.getSporks = this.getSporks.bind(this);
  }

  getSporks(user){
    // Get the user's spork information
    var self = this;

    Users.getSporks(function(data) {
      self.setState({
        sporks: data
      });
    }, function(error) {
      console.error("Problem getting sporks!");
    },
    user);
  }

  componentDidMount () {
    this.getSporks();
  }

  render() {
    return (
      <div className="game-stats">
        {this.state.sporks.map ((spork, index) => (
              <SporkEntry number={number} key={index} />
            )
          )}
      </div>
    );
  }
}

module.exports = GameBar;