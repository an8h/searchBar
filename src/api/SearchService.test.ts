import getSearchResults from "./SearchService";

describe("getSearchResults", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("throws an error if the API response is not ok", async () => {
    const searchTerm = "test";
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: "Not Found",
    };
    jest.spyOn(global, "fetch").mockResolvedValue(mockResponse as any);

    await expect(getSearchResults(searchTerm)).rejects.toThrow(
      "Error fetching search results: 404 Not Found",
    );
  });
});
