import { IPageData, PageDirection, RequestQuery } from "@src/shared";
import { PAGE_SIZE } from "../constants";

export class Pagination {
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
  getCursorBasedPaginationQuery({ endingBefore, startingAfter }: RequestQuery) {
    /** The value of the cursor (id of the tracking item) */
    const cursor = startingAfter ?? endingBefore;

    /** Sets the direction to which the page moves. */
    const navigationDirection: "forward" | "backward" | "none" = startingAfter
      ? "forward"
      : endingBefore
      ? "backward"
      : "none";

    return {
      limit: PAGE_SIZE + 1, // Fetch one more item to check data continuity

      // Skip to the item after/before the given cursor
      offset: navigationDirection === "none" ? 0 : 1,

      // Id of the item from which the fetch goes backwards or forwards
      cursor: cursor ? { createdAt: cursor } : undefined,

      navigationDirection,
    };
  }

  /** Get the paginated dataset */
  getPaginationData<T>(data: T, navDirection: PageDirection): Promise<IPageData<T>> {
    if (!Array.isArray(data) || data.length === 0) {
      return Promise.resolve({
        prevCursor: "",
        nextCursor: "",
        data: [] as T,
      });
    }

    /** Check if there is more data after or before the page data */
    const hasMore = data.length > PAGE_SIZE;

    const pageData =
      navDirection === "backward"
        ? // reverse the dataset in case of back navigation
          data.slice(-PAGE_SIZE).reverse()
        : data.slice(0, PAGE_SIZE);

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
