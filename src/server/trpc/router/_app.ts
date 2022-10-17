// src/server/router/_app.ts
import { router } from "../trpc";

import { comicRouter } from "features/comics/router";

export const appRouter = router({
  comic: comicRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
