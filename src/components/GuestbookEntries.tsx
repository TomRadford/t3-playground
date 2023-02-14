import { api } from '../utils/api'

const GuestbookEntries = () => {
	const { data: guestBookEntries, isLoading } = api.guestbook.getAll.useQuery()
	if (isLoading) return null
	return (
		<div className="flex animate-[fadeIn_1s_ease_1] flex-col gap-4">
			{guestBookEntries?.map((entry, i) => {
				return (
					<div key={i}>
						<p>
							{entry.message}
							<span> - {entry.name}</span>
						</p>
					</div>
				)
			})}
		</div>
	)
}

export default GuestbookEntries
