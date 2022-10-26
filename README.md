# Testing Firebase Functionality
This is a repo where I have tested working with different parts of Firebase and GCP. This project is hosted live at https://functionality-c0aad.web.app/.

## Authentication
The web app has google sign-in as well as traditional email/password sign in.

## Hosting and CD with Github Actions
The web app is hosted on firebase and has two CI/CD pipeline running. 

The first is triggered whenever a pull request is opened and is deployed to a previewable site on a temporary domain. 

The second is triggered when anything is merged into the main branch and is then deployed to the live domain.