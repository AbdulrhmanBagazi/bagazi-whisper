create-t3-turbo is awesome but I don't like to use next API

# This template stack:

- Next 13
- Express 4 with SWC
- Prisma 4
- TRPC 10
- Turborepo
- Tailwind 3
- Yarn 1

## Installation

first open the project file

```bash
cd ./next-express-prisma-turborepo/
```

```bash
cp .env.example .env
```

```bash
yarn
```

## prisma

```bash
cd packages/db/
```

```bash
yarn db:generate
```

```bash
yarn db:seed
```

```bash
yarn db:push
```

## run the databse "Docker"

```bash
cd packages/db/
```

```bash
docker-compose up
```

## start app from the root folde "cd ./next-express-prisma-turborepo/"

```bash
yarn dev
```

- [Web] http://localhost:3000/
- [Prisma] http://localhost:5556/
- [Api] http://localhost:4001
