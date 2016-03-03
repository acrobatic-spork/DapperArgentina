const React = require('react');

const GitInstruct = (props) => ( 
  <div className="row">
    <div className="col s12 m5">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">How to Contribute</span>
          <h5>Fork the Repo</h5>
          <p>To fork, just click the button! The repo will now appear in your list of repos on GitHub</p>
          <h5>Copy the files to your computer</h5>
          <p>Clone (copy) the repo by opening the terminal and running <pre>git clone "link to your forked repo"</pre>
          The link depends on the repo, and can be found on GitHub.</p>
          <h5>Add the original repo as an upstream remote</h5>
          <p>In the repo's main directory, run <pre>git remote add upstream "link to the original repo"</pre></p>
          <h5>Make changes and commit</h5>
          <p>Open the files, create a new branch, and make changes. When you've made a change that you know works, open the terminal, cd into the main
          folder of the repo, and run <pre>git add "file"</pre> and then... <pre>git commit</pre>.</p>
          <h5>Push to your fork</h5>
          <p>Push your changes with <pre>git push origin "branch-name"</pre></p>
          <h5>Submit a pull request!</h5>
          <p>Make sure you test your code well, and leave the owners of the repo a detailed message letting them know what your changes do.
          Congratulations, you're contributing to the open source community!</p>
        </div>
        <div className="card-action">
          <a href="https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/">Detailed Instruction</a>
          <a href="https://guides.github.com/activities/contributing-to-open-source/">GitHub Guide</a>
        </div>
      </div>
    </div>
  </div>
);

module.exports = GitInstruct;
