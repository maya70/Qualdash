# Qualdash
This repository keeps track of site-specific configuration files installed in the different sites where QualDash is deployed. 
The code for the QualDash software is kept in a different repository. If you would like to access the QualDash main repository, please contact maya70 .at. vt.edu

To setup a branch for a new site:

1. Create a local folder to contain your site-specific configuration files. This should contain three sub-folders: R, js, and logs. 
2. From master, create a remote branch with the name <sitename>
3. Start git in your local folder: 
  ``` git init ```
4. Link to remote: 
  ``` git remote add origin https://github.com/maya70/qualdash.git ```
5. Create a local branch: 
  ``` git checkout -b <sitename> ```
6. Pull from remote: 
  ``` git pull ```
7. Verify that you can see your remote branch:
  ``` git branch -r ``` should show your remote branch
8. Pull remote branch:
  ``` git pull origin <sitename>```
9. Set local to track remote: 
  ``` git branch -u origin/<sitename>```
10. Commit changes and push to remote:
  ``` git add. ``` then
  ``` git commit ``` then
  ``` git push ```
  
