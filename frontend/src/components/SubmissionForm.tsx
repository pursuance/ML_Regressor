'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z, ZodObject } from 'zod'
import { parseFeatures, parseLabel } from "@/utils/parseData"
import { getGradientData } from "@/services/api"
import { useDataStore, useFinalParametersStore, useSelectionsStore } from "@/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"

const SubmissionForm = () => {

	const { data } = useDataStore()
	const { features, label } = useSelectionsStore()
	const { setFinalParameters } = useFinalParametersStore()

	const buildDynamicSchema = (features: string[]): ZodObject<any> => {

		const baseSchema = z.object({
			b_init: z.coerce.number<string>(),
			alpha: z.coerce.number<string>(),
			num_iterations: z.coerce.number<string>().int()
		})

		const dynamicFields = features.reduce((acc, _, index) => {
			acc[`w_init_${index}`] = z.coerce.number<string>()
			return acc
		}, {} as Record<string, z.ZodTypeAny>)

		const formSchema = baseSchema.extend(dynamicFields)

		return formSchema
	}


	const form = useForm({
		resolver: zodResolver(buildDynamicSchema(features!)),
		defaultValues: {
			b_init: '0',
			alpha: '0.01',
			num_iterations: '1000',
			...features.reduce((acc, _, index) => {
				acc[`w_init_${index}`] = '0'
				return acc
			}, {} as Record<string, string>)
		}
	})

	const onSubmit = async (values: z.infer<ReturnType<typeof buildDynamicSchema>>) => {		
		try {
			const extractWInitArray = (formData: Record<string, any>): number[] => {
				const wInitKeys = Object.keys(formData).filter(key => key.startsWith('w_init_'))

				wInitKeys.sort((a, b) => {
					const indexA = parseInt(a.split("_")[2], 10)
					const indexB = parseInt(b.split("_")[2], 10)
					return indexA - indexB
				})

				const wInitArray = wInitKeys.map(key => parseFloat(formData[key]))

				return wInitArray
			}

			const wInitArray = extractWInitArray(values)
			const x = parseFeatures(data!, features)
			const y = parseLabel(data!, label)

			const parsedValues = {
				x,
				y,
				w_init: wInitArray,
				b_init: values.b_init,
				alpha: values.alpha,
				num_iterations: values.num_iterations,
				features,
				label
			}
			const numIterations = values.num_iterations as number
			const finalValues = await getGradientData(parsedValues)
			console.log("API Response:", finalValues)
			setFinalParameters(finalValues.final_w, finalValues.final_b, numIterations, finalValues.J_history)
		} catch (error) {
			console.error("Error while submitting data:", error)
		}
	}


	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{features.map((feature, index) => 
					<FormField
						{ ...form.register(`w_init_${index}`) }
						name={`w_init_${index}`}
						key={index}
						render={({ field }) => (
							<FormItem>
								<FormLabel>w{index}: {feature}</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
							
						)}
					/>
				)}
				<FormField
					{ ...form.register('b_init') }
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
					{ ...form.register('alpha') }
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
					{ ...form.register('num_iterations') }
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
				<Button className="cursor-pointer" type="submit">Submit</Button>
			</form>
		</Form>
	)
}

export default SubmissionForm