import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import { useForm, ValidationError } from "@formspree/react";
import Link from "next/link";

export default function ContactUs() {
	const [state, handleSubmit] = useForm("mnqlgkqk");
	if (state.succeeded) {
		return (
			<div className="w-full max-w-screen-sm flex justify-center items-center  m-auto mt-20   rounded-lg shadow-x">
				<div className="rounded overflow-hidden shadow-lg">
					<div className="px-6 py-4">
						<div className="font-bold text-xl mb-2">Thank You For Feedback</div>
					</div>
					<Link href="/">
						<a className="block py-2.5 px-4 rounded transition duration-200">
							Home
						</a>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<Layout>
			<Head>
				<title>Contact | Aviate coders</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<form
				onSubmit={handleSubmit}
				className=" flex items-center justify-center  py-12 px-4 sm:px-3 lg:px-4"
			>
				<div className="w-full max-w-2xl px-5 py-10 m-auto mt-10  rounded-lg shadow-xl">
					<div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
						Contact us !
					</div>
					<div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
						<div className="col-span-2 lg:col-span-1">
							<div className=" relative ">
								<label htmlFor="firstName">First Name</label>
								<input
									type="firstName"
									id="firstName"
									name="firstName"
									className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#1E2E46] focus:border-transparent"
									placeholder="First Name"
								/>
								<ValidationError
									prefix="First Name"
									field="firstName"
									errors={state.errors}
								/>
							</div>
						</div>
						<div className="col-span-2 lg:col-span-1">
							<div className=" relative ">
								<label htmlFor="lastname">Last Name</label>
								<input
									type="lastname"
									id="lastname"
									name="lastname"
									className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#1E2E46] focus:border-transparent"
									placeholder="Last Name"
								/>
								<ValidationError
									prefix="Last name"
									field="lastName"
									errors={state.errors}
								/>
							</div>
						</div>
						<div>
							<div className=" w-full ">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									id="email"
									name="email"
									className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#1E2E46] focus:border-transparent"
									placeholder="Email"
								/>
								<ValidationError
									prefix="Email"
									field="email"
									errors={state.errors}
								/>
							</div>
						</div>
						<div className="col-span-2">
							<label className="text-gray-700">
								<label htmlFor="message">Message</label>
								<textarea
									id="message"
									name="message"
									className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#1E2E46] focus:border-transparent"
									placeholder="Message"
								></textarea>
							</label>
						</div>
						<ValidationError
							prefix="Message"
							field="message"
							errors={state.errors}
						/>
						<div className="col-span-2 text-right">
							<button
								type="submit"
								disabled={state.submitting}
								className="py-2 px-4  bg-[#1E2E46] hover:bg-[#1E2E46]-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
							>
								Send
							</button>
						</div>
					</div>
				</div>
			</form>
		</Layout>
	);
}
