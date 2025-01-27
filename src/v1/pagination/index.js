"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
var constants_1 = require("../constants");
var Pagination = /** @class */ (function () {
    function Pagination() {
    }
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
    Pagination.prototype.getCursorBasedPaginationQuery = function (_a) {
        var endingBefore = _a.endingBefore, startingAfter = _a.startingAfter;
        /** The value of the cursor (id of the tracking item) */
        var cursor = startingAfter !== null && startingAfter !== void 0 ? startingAfter : endingBefore;
        /** Sets the direction to which the page moves. */
        var navigationDirection = startingAfter
            ? "forward"
            : endingBefore
                ? "backward"
                : "none";
        return {
            limit: constants_1.PAGE_SIZE + 1, // Fetch one more item to check data continuity
            // Skip to the item after/before the given cursor
            offset: navigationDirection === "none" ? 0 : 1,
            // Id of the item from which the fetch goes backwards or forwards
            cursor: cursor ? { createdAt: cursor } : undefined,
            navigationDirection: navigationDirection,
        };
    };
    /** Get the paginated dataset */
    Pagination.prototype.getPaginationData = function (data, navDirection) {
        if (!Array.isArray(data) || data.length === 0) {
            return Promise.resolve({
                prevCursor: "",
                nextCursor: "",
                data: [],
            });
        }
        /** Check if there is more data after or before the page data */
        var hasMore = data.length > constants_1.PAGE_SIZE;
        var pageData = navDirection === "backward"
            ? // reverse the dataset in case of back navigation
                data.slice(-constants_1.PAGE_SIZE).reverse()
            : data.slice(0, constants_1.PAGE_SIZE);
        var result = {
            data: pageData,
            prevCursor: navDirection === "forward" || (navDirection === "backward" && hasMore)
                ? pageData.at(0).id
                : "",
            nextCursor: navDirection === "backward" || hasMore ? pageData.at(-1).id : "",
        };
        return Promise.resolve(result);
    };
    return Pagination;
}());
exports.Pagination = Pagination;
