import { describe, expect, test, vi } from "vitest";
import { envs } from "../../src/configs/envs.config";
import env from "env-var";

describe("Envs Plugin", () => {
  test("should return an object with all env variables", () => {
    const envsSpy = vi.spyOn(env, "get");
    const envVars = envs();
    expect(envsSpy).toHaveBeenCalled();
    expect(envVars).toEqual(
      expect.objectContaining({
        PORT: expect.any(Number),
        PUBLIC_PATH: expect.any(String),
        POSTGRES_URL: expect.any(String),
      }),
    );
    expect(envVars.POSTGRES_URL).toContain("postgresql://");
  });
});
