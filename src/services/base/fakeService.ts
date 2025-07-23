import { AuthedService } from "./authedService";
import { PaginatedResult } from "./interface";

/**
 * Class to mock a webAPI connection
 * @export
 * @class FakeService
 */
export default class FakeService<
  R extends Record<string, any>
> extends AuthedService {
  _latencyDuration = 0;
  _errorProbability = 0;

  /**
   * Creates an instance of FakeService.
   * @param {number} [latencyDuration=0]  // in milliseconds
   * @param {number} [errorProbability=0] // use to induce an error to test all edge cases
   * @memberof FakeService
   */
  constructor(latencyDuration = 0, errorProbability = 0) {
    super();
    this._latencyDuration = latencyDuration || this._latencyDuration;
    this._errorProbability = errorProbability || this._errorProbability;
  }

  /**
   * Wraps a Promise that pretends to be consuming a webAPI
   *
   * @protected
   * @template R
   * @param {(input?: any) => R} successCallback
   * @param {(input?: any) => ApiError} errorCallback
   * @return {*}  {Promise<any>}
   * @memberof FakeService
   */
  public simulateRequest(
    successCallback: (input?: any) => R, //: (input?: any) => R
    errorCallback: (input?: any) => void //(input?: any) => ApiError | any
  ): Promise<R> {
    //: Promise<any>
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() * 100 > this._errorProbability
          ? resolve(successCallback && successCallback())
          : reject(errorCallback && errorCallback());
      }, this._latencyDuration);
    });
  }

  /**
   * Wraps a Promise that pretends to be consuming a webAPI
   *
   * @protected
   * @template R
   * @param {(input?: any) => R} successCallback
   * @param {(input?: any) => ApiError} errorCallback
   * @return {*}  {Promise<any>}
   * @memberof FakeService
   */
  public simulatePaginatedRequest(
    successCallback: (input?: any) => PaginatedResult<R>, //: (input?: any) => R
    errorCallback: (input?: any) => void //(input?: any) => ApiError | any
  ): Promise<PaginatedResult<R>> {
    //: Promise<any>
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() * 100 > this._errorProbability
          ? resolve(successCallback && successCallback())
          : reject(errorCallback && errorCallback());
      }, this._latencyDuration);
    });
  }

  protected fakePagination = (
    data: R,
    numberOfEntries = 10
  ): PaginatedResult<R> => ({
    list: Array.from({ length: numberOfEntries }, (_, i) => i + 1).map((i) => ({
      ...data,
      id: i,
      name: `${data?.name}_${i}`,
      logo: `https://picsum.photos/id/${i}/200/300`,
    })),
    nextCursor: "",
    prevCursor: "",
  });

  private buildApiSuccess = (data: any, status = 200) => {
    return data;
  };

  /**
   * TEMP
   *
   * @param {*} status
   * @param {*} property
   * @param {*} message
   * @return {*}  {ApiError}
   */
  private buildApiError = (
    status: string,
    property: string,
    message: string
  ) => {
    return { error: { status, property, message } };
  };
}
