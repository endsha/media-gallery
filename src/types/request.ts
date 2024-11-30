export type RequestParams = {
  readonly url: string;
  readonly method: RequestMethods;
  readonly body?: any;
  readonly headers?: any;
};

export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
