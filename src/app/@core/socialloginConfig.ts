// import { AuthServiceConfig, GoogleLoginProvider } from "angular5-social-login";
import { environment } from '../../environments/environment';
import * as context from '../@core/interfaces/context-part.interface';

const microsoft_login_redirect: string = context.microsoft_login_redirect;

// export function getAuthServiceConfigs() {
//     let config = new AuthServiceConfig(
//         [
//           {
//             id: GoogleLoginProvider.PROVIDER_ID,
//             provider: new GoogleLoginProvider(environment['google_app_id'])
//           },
//         ]);

//     return config;
// }

export function getMsalConfigs() {
  let CONFIG = {
    Settings: {
      BASEAPI: 'https://localhost:44356/api', // .NetCore2.0 WebAPI
      CLIENT_ID: environment['microsoft_app_id'], // https://apps.dev.microsoft.com
      TENANT: '[YOUR TENNANT HERE]',
      TENANT_ID: '[YOUR TENNANT ID HERE]', // found in Azure->Active Directory->Properties Pane, TennantID = Directory ID
      AUTHORITY: 'https://login.microsoftonline.com/'+environment['microsoft_app_id'],
      
      RESPONSE_TYPE: 'id_token',
      RESPONSE_MODE: 'id_token',
      STATE: '',
      MS_GRAPH_URI: 'https://graph.microsoft.com/',
      REDIRECT_URI : microsoft_login_redirect,
      POST_LOGOUT_REDIRECT : 'https://login.microsoftonline.com',
      MSGRAPH_BETA_API: 'https://graph.microsoft.com/beta/',
      MSGRAPH_v1_API: 'https://graph.microsoft.com/v1.0/',
      SCOPES: ['User.Read', 'User.ReadBasic.All'],
      ADMIN_CONSENT: true
    }
  }

  return CONFIG;
};