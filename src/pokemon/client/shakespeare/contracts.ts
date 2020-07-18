
export interface Success {
  total: number;
}

export interface Contents {
  translated: string;
  text: string;
  translation: string;
}

export interface ShakespeareResponse {
  success: Success;
  contents: Contents;
}

