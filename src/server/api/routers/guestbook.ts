import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const guestbookRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		try {
			return ctx.prisma.guestbook.findMany({
				select: {
					name: true,
					message: true,
				},
				orderBy: {
					createdAt: 'desc',
				},
			})
		} catch (e) {
			console.log('error', e)
		}
	}),
	postMessage: protectedProcedure
		.input(
			z.object({
				name: z.string(),
				message: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				await ctx.prisma.guestbook.create({
					data: {
						name: input.name,
						message: input.message,
					},
				})
			} catch (e) {
				console.error(e)
			}
		}),
})
