import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "ui";
import { trpc } from "utils/trpc";

const ChapterPage: NextPage = () => {
  const router = useRouter();
  const comic = trpc.comic.getOneWithChapter.useQuery(
    {
      comicSlug: router.query?.slug as string,
      ordinal: Number(router.query?.ordinal),
    },
    { enabled: Boolean(router.query?.ordinal) }
  );

  const chapter = comic.data?.chapter[0];
  return (
    <Layout>
      <Head>
        <title>4dcomics</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout.Header className="flex items-center justify-between">
        <h1 className="text-2xl font-black">4dcomics</h1>
        <div />
      </Layout.Header>
      <div className="flex w-full bg-rose-300 py-8">
        <div className="mx-auto flex w-full max-w-[80em] items-center justify-between px-4">
          <h2 className="text-5xl font-black">{comic.data?.title}</h2>
          <h2 className="text-5xl font-black">Episode {chapter?.ordinal}</h2>
        </div>
      </div>
      <Layout.Main></Layout.Main>
    </Layout>
  );
};

export default ChapterPage;
