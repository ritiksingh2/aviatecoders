import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import BlogCard from "../../components/BlogCard";
import Link from "next/link";
import { getPosts } from "../../lib/mdx";

interface WebDevProps {
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

const WebDev: React.FC<WebDevProps> = ({ posts }) => {
	const WebDev = posts.filter((post) => post.data.category === "webdev");

	return (
		<Layout>
			<Head>
				<title>WebDev | Aviate Coders</title>
				<meta name="description" content="Blog page of Aviate Coders" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="mr-10  font-semibold text-2xl ml-8 mb-5">
				<h1>Web Development</h1>
			</div>
			<div className="flex flex-wrap ml-5 ">
				{WebDev.map((post) => (
					<Link
						key={post.filePath}
						as={`/javascript/${post.filePath.replace(/\.mdx?$/, "")}`}
						href={`/javascript/${post.filePath.replace(/\.mdx?$/, "")}`}
					>
						<a>
							<div key={post.filePath} className="h-full">
								<BlogCard
									key={post.filePath}
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

export default WebDev;
