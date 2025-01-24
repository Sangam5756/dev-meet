## SDLC -> plan->Design->Develope->Test->Deploy

# Design

1.  Create an account
2.  Login
3.  Update your profile
4.  Feed Page - explore
5.  Send connection request
6.  see our matches
7.  see the request we sent/received
8.  Update your profile

## LLD  

- DB Design 


  - User
    - First Name
    - Last Name
    - emailId
    - password
    - age
    - gender
  - Connection Request
    - from userId
    - touserId
    - status => pending/accept/reject/ignore

- APi Design

  ### AuthROuter

      -    POST  /signup
      -    POST  /login
      -    POST  /profile

  ### connectionRequestRouter

  -     POST  =>  /request/send/interested/:userId      => interested
  -     POST  =>  /request/send/ignore/:userId          => ignore
  -     POST  =>  /request/review/accepted/:requestId   => accept
  -     POST  =>  /request/review/rejected/:requestId   => reject

  ### GET profileRouter

      -  GET   /profile/view
      -  PATCH /profile/edit
      -  PATCH /profile/password

  - GET - /user/requests/received
  - GET - /user/connections
  - GET - /user/feed -> get you the profiles of other user




### HOST ON AWS
  - FRONTEND
     - clone repo
     - build the frontend
     - sudo apt install nginx
     - sudo systemctl start nginx
     - sudo systemctl enable nginx
     - copy dist and past to nginx var/www/html
     - sudo scp -r dist/* /var/www/html
     - enbale the inbound rule port 80 for hitting nginx
     - now our Frontend is deployed 
     - go to public ip or url of aws to see that
  
  - Backend
     - install the nodejs version compatible to project. the version on which locally we build backend.
     -  clone the repo
     - start project
     - also for db allow aws machine ip to connect.
     - add security rule to allow request to port on which backend is running from anywhere
     - now backend is deployed
     - but we got terminal busy running project, we cant do other task so
     - there is process manager pm2 which allow to run process in detache mode like docker have their.
     - install the pm2 Process manager
     - npm install pm2 -g
     - pm2 start npm -- start   // the scipt name is start
     - pm2 logs // allow us to see the logs of console like if any error we can see here.
     - pm2 flush npm  // it will clear log , npm is name of application
     - pm2 li st  // it will give list of all the application running
     - pm2 stop npm  // stop -> npm is name of process
     - pm2 delete //delete -> npm is name of process 
     #### ADD
      - custom name of process when starting the application
                        |  Custom name for npm |  
       - pm2 start npm --name "custom name" -- start



## WEBSOCKET
    - to integrate the socket into express
    - first create the server using the http
    - then instead of listening on app listen on created server
    - configure cors for server


## payment
  ![paymentStructure](https://github.com/user-attachments/assets/9f4f5913-9f76-4f54-9c75-fc0a69e1e7e8)
- razorpay registration and complete kyc
 - create ui for premium page
 - Creating API for Create order in backend
