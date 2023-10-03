import { test } from "bun:test"
import Elysia from "elysia"
import { nocache } from "."
import assert from "assert"

export const req = (path: string, options?: RequestInit) =>
    new Request(`http://localhost${path}`, options)

test("nocache", async () => {
    const app = new Elysia().use(nocache).get("/", () => "Hello, World!")
    const res = await app.handle(req("/"))
    const headers = res.headers as Headers;

    return assert.deepStrictEqual(headers, new Headers({
        "Surrogate-Control": "no-store",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
    }))
})