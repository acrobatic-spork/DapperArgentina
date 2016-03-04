const React = require('react');

const ConfirmFork = (props) => (
  <div id="modal1" className="modal">
    
    <div className="modal-content">
      <h4>You're about to fork a repo!</h4>
          
      <p>Clone (copy) the repo by opening the terminal and running</p> <pre>git clone "link to your forked repo"</pre>
      <p>The link depends on the repo, and can be found on GitHub.</p>
      <p>Add the original repo as an upstream remote</p>
      <p>In the repo's main directory, run:</p> <pre>git remote add upstream "link to the original repo"</pre>
      <p><strong>Make changes and commit!</strong></p>

      <a className="cyan-text lighten-2 cyan-text lighten-2" href="/resources">Visit our Getting Started page for more details</a>

    </div>
    <div class="modal-footer">
      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Go!</a>
    </div>
  </div>
);


module.exports = ConfirmFork;
