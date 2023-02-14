import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { api } from '../utils/api'

const GuestbookForm = () => {
	const [message, setMessage] = useState('')
	const { data: session, status } = useSession()
	const utils = api.useContext()
	const postMessage = api.guestbook.postMessage.useMutation({
		onMutate: async (newEntry) => {
			await utils.guestbook.getAll.cancel()
			utils.guestbook.getAll.setData(undefined, (prevEntries) => {
				if (prevEntries) {
					return [newEntry, ...prevEntries]
				} else {
					return [newEntry]
				}
			})
		},
		onSettled: async () => {
			await utils.guestbook.getAll.invalidate()
		},
	})

	if (status !== 'authenticated') return null

	return (
		<form
			className="mt-10 flex animate-[fadeIn_1s_ease_1] gap-2"
			onSubmit={(e) => {
				e.preventDefault()
				postMessage.mutate({
					name: session.user?.name as string,
					message,
				})
				setMessage('')
			}}
		>
			<input
				type="text"
				className="focus rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
				placeholder="Your message...."
				minLength={2}
				maxLength={100}
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button
				type="submit"
				className="rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
			>
				Submit
			</button>
		</form>
	)
}

export default GuestbookForm
