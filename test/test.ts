import { expect } from "chai";
import { inject, injectString } from "../src";

describe("test", function () {
  it("should render string", function () {
    expect(injectString("abc${def}ghi", { def: '123' })).eq('abc123ghi');
  })

  it("should render object", function () {
    const obj = {
      "a": "abc${def}ghi",
      "b": 123,
      "c": {
        "A": "vvv${def}xxx",
        "B": ["ab${def}", "***", 33]
      }
    };
    const out = inject(obj, { def: 'uuu' });
    expect(out["a"]).eq("abcuuughi");
    expect(out["b"]).eq(123);
    expect(out["c"]["A"]).eq("vvvuuuxxx");
    expect(out["c"]["B"][0]).eq("abuuu");
    expect(out["c"]["B"][1]).eq("***");
    expect(out["c"]["B"][2]).eq(33);
  })
});