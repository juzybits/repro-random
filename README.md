# `tx.object.random()` throws `ObjectNotFound` error

This error happens only on testnet and mainnet, when using `tx.object.random()`. The same code works if using `tx.object("0x8")`.

## How to run

```shell
cd js/
cp .env.example .env.local # and edit
bun i
bun repro.ts
```

## Output

Using `@mysten/sui@1.37.5` and `testnet@1.55.0`, I get:

```shell
$ bun repro.ts
18 | };
19 | class SuiHTTPTransportError extends Error {
20 | }
21 | class JsonRpcError extends SuiHTTPTransportError {
22 |   constructor(message, code) {
23 |     super(message);
                           ^
error: Error checking transaction input objects: ObjectNotFound { object_id: 0x0000000000000000000000000000000000000000000000000000000000000008, version: None }
 code: -32602,
 type: "InvalidParams",

      at new SuiHTTPTransportError (1:23)
      at new JsonRpcError (.../repro-random/js/node_modules/@mysten/sui/dist/esm/client/errors.js:23:5)
      at request (.../repro-random/js/node_modules/@mysten/sui/dist/esm/client/http-transport.js:59:13)

Bun v1.2.21 (macOS arm64)
```
