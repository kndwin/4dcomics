import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const newComic = await prisma.comic.create({
    data: {
      slug: "fear_of_failure",
      title: "Fear of failure",
      shortDescription: "Haha, finger pointing my way through my life",
      coverImage:
        "https://swebtoon-phinf.pstatic.net/20210504_141/1620085451198JaQAz_JPEG/8GetSchooled_mobile_landingpage.jpg?type=crop540_540",
    },
  });

  const firstChapter = await prisma.chapter.create({
    data: {
      comicId: newComic.id,
      ordinal: 1,
      title: "Her number",
      coverImage:
        "https://swebtoon-phinf.pstatic.net/20210511_38/1620689553792Rzfwg_PNG/thumb_1620689475025268410.png?type=q90",
    },
  });

  const secondChapter = await prisma.chapter.create({
    data: {
      comicId: newComic.id,
      ordinal: 2,
      title: "Walking behind",
      coverImage:
        "https://swebtoon-phinf.pstatic.net/20210511_195/1620689842802RP8L4_PNG/thumb_1620689786603268423.png?type=q90",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
