import { uploadToS3, getS3AccessibleUrlAfterUpload } from "../files";

describe("uploadToS3", () => {
  // @ts-expect-error mocking fetch
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    // @ts-expect-error mocking fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            value: "Testing something!",
          }),
      }),
    );
  });

  afterEach(() => {
    // @ts-expect-error mocking fetch
    global.fetch = originalFetch;
  });

  it("should upload a file to S3", async () => {
    const presignedUrl = "https://example.com";
    const file = new File([""], "filename");

    await uploadToS3(presignedUrl, file);

    expect(fetch).toHaveBeenCalledWith(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
        "x-amz-acl": "public-read",
      },
    });
  });
});

describe("getS3AccessibleUrlAfterUpload", () => {
  it("should return the URL without query parameters", () => {
    const url = "https://example.com/1.png?query=param";
    expect(getS3AccessibleUrlAfterUpload(url)).toBe("https://example.com/1.png");
  });

  it("should throw an error if the URL is invalid", () => {
    expect(() => getS3AccessibleUrlAfterUpload(undefined)).toThrow("Invalid URL");

    expect(() => getS3AccessibleUrlAfterUpload(null)).toThrow("Invalid URL");

    expect(() => getS3AccessibleUrlAfterUpload("")).toThrow("Invalid URL");

    expect(() => getS3AccessibleUrlAfterUpload("https:")).toThrow("Invalid URL");
  });
});
