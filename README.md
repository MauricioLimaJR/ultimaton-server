# Ultimaton Web Server

This application is a REST API serving Ultimaton Web App.

## About it structure

### Entities
![UltimatonERDiagram](https://user-images.githubusercontent.com/20580967/109259703-85b97880-77db-11eb-8ac7-f9c18694c004.png)

### Architecture
![UltimatonArchitectureDiagram](https://user-images.githubusercontent.com/20580967/109259756-a255b080-77db-11eb-9443-5b573c953b82.png)

## Framework

As it uses Adonis js, the app counts with: 

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## System Requirements
The only dependencies are Node.js, npm/yarn and Adonis CLI.

Ensure your versions of those tools match the following criteria:

- Node.js >= 8.0.0
- npm >= 3.0.0


## Development Setup

1. Clone this repository on your machine
2. Install dependencies:
```bash
yarn
```
3. Install Adonis CLI with:
```bash
npm i -g @adonisjs/cli
```
4.Go to project directory and run:
```bash
adonis serve --dev
```
Any questions about how to use adonis cli's commands, go to: https://adonisjs.com/docs/4.1/about

## Production Deploy

This applications is running in heroku and connected to it automatic deploy.
So, just pull request any branch to master and merge the codes.  The deploy will start by itself after the merge.
