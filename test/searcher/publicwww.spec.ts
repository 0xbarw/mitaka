import "mocha";

import { expect } from "chai";

import { PublicWWW } from "@/searcher";

describe("PublicWWW", function () {
  const subject = new PublicWWW();

  it("should support text", function () {
    expect(subject.supportedTypes).to.deep.equal(["text"]);
  });

  describe("#searchByText", function () {
    it("should return a URL", function () {
      expect(subject.searchByText("urlscan.io")).to.equal(
        "https://publicwww.com/websites/urlscan.io"
      );
      expect(subject.searchByText(" href=https://urlscan.io ")).to.equal(
        "https://publicwww.com/websites/%20href%3Dhttps%3A%2F%2Furlscan.io%20"
      );
    });
  });
});
