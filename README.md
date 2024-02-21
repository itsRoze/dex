# Dex

## Installation

```bash
pnpm i
```

## Running SST

```bash
pnpm sst dev
```

## Setup Database

Setup secrets via `sst secrets` (this defaults to your personal stage). Use `--fallback` to set this as a fallback

```bash
pnpm sst secrets set TURSO_URL <url> --fallback
pnpm sst secrets set TURSO_AUTH_TOKEN <token> --fallback
```

Push schema changes to the database

```bash
pnpm db:push
```

## Run app

```bash
pnpm dev
```
