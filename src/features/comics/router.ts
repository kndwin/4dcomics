import { router, publicProcedure } from "server/trpc/trpc";
import { z } from "zod";

export const comicRouter = router({
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.comic.findFirst({
        where: { id: { equals: input.id } },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.comic.findMany();
  }),
  getOneWithChapters: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.comic.findFirst({
        where: { slug: { equals: input.slug } },
        include: {
          chapter: {
            orderBy: {
              ordinal: "desc",
            },
          },
        },
      });
    }),
  getOneWithChapter: publicProcedure
    .input(z.object({ comicSlug: z.string(), ordinal: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.comic.findFirst({
        where: {
          slug: input.comicSlug,
        },
        include: {
          chapter: {
            where: {
              ordinal: input.ordinal,
            },
          },
        },
      });
    }),
});
