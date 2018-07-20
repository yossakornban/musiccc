// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //--Backend Server.
  //For Auth.
  base_authserver_url: 'http://localhost:8080/almn/',
  //For Restful.
  base_restserver_url: 'http://localhost:8080/almn/',

  //--Social Login Config.
  //For Google.
  google_app_id: '117164763299-0jvqv0pr3mvt5c5hf35n7j4lj6ton048.apps.googleusercontent.com',
  //For Mircrosoft.
  microsoft_app_id: '9f94ca57-eb7d-454c-8a76-e70d75a9e732',
  microsoft_login_redirect: 'http://localhost:4200/pages/dashboard',
};