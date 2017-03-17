const config = require('../../config');
const Sequelize = require( 'sequelize' );
var db = new Sequelize( config.dbName, config.dbUser, config.dbPassword );


var User = db.define( 'users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  name: Sequelize.STRING,
  html_url: Sequelize.STRING,
  repos_url: Sequelize.STRING,
  avatar_url: Sequelize.STRING,
  access_token: Sequelize.STRING,
  refresh_token: Sequelize.STRING,
  num_forks: Sequelize.INTEGER,
  num_pulls: Sequelize.INTEGER,
  num_merges: Sequelize.INTEGER
});

var Friends = db.define( 'users_friends', {
  internal_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {type: Sequelize.INTEGER, references: {model: User, key: 'id'}},
  friend_id: {type: Sequelize.INTEGER, references: {model: User, key: 'id'}}
});


// KEEPING "ISSUES" AND "REPOS" SCHEMAS THE SAME AS
// DAPPER ARGENTINA DID SO WE DO NOT BREAK THINGS

var Repo = db.define( 'repos', {
  internal_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id: { type: Sequelize.INTEGER, allowNull: false},
  name: { type: Sequelize.STRING(100), allowNull: false},
  org_name: { type: Sequelize.STRING(50), allowNull: false},
  html_url: Sequelize.STRING,
  language: Sequelize.STRING(100),
  beginner_tickets: Sequelize.INTEGER,
  description: Sequelize.STRING(1000),
  stargazers_count: Sequelize.INTEGER,
  watchers_count: Sequelize.INTEGER,
  has_wiki: Sequelize.BOOLEAN,
  has_pages: Sequelize.BOOLEAN,
  open_issues: Sequelize.INTEGER, 
  forks: Sequelize.INTEGER,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE,
  pushed_at: Sequelize.DATE,
  data_refreshed_at: Sequelize.DATE,
  record_inserted_at: Sequelize.DATE,
  etag: Sequelize.STRING(50),
  subscribers_count: Sequelize.INTEGER,
  network_count: Sequelize.INTEGER
  },
  {
    indexes: [{
      name: 'OrgRepo',
      fields:['name', 'org_name']
    }]
  },
  {timestamps:false}
);

var Issue = db.define( 'issues', {
  internal_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id: { type: Sequelize.INTEGER, allowNull: false},
  repo_name: Sequelize.STRING(50),
  org_name: Sequelize.STRING(50),
  title: { type: Sequelize.STRING(2000), allowNull: false },
  comments: Sequelize.INTEGER,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE,
  html_url: Sequelize.STRING,
  assignee: Sequelize.STRING,
  body: Sequelize.STRING(1500),
  labels: Sequelize.STRING(1000),
},
{timestamps:false}
);


var UserIssues = db.define( 'user_issues', {
  internal_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  issue_id: {type: Sequelize.INTEGER, allowNull: false},
  repo_id: {type:Sequelize.INTEGER, allowNull: false},
  user_id: {type: Sequelize.INTEGER, references: {model: User, key: 'id'}},
  forked_repo_id:{type: Sequelize.INTEGER, allowNull: true},
});

var UserForks = db.define( 'user_forks', {
  internal_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING(50), 
  parent_url: Sequelize.STRING,
  parent_repo_id: Sequelize.STRING,
  fork_url: { 
    type: Sequelize.STRING,
    unique: true
  }
});

// sync all tables
User.sync()
  .then( function() {
    return Issue.sync();
  } )
  .then( function() {
    return Repo.sync();
  } )
  .then( function() {
    return  UserIssues.sync();
  }).then( function() {
    return UserForks.sync();
  }).then( function() {
    return Friends.sync();
  });

module.exports.db = db;
module.exports.User = User;
module.exports.Repo = Repo;
module.exports.Issue = Issue;
module.exports.UserForks = UserForks;
module.exports.Friends = Friends;


