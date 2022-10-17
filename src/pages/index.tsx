import { Comic } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Layout } from "ui";
import { trpc } from "utils/trpc";

const Home: NextPage = () => {
  const comicsResponse = trpc.comic.getAll.useQuery();
  return (
    <Layout>
      <Head>
        <title>4dcomics</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout.Header className="flex items-center justify-between">
        <h1 className="text-2xl font-black">4dcomics</h1>
        <button className="w-fit font-bold">Sign in</button>
      </Layout.Header>

      <div className="flex w-full bg-rose-300 py-8">
        <div className="mx-auto w-full max-w-[80em] px-4">
          <h2 className="text-5xl font-black">Originals</h2>
        </div>
      </div>
      <Layout.Main>
        <div className="mt-12 grid grid-cols-3">
          {comicsResponse.data?.map((comic) => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>
      </Layout.Main>
    </Layout>
  );
};

export default Home;

type ComicCardProps = {
  comic: Comic;
};
const ComicCard = ({ comic }: ComicCardProps) => {
  const [hover, setHover] = useState(false);
  return (
    <Link href={`/comics/${comic.slug}`}>
      <div
        onMouseOut={() => setHover(false)}
        onMouseOver={() => setHover(true)}
        className="flex cursor-pointer flex-col rounded bg-white p-8 shadow-sm"
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">{comic.title}</h2>
        </div>

        <div className="relative h-80 w-full">
          <img
            className="h-80 w-full object-cover"
            src={comic.coverImage}
            alt={`Image of ${comic.title}`}
          />
          {hover && (
            <div className="absolute left-0 top-0 h-80 bg-[#00000050] p-8 text-stone-100">
              <p>{comic.shortDescription}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
