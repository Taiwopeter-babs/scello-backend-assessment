import { IPageData, PageDirection, RequestQuery } from "@src/shared";

export class Pagination {
  /** The limit of the items to return for a paginated dataset */
  private PAGE_SIZE = 20;

  /**
   * Get the pagination paramaters for the cursor-based database query
   *
   * @param pageParams An object that specifies the pagination parameters.
   * Only one of the properties in the object can be used at once.
   *
   * - endingBefore - An value from which the previous dataset or page will be returned.
   * The dataset returned does not include the data which has the same ID value as it.
   *
   * - startingAfter - An value after the next dataset or page will be returned.
   * The dataset returned does not include the data which has the same ID value as it.
   */
  protected getCursorBasedPaginationQuery({ endingBefore, startingAfter }: RequestQuery) {
    /** The value of the cursor (id of the tracking item) */
    const cursor = startingAfter ?? endingBefore;

    /** Sets the direction to which the page moves. */
    const navigationDirection: "forward" | "backward" | "none" = startingAfter
      ? "forward"
      : endingBefore
      ? "backward"
      : "none";

    return {
      limit: this.PAGE_SIZE + 1, // Fetch one more item to check data continuity

      // Skip to the item after/before the given cursor
      offset: navigationDirection === "none" ? 0 : 1,

      // Value of the item from which the fetch goes backwards or forwards
      cursor: cursor ? { createdAt: cursor } : undefined,

      navigationDirection,
    };
  }

  /** Get the paginated dataset */
  protected getPaginationData<T>(data: T, navDirection: PageDirection): Promise<IPageData<T>> {
    if (!Array.isArray(data) || data.length === 0) {
      return Promise.resolve({
        prevCursor: "",
        nextCursor: "",
        data: [] as T,
      });
    }

    /** Check if there is more data after or before the page data */
    const hasMore = data.length > this.PAGE_SIZE;

    const pageData =
      navDirection === "backward"
        ? // reverse the dataset in case of back navigation
          data.slice(-this.PAGE_SIZE).reverse()
        : data.slice(0, this.PAGE_SIZE);

    const result: IPageData<T> = {
      data: pageData as T,
      prevCursor:
        navDirection === "forward" || (navDirection === "backward" && hasMore)
          ? pageData.at(0).id
          : "",
      nextCursor: navDirection === "backward" || hasMore ? pageData.at(-1).id : "",
    };

    return Promise.resolve(result);
  }
}
