import {
    Input,    
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    UseFormReturn,
    ProductFormValues,
} from "./ui"


interface PhysicalPropertiesProps {
    form: UseFormReturn<ProductFormValues>
    isSubmitting: boolean
}

export function PhysicalProperties({ form, isSubmitting }: PhysicalPropertiesProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Physical Properties</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Weight (g)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="0"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    className="transition-all focus-visible:ring-rose-500"
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dimensions.width"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Width (cm)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="0"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    className="transition-all focus-visible:ring-rose-500"
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dimensions.height"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Height (cm)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="0"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    className="transition-all focus-visible:ring-rose-500"
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dimensions.depth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Depth (cm)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="0"
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    className="transition-all focus-visible:ring-rose-500"
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}