import { type NextPage } from 'next'
import Head from 'next/head'
import { signOut, signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import GuestbookEntries from '../components/GuestbookEntries'
import GuestbookForm from '../components/GuestbookForm'

const Home: NextPage = () => {
	const { data: session, status } = useSession()

	return (
		<>
			<Head>
				<title>Guestbook App</title>
				<meta name="description" content="Guestbook App" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className=" mx-auto mt-4 max-w-3xl">
				<nav className="mx-auto flex flex-row items-center justify-between">
					<h1 className="text-3xl font-bold">Guestbook!</h1>
					<div className="">
						{status !== 'loading' && (
							<>
								{session ? (
									<div className="flex animate-[fadeIn_1s_ease_1] items-center gap-2">
										<p>
											Hello <strong>{session.user?.name}</strong>!
										</p>
										<div className="group flex items-center justify-center">
											<button
												className={` absolute mx-auto text-center opacity-0
										 transition-all duration-300 ease-in-out group-hover:opacity-100`}
												onClick={() => {
													signOut().catch(console.log)
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="h-3 w-3"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
													/>
												</svg>
											</button>
											<Image
												src={session.user.image ?? '/user.png'}
												alt={session.user.name ?? ''}
												width={30}
												height={30}
												className="rounded-full transition-opacity"
											/>
										</div>
									</div>
								) : (
									<button
										className=" rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
										onClick={() => {
											signIn().catch(console.log)
										}}
									>
										Login
									</button>
								)}
							</>
						)}
					</div>
				</nav>
				<main className="flex flex-col items-center">
					<GuestbookForm />
					<div className="mt-10">
						<GuestbookEntries />
					</div>
				</main>
			</div>
		</>
	)
}

export default Home

// const AuthShowcase: React.FC = () => {
// 	const { data: sessionData } = useSession()

// 	const { data: secretMessage } = api.example.getSecretMessage.useQuery(
// 		undefined, // no input
// 		{ enabled: sessionData?.user !== undefined }
// 	)

// 	return (
// 		<div className="flex flex-col items-center justify-center gap-4">
// 			<p className="text-center text-2xl text-white">
// 				{sessionData && <span>Logged in as {sessionData.user?.name}</span>}
// 				{secretMessage && <span> - {secretMessage}</span>}
// 			</p>
// 			<button
// 				className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
// 				onClick={sessionData ? () => void signOut() : () => void signIn()}
// 			>
// 				{sessionData ? 'Sign out' : 'Sign in'}
// 			</button>
// 		</div>
// 	)
// }
