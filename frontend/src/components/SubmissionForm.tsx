'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
	w_init: z.number(),
	b_init: z.number(),
	alpha: z.number(),
	num_iterations: z.number().int()
})

const SubmissionForm = () => {

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			w_init: 0,
			b_init: 0,
			alpha: 0.01,
			num_iterations: 1000
		}
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="w_init"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Initial b</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								Form Description
							</FormDescription>
							<FormMessage />
						</FormItem>
						
					)}
				/>
				<FormField
					control={form.control}
					name="b_init"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Initial b</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								Form Description
							</FormDescription>
							<FormMessage />
						</FormItem>
						
					)}
				/>
				<FormField
					control={form.control}
					name="alpha"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Alpha</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								Form Description
							</FormDescription>
							<FormMessage />
						</FormItem>
						
					)}
				/>
				<FormField
					control={form.control}
					name="num_iterations"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Number of Iterations</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								Form Description
							</FormDescription>
							<FormMessage />
						</FormItem>
						
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}

export default SubmissionForm