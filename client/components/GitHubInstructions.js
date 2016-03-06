const React = require('react');

const GitInstruct = (props) => (

  <div className="row">
    <div className="col s12 m12">
      <div className="card white">
        <div className="card-content black-text">
          <h5>Fork the Repo</h5>
          <p>To fork, just click the button! The repo will now appear in your list of repos on GitHub</p>
          <h5>Copy the files to your computer</h5>
          <p>Clone (copy) the repo by opening the terminal and running</p> <pre>git clone "link to your forked repo"</pre>
          <p>The link depends on the repo, and can be found on GitHub.</p>
          <h5>Add the original repo as an upstream remote</h5>
          <p>In the repo's main directory, run:</p> <pre>git remote add upstream "link to the original repo"</pre>
          <h5>Make changes and commit</h5>
          <p>Open the files, create a new branch, and make changes. When you've made a change that you know works, open the terminal, cd into the main
          folder of the repo, and run</p> <pre>git add "file"</pre> <p>and then...</p> <pre>git commit</pre>
          <h5>Push to your fork</h5>
          <p>Push your changes with</p> <pre>git push origin "branch-name"</pre>
          <h5>Submit a pull request!</h5>
          <p>Make sure you test your code well, and leave the owners of the repo a detailed message letting them know what your changes do.
          Congratulations, you're contributing to the open source community!</p>
        </div>
        <div className="card-action">
          <a className="indigo-text text-darken-4" href="https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/">Detailed Instruction</a>
          <a className="indigo-text text-darken-4" href="https://guides.github.com/activities/contributing-to-open-source/">GitHub Guide</a>
        </div>
      </div>
    </div>
  </div>

);

module.exports = GitInstruct;
