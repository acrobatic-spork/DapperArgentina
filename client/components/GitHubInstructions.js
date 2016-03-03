const React = require('react');

const GitInstruct = (props) => ( 
  <div class="row">
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">How to Contribute</span>
              <h6>Fork the Repo</h6>
              <p>To fork, just click the button! The repo will now appear in your list of repos on GitHub</p>
              <h6>Copy the files to your computer</h6>
              <p>Clone (copy) the repo by opening the terminal and running <span>git clone "link to your forked repo"</span>.
              The link depends on the repo, and can be found on GitHub.</p>
              <h6>Add the original repo as an upstream remote</h6>
              <p>In the repo's main directory, run <span>git remote add upstream "link to the original repo"</span></p>
              <h6>Make changes and commit</h6>
              <p>Open the files, create a new branch, and make changes. When you've made a change that you know works, open the terminal, cd into the main
              folder of the repo, and run <span>git add "file"</span> and <span>git commit</span>.</p>
              <h6>Push to your fork</h6>
              <p>Push your changes with <span>git push origin "branch-name"</span></p>
              <h6>Submit a pull request!</h6>
              <p>Make sure you test your code well, and leave the owners of the repo a detailed message letting them know what your changes do.
              Congratulations, you're contributing to the open source community!</p>
            </div>
            <div class="card-action">
              <a href="https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/">Detailed Instruction</a>
              <a href="https://guides.github.com/activities/contributing-to-open-source/">GitHub Guide</a>
            </div>
          </div>
        </div>
      </div>
);

module.exports = GitInstruct;
