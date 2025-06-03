import {
    Input,
    Textarea,    
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

interface AditionalInformationProps {
    form: UseFormReturn<ProductFormValues>
    isSubmitting: boolean
}

export function AditionalInformation({ form, isSubmitting }: AditionalInformationProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="warrantyInformation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Warranty Information</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter warranty details"
                                    className="resize-none min-h-[80px] transition-all focus-visible:ring-rose-500"
                                    {...field}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="shippingInformation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Shipping Information</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter shipping details"
                                    className="resize-none min-h-[80px] transition-all focus-visible:ring-rose-500"
                                    {...field}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="returnPolicy"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Return Policy</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter return policy"
                                    className="resize-none min-h-[80px] transition-all focus-visible:ring-rose-500"
                                    {...field}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="meta.barcode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Barcode</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter barcode"
                                        {...field}
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
                        name="meta.qrCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>QR Code</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter QR code"
                                        {...field}
                                        className="transition-all focus-visible:ring-rose-500"
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    )
}