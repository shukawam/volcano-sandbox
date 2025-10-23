# Volcano Sandbox

[Volcano SDK](https://github.com/Kong/volcano-sdk) sandbox.

## How to run?

First, install the dependencies.

```sh
npm install
```

Then, run the scripts.

```sh
export OPENAI_API_KEY="sk-..."
npx tsx src/simple-llm.ts
```

## Optional: Kong Gateway & Observability

Run the following command.

```sh
docker compose up -d
```
