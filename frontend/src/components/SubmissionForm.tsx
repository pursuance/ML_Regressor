'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'

import { getGradientData } from "@/services/api"
import { useFinalParametersStore } from "@/store"

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
	w_init: z.string(),
	b_init: z.coerce.number(),
	alpha: z.coerce.number(),
	num_iterations: z.coerce.number().int()
})

const SubmissionForm = () => {

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			w_init: '0, 0',
			b_init: 0,
			alpha: 0.01,
			num_iterations: 1000
		}
	})

	const setFinalParameters = useFinalParametersStore((state) => state.setFinalParameters)

	const onSubmit = async (values: z.infer<typeof formSchema>) => {		
		try{
			const parsedValues = {
				...values,
				w_init: values.w_init.split(",").map(Number)
			}
			const finalValues = await getGradientData(parsedValues)
			console.log("API Response:", finalValues)
			setFinalParameters(finalValues.final_w, finalValues.final_b, values.num_iterations, finalValues.J_history)
		} catch (error) {
			console.error("Error while submitting data:", error)
		}
	}


	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="w_init"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Initial w</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								Enter initial weights as a comma-separated list.
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