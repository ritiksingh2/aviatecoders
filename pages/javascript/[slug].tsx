import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import Layout from "../../components/Layout";
import BlogLayout from "../../components/BlogLayout";
import { postPath, getHeadings, paths } from "../../lib/mdx";
// import dynamic from "next/dynamic";
import CodeHighlight from "../../components/CodeHighlight";
import { ClassAttributes, HTMLAttributes } from "react";

interface JavascriptPageProps {
	frontMatter: {
		title: string;
		description: string;
		author: string;
		category: string;
	};
	params: {
		slug: string;
	};
	source: MDXRemoteSerializeResult;
}

const components = {
	pre: (
		props: JSX.IntrinsicAttributes &
			ClassAttributes<HTMLDivElement> &
			HTMLAttributes<HTMLDivElement>
	) => <div {...props} />,
	code: CodeHighlight,
};

const JavascriptPage: React.FC<JavascriptPageProps> = ({
	source,
	frontMatter,
}) => {
	// console.log(source);
	return (
		<Layout>
			<Head>
				<title>{frontMatter.title} | Aviate Coders </title>
				<meta name="description" content={frontMatter.description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<BlogLayout frontMatter={frontMatter}>
				<MDXRemote {...source} components={components} />
			</BlogLayout>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const postFilePath = path.join(postPath, `${params?.slug}.mdx`);
	// console.log(params);
	const source = fs.readFileSync(postFilePath, "utf8");

	const headings = getHeadings(source);
	// console.log(headings);

	const { content, data } = matter(source);

	const mdxSource = await serialize(content, {
		// Optionally pass remark/rehype plugins
		mdxOptions: {
			remarkPlugins: [],
			rehypePlugins: [],
		},
		scope: data,
	});

	return {
		props: {
			source: mdxSource,
			frontMatter: data,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths,
		fallback: false,
	};
};

export default JavascriptPage;
