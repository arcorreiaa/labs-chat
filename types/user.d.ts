export interface IUser {
  profileUrl: string;
  userId: string;
  userName: string;
}

interface IProviderUserInfo {
  displayName: null | string;
  email: string;
  phoneNumber: null | string;
  photoURL: null | string;
  providerId: string;
  uid: string;
}

export interface IStsTokenManager {
  accessToken: string;
  expirationTime: number;
  refreshToken: string;
}

export interface ICurrentUser {
  accessToken: string;
  auth: {
    apiKey: string;
    appName: string;
    authDomain: string;
    currentUser: IUser[]; // Esta é a matriz de usuários
  };
  displayName: null | string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    createdAt: string;
    lastLoginAt: string;
  };
  phoneNumber: null | string;
  photoURL: null | string;
  proactiveRefresh: {
    errorBackoff: number;
    isRunning: boolean;
    timerId: number;
    user: IUser[];
  };
  profileUrl: string;
  providerData: IProviderUserInfo[];
  providerId: string;
  reloadListener: null;
  reloadUserInfo: {
    createdAt: string;
    email: string;
    emailVerified: boolean;
    lastLoginAt: string;
    lastRefreshAt: string;
    localId: string;
    passwordHash: string;
    passwordUpdatedAt: number;
    providerUserInfo: IProviderUserInfo[][];
    validSince: string;
  };
  stsTokenManager: IStsTokenManager;
  tenantId: null;
  uid: string;
  userId: string;
  username: string;
}
