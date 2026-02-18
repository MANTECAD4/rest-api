import { describe, expect, test, vi } from "vitest";
import { Server } from "../src/presentation/server";

vi.mock("../src/presentation/server");
describe("App", () => {
  test("should call Server.", async () => {
    await import("../src/app");
    expect(Server).toHaveBeenCalledWith({
      port: 8080,
      publicPath: "public-test",
      routes: expect.any(Function),
    });
    expect(Server.prototype.start).toHaveBeenCalled();
  });
});
