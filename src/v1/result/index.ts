enum StatusCode {
  OK = 200,
  CREATED = 201,
  UPDATED = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
}

/**
 * This is a return type generic interface used by the `actions` functions.
 */
export interface IResult<T> {
  /** Indicates if the result is successful or not */
  success: boolean;

  /** The error message, if any */
  error?: string;

  /** The data, if any, included in a successful request  */
  data?: T;

  /** Predefined HTTP status code for the result object. */
  statusCode: StatusCode;

  /** Message for successful responses, if any. Mostly used for accepted requests */
  message?: string;
}

/**
 * Class for returning results.
 */
export class Result {
  /**
   * For unauthorized access.
   */
  public static Unauthorized<T>(message: string): IResult<T> {
    return {
      success: false,
      error: message,
      statusCode: StatusCode.UNAUTHORIZED,
    };
  }

  /**
   * For not found errors.
   */
  public static NotFound<T>(message: string): IResult<T> {
    return {
      success: false,
      error: message,
      statusCode: StatusCode.NOT_FOUND,
    };
  }

  /**
   * For bad request errors.
   */
  public static BadRequest<T>(message: string, data?: T): IResult<T> {
    return {
      success: false,
      error: message,
      statusCode: StatusCode.BAD_REQUEST,
      data,
    };
  }

  /**
   * For server errors.
   * For forbidden errors.
   */
  public static Forbidden<T>(message: string): IResult<T> {
    return {
      success: false,
      error: message,
      statusCode: StatusCode.FORBIDDEN,
    };
  }

  /**
   * For server errors..
   */
  public static ServerError<T>(message: string): IResult<T> {
    return {
      success: false,
      error: message,
      statusCode: StatusCode.SERVER_ERROR,
    };
  }

  /**
   * For successful requests.
   */
  public static Ok<T>(data?: T, message: string = ""): IResult<T> {
    return {
      success: true,
      data: data,
      statusCode: StatusCode.OK,
      message,
    };
  }

  /**
   * For records created.
   */
  public static Created<T>(data?: T, message: string = ""): IResult<T> {
    return {
      success: true,
      statusCode: StatusCode.CREATED,
      data: data,
      message,
    };
  }

  /**
   * For successful update requests.
   *
   * @param message The message
   * @param data Data to be sent as response, if any
   */
  public static Updated<T>(message: string, data?: T): IResult<T> {
    return {
      success: true,
      statusCode: StatusCode.UPDATED,
      data,
      message: message,
    };
  }
}
