/**
 * Union of all {@link HttpStatus} values.
 */
export type HttpStatusCode = `${HttpStatus}`

/**
 * Union of all {@link HttpStatus} keys.
 */
export type HttpStatusName = keyof typeof HttpStatus

/**
 * Dictionary of HTTP status codes.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export enum HttpStatus {
  /**
   * **`100` Continue**
   *
   * Use to inform that  an initial part of the request has been received
   * and the client should proceed with the request or ignore the response.
   */
  CONTINUE = 100,
  /**
   * **`101` Switching Protocols**
   *
   * Use to inform that the server understands the `Upgrade` header
   * field request and indicates which protocol it is switching to.
   */
  SWITCHING_PROTOCOLS = 101,
  /**
   * **`102` Processing**
   *
   * Use to inform that the server has accepted the full request
   * but has not yet completed it and no response is available as of yet.
   */
  PROCESSING = 102,
  /**
   * **`103` Early Hints**
   *
   * Use to allow the user agent to preload resources, while we prepare a response.
   * It is intended to be primarily used with the Link Header.
   */
  EARLY_HINTS = 103,
  /**
   * **`200` OK**
   *
   * Use to inform that the request was successful.
   */
  OK = 200,
  /**
   * **`201` Created**
   *
   * Use to inform that the request was successful
   * and resulted in one or more resources being created.
   */
  CREATED = 201,
  /**
   * **`202` Accepted**
   *
   * Use to inform that the request has been accepted for processing
   * but the may or may not be completed when the processing finishes.
   */
  ACCEPTED = 202,
  /**
   * **`203` Non Authoritative Information**
   *
   * Use to inform that the request was successful. However,
   * the meta-information that has been received is different
   * from the one on the origin server. When not used for backups
   * or mirrors of another resource a **`200` OK** response is preferable.
   */
  NON_AUTHORITATIVE_INFORMATION = 203,
  /**
   * **`204` No Content**
   *
   * Use to inform that the request was successfully fulfilled the request,
   * and there is no available content for this request.
   */
  NO_CONTENT = 204,
  /**
   * **`205` Reset Content**
   *
   * Use to inform that the user should reset the document that sent this request.
   */
  RESET_CONTENT = 205,
  /**
   * **`206` Partial Content**
   *
   * Use in response to a `Range` header sent from the client
   * that's requesting only a part of the resource.
   */
  PARTIAL_CONTENT = 206,
  /**
   * **`207` Multi-Status**
   *
   * Use to convey information about multiple resources when multiple status codes are appropriate.
   */
  MULTI_STATUS = 207,
  /**
   * **`208` Already Reported**
   *
   * Use inside the response element `DAV= _propstat_`,
   * in order to avoid enumerating the internal members of
   * multiple bindings to the same collection repeatedly.
   */
  ALREADY_REPORTED = 208,
  /**
   * **`226` IM Used**
   *
   * Use to inform that the server has successfully fulfilled a `GET` request,
   * and the response is a representation of the result of one or multiple
   * instance-manipulations applied to the current instance.
   */
  IM_USED = 226,
  /**
   * **`300` Multiple Choices**
   *
   * Use to inform that the request has multiple possible responses
   * and the user agent should choose one.
   */
  MULTIPLE_CHOICES = 300,
  /**
   * **`301` Moved Permanently**
   *
   * Use to inform that the target resource has been assigned a new permanent URL,
   * and any references to this resources in the future should use one of the
   * URLs included in the response.
   */
  MOVED_PERMANENTLY = 301,
  /**
   * **`302` Moved Temporarily**
   *
   * Use to inform that the URI of the request has been changed temporarily,
   * and since changes can be made to the URI in the future,
   * the effective request URI should be used for future requests.
   */
  MOVED_TEMPORARILY = 302,
  /**
   * **`302` Found (Previously “Moved temporarily”)**
   *
   * Use to inform that the URI of the request has been changed temporarily,
   * and since changes can be made to the URI in the future,
   * the effective request URI should be used for future requests.
   */
  FOUND = 302,
  /**
   * **`303` See Other**
   *
   *  * Use to to direct the client to get the requested resource at another URI with a `GET` request.
   */
  SEE_OTHER = 303,
  /**
   * **`304` Not Modified**
   *
   * Use to inform that the response has not been modified and the client
   * can continue to use the already present, cached version of the response.
   */
  NOT_MODIFIED = 304,
  /**
   * **`305` Use Proxy**
   *
   * Used to inform that the client should connect to a proxy and
   * then repeat the same request there.
   */
  USE_PROXY = 305,
  /**
   * **`306` Switch Proxy**
   *
   * **This response code is no longer in use.**
   *
   * Used to inform the client that the subsequent requests should use the specified proxy.
   */
  SWITCH_PROXY = 306,
  /**
   * **`307` Temporary Redirect**
   *
   * Used to to direct the client to the requested resource at another URI.
   * The request method, however, must not be changed.
   */
  TEMPORARY_REDIRECT = 307,
  /**
   * **`308` Permanent Redirect**
   *
   * Used to inform that the requested resource has been permanently assigned
   * a new URI and future references to the resource should
   * be made by using one of the enclosed URIs.
   */
  PERMANENT_REDIRECT = 308,
  /**
   * **`400` Bad Request**
   *
   * Use to inform that the server could not understand
   * the request because of invalid syntax.
   */
  BAD_REQUEST = 400,
  /**
   * **`401` Unauthorized**
   *
   * Use to inform that the request has not been applied
   * because the server requires user authentication.
   */
  UNAUTHORIZED = 401,
  /**
   * **`402` Payment Required**
   *
   * The **`402` Payment Required** status code is a response reserved for future use.
   * It was originally created to be implemented in digital payment systems,
   * however, it is rarely used and a standard convention of using it does not exist.
   */
  PAYMENT_REQUIRED = 402,
  /**
   * **`403` Forbidden**
   *
   * Use to inform that the client request has been rejected
   * because the client does not have rights to access the content.
   * Unlike a **`401` Unauthorized**, the client's identity is known to the server,
   * but since they are not authorized to view the content, giving the
   * proper response is rejected by the server.
   */
  FORBIDDEN = 403,
  /**
   * **`404` Not Found**
   *
   * Use to inform that the server either did not find a current
   * representation for the requested resource or is trying
   * to hide its existence from an unauthorized client.
   */
  NOT_FOUND = 404,
  /**
   * **`405` Method Not Allowed**
   *
   * Use to inform that while the server knows the request method,
   * the method has been disabled and can not be used.
   */
  METHOD_NOT_ALLOWED = 405,
  /**
   * **`406` Not Acceptable**
   *
   * Use to inform that no content was found
   * following the criteria given by the user agent.
   */
  NOT_ACCEPTABLE = 406,
  /**
   * **`407` Proxy Authentication Required**
   *
   * Use to inform that the client must first be authenticated
   * by a proxy. This response code is similar to a **`401` Unauthorized**.
   */
  PROXY_AUTHENTICATION_REQUIRED = 407,
  /**
   * **`408` Request Timeout**
   *
   * Use to inform that the server did not receive a
   * complete request in the time that it prepared to wait.
   */
  REQUEST_TIMEOUT = 408,
  /**
   * **`409` Conflict**
   *
   * Use to inform that the request could not be fulfilled
   * due to a conflict with the current state of the target resource,
   * in situations where the user might be able to resubmit the request
   * after resolving the conflict.
   */
  CONFLICT = 409,
  /**
   * **`410` Gone**
   *
   * Use to inform that the target resource has been deleted
   * and the condition seems to be permanent.
   */
  GONE = 410,
  /**
   * **`411` Length Required**
   *
   * Use to inform that the server has rejected the request
   * because it requires the `Content-Length` header
   * field to be defined.
   */
  LENGTH_REQUIRED = 411,
  /**
   * **`412` Precondition Failed**
   *
   * Use to inform that the server does not meet one or multiple
   *  preconditions that were indicated in the request header fields.
   */
  PRECONDITION_FAILED = 412,
  /**
   * **`413` Payload Too Large**
   *
   * Use to inform that the server refuses to process the request
   * because the request payload is larger than the server
   * is able or willing to process. While the server may close
   * the connection to prevent the client from continuing the request,
   * it should generate a `Retry-After` header field.
   */
  PAYLOAD_TOO_LARGE = 413,
  /**
   * **`414` URI Too Long**
   *
   * Use to inform that the server is refusing to service the request
   * because the request-target was longer than the server
   * was willing to interpret.
   */
  URI_TOO_LONG = 414,
  /**
   * **`415` Unsupported Media Type**
   *
   * Use to inform that the server is rejecting the request
   * because it does not support the media format of the requested data.
   */
  UNSUPPORTED_MEDIA_TYPE = 415,
  /**
   * **`416` Range Not Satisfiable**
   *
   * Use to inform that the range specified in the `Range`
   * header field of the request can't be fulfilled. The reason might be
   * that the given range is outside the size of the target URI's data.
   */
  RANGE_NOT_SATISFIABLE = 416,
  /**
   * **`417` Expectation Failed**
   *
   * Use to inform that the `Expectation` indicated in the `Expect`
   * header field could not be met by the server.
   */
  EXPECTATION_FAILED = 417,
  /**
   * **`418` I’m a Teapot**
   *
   * Use to inform that the server refuses to brew coffee because it is, in fact, a teapot.
   * It is a reference to a 1998 April Fools' joke called "Hyper Text Coffee Pot Control Protocol"
   */
  IM_A_TEAPOT = 418,
  /**
   * **`421` Misdirected Request**
   *
   * Use to inform that the client request was directed
   * at a server that is not configured to produce a response.
   */
  MISDIRECTED_REQUEST = 421,
  /**
   * **`422` Unprocessable Content**
   *
   * Use to inform that, while the request was well-formed,
   * the server was unable to follow it, due to semantic errors.
   */
  UNPROCESSABLE_CONTENT = 422,
  /**
   * **`423` Locked**
   *
   * Use to inform that the resource that is being accessed is locked.
   */
  LOCKED = 423,
  /**
   * **`424` Failed Dependency**
   *
   * Use to inform that the request failed due to the failure
   * of a previous request.
   */
  FAILED_DEPENDENCY = 424,
  /**
   * **`425` Too Early**
   *
   * Use to inform that the server is not willing to risk
   * processing a request that might be replayed.
   */
  TOO_EARLY = 425,
  /**
   * **`426` Upgrade Required**
   *
   * Use to inform that the server refuses to perform the given request
   * using the current protocol, it might be willing to do so after
   * the client has been upgraded to a different protocol.
   */
  UPGRADE_REQUIRED = 426,
  /**
   * **`428` Precondition Required**
   *
   * Use to inform that the origin server requires the request to be conditional.
   */
  PRECONDITION_REQUIRED = 428,
  /**
   * **`429` Too Many Requests**
   *
   * Use to inform that in the given time, the user has sent too many requests.
   */
  TOO_MANY_REQUESTS = 429,
  /**
   * **`431` Request Header Fields Too Large**
   *
   * Use to inform that the server is not willing to process
   * the request because its header fields are indeed too large,
   * however, the request may be submitted again once the size
   * of the request header fields is reduced.
   */
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  /**
   * **`451` Unavailable For Legal Reasons**
   *
   * Use to inform that the user has requested an illegal
   * resource (such as pages and sites blocked by the government).
   */
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  /**
   * **`500` Internal Server Error**
   *
   * Use to inform that the server has encountered a situation
   * that it does not know how to handle.
   */
  INTERNAL_SERVER_ERROR = 500,
  /**
   * **`501` Not Implemented**
   *
   * Use to inform that the request can not be handled because
   * it is not supported by the server.
   */
  NOT_IMPLEMENTED = 501,
  /**
   * **`502` Bad Gateway**
   *
   * Use to inform that the server received an invalid response
   * while working as a gateway to handle the response.
   */
  BAD_GATEWAY = 502,
  /**
   * **`503` Service Unavailable**
   *
   * Use to inform that the server is currently not ready to handle
   * the request. This is a common occurrence when the server
   * is down for maintenance or is overloaded.
   */
  SERVICE_UNAVAILABLE = 503,
  /**
   * **`504` Gateway Timeout**
   *
   * Use to inform that the server acting as a gateway could not
   * get a response time.
   */
  GATEWAY_TIMEOUT = 504,
  /**
   * **`505` HTTP Version Not Supported**
   *
   * The **`505` HTTP Version Not Supported** response code means that
   * the version of HTTP used in the request is not supported by the server.
   */
  HTTP_VERSION_NOT_SUPPORTED = 505,
  /**
   * **`506` Variant Also Negotiates**
   *
   * Use to inform that the server has the following internal
   * configuration error= The chosen variant resource is configured to
   * engage in transparent negotiation itself, therefore it cannot be a
   * proper endpoint in the negotiation process.
   */
  VARIANT_ALSO_NEGOTIATES = 506,
  /**
   * **`507` Insufficient Storage**
   *
   * Use to inform that the method could not be performed on
   * the resource because the server is not able to store the
   * representation that would be needed to complete the
   * request successfully.
   */
  INSUFFICIENT_STORAGE = 507,
  /**
   * **`508` Loop Detected**
   *
   * Use to inform that the server has detected an infinite
   * loop while processing the request. May be given in the context
   * of the Web Distributed Authoring and Versioning (WebDAV) protocol.
   */
  LOOP_DETECTED = 508,
  /**
   * **`510` Not Extended**
   *
   * Use to inform that further extensions are required for the server to be able to fulfil the request.
   * Sent in the context of the HTTP Extension Framework, defined in RFC 2774
   */
  NOT_EXTENDED = 510,
  /**
   * **`511` Network Authentication Required**
   *
   * Use to inform that the client needs to authenticate to gain network access.
   * Usually sent by a HTTP Proxy server.
   */
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}
