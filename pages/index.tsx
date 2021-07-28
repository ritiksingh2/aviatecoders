import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Image from "next/image";
import landingPage from "../public/landingPage.png";
import BlogCard from "../components/BlogCard";
import { getPosts } from "../lib/mdx";
import React from "react";

interface HomeProps {
	posts: {
		content: string;
		data: {
			title: string;
			description: string;
			seoTitle: string;
			isPublished: boolean;
			publishedOn: Date;
			author: string;
			coverImage: string;
			category: string;
		};
		filePath: string;
		timeForReading: string;
	}[];
}

const Home: React.FC<HomeProps> = ({ posts }) => {
	const publishedPosts = posts.filter((post) => post.data.isPublished === true);
	const datePublish = publishedPosts.map((date) => date.data.publishedOn);
	const sortedPosts = publishedPosts
		.slice()
		.sort(
			(a, b) =>
				new Date(b.data.publishedOn).valueOf() -
				new Date(a.data.publishedOn).valueOf()
		);

	const getTopLatestPosts = sortedPosts.slice(0, 6);

	return (
		<Layout>
			<Head>
				<title>Aviate coders</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="grid grid-cols-2 gap-8 items-center justify-center">
				<div className="mr-20 font-semibold text-5xl">
					<h1>Aviating Your Efficiency To Code</h1>
					<button className="bg-[#1E2E46] mt-10 hover:bg-[#EFF0F2] hover:text-[#1E2E46] text-white font-bold py-2 px-4 rounded text-lg">
						Subscribe
					</button>
				</div>
				<div className="justify-self-center">
					<Image
						src={landingPage}
						alt="landing page"
						width={600}
						height={500}
					/>
				</div>
			</div>
			<div className="mr-20 font-semibold text-3xl mb-4  ">
				<h1>Our Latest Blogs</h1>
			</div>
			<div className="flex flex-wrap  ">
				{getTopLatestPosts.map((post) => (
					<Link
						as={`/${post.data.category}/${post.filePath.replace(
							/\.mdx?$/,
							""
						)}`}
						href={`/${post.data.category}/${post.filePath.replace(
							/\.mdx?$/,
							""
						)}`}
					>
						<a>
							<div key={post.filePath} className="h-full">
								<BlogCard
									title={post.data.title}
									publishedOn={post.data.publishedOn}
									coverImage={post.data.coverImage}
									timeForReading={post.timeForReading}
								/>
							</div>
						</a>
					</Link>
				))}
			</div>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const posts = getPosts();
	return {
		props: {
			posts,
		},
	};
};

export default Home;
