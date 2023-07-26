/**
 * Union of all {@link RequestMethods} values.
 */
export type RequestMethod = `${RequestMethods}`

/**
 * Dictionary of HTTP request methods.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 */
export enum RequestMethods {
  /** Requests a representation of the specified resource */
  GET = 'get',
  /** Sends data to the server */
  POST = 'post',
  /** Replaces all current representations of the target resource with the uploaded content */
  PUT = 'put',
  /** Requests a partial representation of the specified resource */
  PATCH = 'patch',
  /** Deletes the specified resource */
  DELETE = 'delete',
  /** Requests the headers that would be returned by a GET method */
  HEAD = 'head',
  /** Returns the HTTP methods that the server supports for specified URL */
  OPTIONS = 'options',
  /** Establishes a tunnel to the server identified by the target resource */
  CONNECT = 'connect',
  /** Performs a message loop-back test along the path to the target resource */
  TRACE = 'trace',
}
