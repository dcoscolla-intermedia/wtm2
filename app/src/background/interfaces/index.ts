import { GetVersionResponse } from './get-version.interface';
import {
  LoginData,
  LoginResponse,
  VerifyEmailResponse,
} from './login.interface';
import {
  GetNavigationEntriesData,
  GetNavigationEntriesResponse,
} from './navigation-entry.interface';
import {
  UpdatePreferenciesData,
  PreferenciesResponse,
} from './preferences.interface';
import { CloseActiveSessionsData } from './close-active-session';
import { BasicResponse } from './basic-response';
import {
  UpdateDeviceAliasData,
  UserDeviceResponse,
} from './user-device.interface';
import { SignUpData, SignUpResponse } from './sign-up.interface';
import { ActiveSessionsResponse } from './active-sessons.interface';
import { ResendCodeResponse } from './resend-code.interface';
import { VerifyCodeData } from './verify-code.interface';
import {
  RecoverPasswordData,
  RecoverPasswordResponse,
} from './recover-password.interface';
import {
  ValidateRecoveryCodeData,
  ValidateRecoveryCodeResponse,
} from './validate-recovery-code.interface';
import { RestorePasswordData } from './restore-password.interface';

export type BackgroundMessageType =
  | 'get-version'
  | 'login'
  | 'get-navigation-entries'
  | 'update-preferences'
  | 'get-user-preferences'
  | 'get-active-sessions'
  | 'close-active-session'
  | 'update-device-alias'
  | 'sign-up'
  | 'resend-code'
  | 'verify-code'
  | 'recover-password'
  | 'validate-recovery-code'
  | 'restore-password';

export type BackgroundMessageDataMap = {
  'get-version': undefined;
  login: LoginData;
  'get-navigation-entries': GetNavigationEntriesData;
  'update-preferences': UpdatePreferenciesData;
  'get-user-preferences': undefined;
  'get-active-sessions': undefined;
  'close-active-session': CloseActiveSessionsData;
  'update-device-alias': UpdateDeviceAliasData;
  'sign-up': SignUpData;
  'resend-code': undefined;
  'verify-code': VerifyCodeData;
  'recover-password': RecoverPasswordData;
  'validate-recovery-code': ValidateRecoveryCodeData;
  'restore-password': RestorePasswordData;
};
export type BackgroundMessageResponseMap = {
  'get-version': GetVersionResponse;
  login: LoginResponse | VerifyEmailResponse;
  'get-navigation-entries': GetNavigationEntriesResponse;
  'update-preferences': PreferenciesResponse;
  'get-user-preferences': PreferenciesResponse;
  'get-active-sessions': ActiveSessionsResponse[];
  'close-active-session': BasicResponse;
  'update-device-alias': UserDeviceResponse;
  'sign-up': SignUpResponse;
  'resend-code': ResendCodeResponse;
  'verify-code': LoginResponse;
  'recover-password': RecoverPasswordResponse;
  'validate-recovery-code': ValidateRecoveryCodeResponse;
  'restore-password': LoginResponse;
};

export interface BackgroundMessagePayload<T extends BackgroundMessageType> {
  data: BackgroundMessageDataMap[T];
}

export type BackgroundMessageHandler<T extends BackgroundMessageType> = (
  sendResponse: (
    response: BackgroundMessageResponseMap[T] | { error: string },
  ) => void,
  payload: BackgroundMessagePayload<T>,
) => Promise<void>;
