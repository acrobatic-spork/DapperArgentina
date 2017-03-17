--This script is to create the entire database structure

/*First we create the database and a new user.  You should update the below w/ a different pw for prod*/

CREATE DATABASE gitBegin;

CREATE USER 'gitBegin'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON gitBegin.* TO 'gitBegin'@'localhost';

/*Before running this part you need to login as the gitBegin user (or some user w/ permission on the db)*/
use gitBegin;

CREATE TABLE issues (
  internal_id int AUTO_INCREMENT PRIMARY KEY,
  id int NOT NULL,
  repo_name nvarchar(50),
  org_name nvarchar(50), 
  title nvarchar(2000) NOT NULL,
  comments int,
  created_at datetime,
  updated_at datetime, 
  html_url nvarchar(255), 
  assignee nvarchar(255),
  body nvarchar(1500),
  labels nvarchar(1000)
);

CREATE TABLE repos (
  internal_id int AUTO_INCREMENT PRIMARY KEY,
  id int,
  name nvarchar(100) not null,
  org_name nvarchar(50) not null, 
  html_url nvarchar(255),
  language nvarchar(100),
  beginner_tickets int,
  description nvarchar(1000),
  stargazers_count int,
  watchers_count int, 
  has_wiki bool,
  has_pages bool, 
  open_issues int, 
  forks int,
  created_at datetime,
  updated_at datetime, 
  pushed_at datetime,
  data_refreshed_at datetime,
  record_inserted_at datetime,
  etag nvarchar(50),
  subscribers_count int,
  network_count int
);

CREATE INDEX OrgRepo ON repos (name,org_name);

