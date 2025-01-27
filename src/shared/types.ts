/** Extensible request query parameters */
export type RequestQuery = {
  startingAfter?: string;
  endingBefore?: string;
};

/** The direction to which a user navigates */
export type PageDirection = "forward" | "backward" | "none";

export type IPageData<T> = {
  data: T;
  prevCursor: string;
  nextCursor: string;
};
