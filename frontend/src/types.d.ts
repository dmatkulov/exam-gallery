export interface User {
  _id: string;
  email: string;
  displayName: string;
  token: string;
  role: string;
}

export interface Gallery {
  _id: string;
  user: UserInfo;
  title: string;
  image: string;
}

export interface UserGallery {
  user: UserInfo;
  result: Gallery[];
}

export interface UserInfo {
  _id: string;
  displayName: string;
}

//mutations
export interface GalleryMutation {
  title: string;
  image: File | null;
}

export interface RegisterMutation {
  email: string;
  displayName: string;
  password: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

//errors & responses
export interface RegisterResponse {
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
