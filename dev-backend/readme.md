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


