# My Wallet API

## About this project

This is the My Wallet App api. Built with NodeJS + Express + MongoDB. It manages users and their persistent data.

The Front-end GitHub may be acessed [here](https://github.com/fe-sak/MyWallet_Front)

## Why?

I wanted to create a functional project using everything I have learned so far. So, here it is, my first full stack project!

## Functionalities

- Login with bcrypt authorization
- Sign-up with uuid token
- Create transactions
- Read all transactions
- Update transactions
- Delete transactions

## Routes used by the client

Base URL: https://fesak-my-wallet-backend.herokuapp.com//)

- Login: POST on '/login'
- Sign-up: POST on '/signup'
- Create transactions: POST on '/income' and '/expense'
- Read all transactions: GET on '/transactions'
- Update transactions: PUT on '/transactions/edit/:id'
- Delete transactions: DELETE on ''/transactions/:id''

## Technologies used

- ![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript)&nbsp;
  ![Node.js](https://img.shields.io/badge/-Node.js-05122A?style=flat&logo=node.js)&nbsp;
  ![Express](https://img.shields.io/badge/-Express-05122A?style=flat&logo=express)&nbsp;
  ![MongoDB](https://img.shields.io/badge/-MongoDB-05122A?style=flat&logo=MongoDB)

## How to install this api

**Cloning the Repository**

```
$ git clone git@github.com:fe-sak/MyWallet_Back.git
$ cd MyWallet_Back
```

**Installing dependencies**

You need to install npm, learn more about it [here](https://docs.npmjs.com/getting-started).
Then, run the command inside the project directory:

```
$ yarn
```

_or_

```
$ npm install
```

**Configuring dev environment variables**

You must create a .env file at the root of the project directory with the contents:

```
MONGO_URI=your_mong_server
SALT=your_salt
PORT=your_desired_port
```

And you also must substitute the values of the variables to your liking.

## How to run this app

With all dependencies installed and the environment properly configured, you can now run the app in development mode (run this command inside the project directory):

```
$ npm run dev
```
