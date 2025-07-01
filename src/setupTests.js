import "@testing-library/jest-dom";
import { jest, beforeEach } from "@jest/globals";

globalThis.TextEncoder = class TextEncoder {
  encode(text) {
    return new Uint8Array(text.split("").map((c) => c.charCodeAt(0)));
  }
};

globalThis.TextDecoder = class TextDecoder {
  decode(bytes) {
    return String.fromCharCode.apply(null, bytes);
  }
};

globalThis.import = {
  meta: {
    env: {
      VITE_OWM_API_KEY: "mock-api-key",
    },
  },
};

globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: "mocked data" }),
    ok: true,
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});
