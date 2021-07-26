import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import BlogCard from "../../components/BlogCard";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
const readingTime = require("reading-time");
import { postPath, postFilePaths } from "../../lib/mdx";

interface BlogProps {
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
		};
		filePath: string;
		timeForReading: string;
	}[];
}

const Index: React.FC<BlogProps> = ({ posts }) => {
	return (
		<Layout>
			<Head>
				<title>Blog</title>
				<meta name="description" content="Blog page of Aviate Coders" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* <div className="mr-20 font-semibold text-4xl">
				<h1>Our Latest Blogs</h1>
			</div> */}
			<div className="flex flex-wrap justify-between ">
				{posts.map((post) => (
					<Link as={`/blog/${post.filePath.replace(/\.mdx?$/, "")}`} href="/">
						<div key={post.filePath}>
							<BlogCard
								title={post.data.title}
								publishedOn={post.data.publishedOn}
								coverImage={post.data.coverImage}
								timeForReading={post.timeForReading}
							/>
						</div>
					</Link>
				))}
			</div>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const posts = postFilePaths.map((filePath) => {
		const source = fs.readFileSync(path.join(postPath, filePath));
		const { content, data } = matter(source);
		const stats = readingTime(content);
		const timeForReading = stats.text;
		return {
			content,
			data,
			filePath,
			timeForReading,
		};
	});
	return {
		props: {
			posts,
		},
	};
};

export default Index;
