# Raymundo Salazar
[raymundo.salser@hotmail.com](raymundo.salser@hotmail.com)

\+52 1 818 684 3534

==========================================================================

## Run Project

To run this project you need to have installed the following dependencies

### Dependencies
- Node JS
- Yarn
- Serve

### Preparing deployment
1. Before to deploy the App you need to run these commands in your terminal:

```
$ npm install -g serve
$ yarn
```

The first command will install `serve` globally, this package will be the server where the app will be hosted.
The second one will install all the necessary dependencies for this project.

2. Duplicate the file named `env.development`. Change the name of the second one to `.env`

### Deploy app

To deploy the React App in production environment you need to run these commands:

```
$ yarn run build
$ serve -s build
```

AND READY!

_This project was created with __[Create React App](https://github.com/facebook/create-react-app)__._