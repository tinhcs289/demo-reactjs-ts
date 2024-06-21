export enum HttpRequestStatus {
  /**
   * value: `1` - No status.
   */
  NONE = 1,
  /**
   * value: `2` - The request is being sent and waiting for a response.
   */
  REQUESTING = 2,
  /**
   * value: `3` - The request has been responded to successfully.
   */
  REQUESTSUCCESS = 3,
  /**
   * value: `4` - The request could not be sent or was not responded to, or an error occurred in the response from the server
   */
  REQUESTFAIL = 4,
}
