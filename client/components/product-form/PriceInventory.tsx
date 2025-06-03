import { ProductFormValues } from "@/lib/validation/productFormSchema"
import { UseFormReturn } from "react-hook-form"
import { availabilityStatuses } from "./constants"
import {
    Input,    
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui"


interface PriceInventoryProps {
    form: UseFormReturn<ProductFormValues>
    isSubmitting: boolean
}

export function PriceInventory({ form, isSubmitting }: PriceInventoryProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Pricing & Inventory</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price ($) <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
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
                    name="discountPercentage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Discount (%) <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="0"
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
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating (0-5)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="5"
                                    placeholder="0.0"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                    name="stock"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Stock <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="0"
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
                    name="minimumOrderQuantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Min Order Qty <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="1"
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
                    name="availabilityStatus"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Availability Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                                <FormControl>
                                    <SelectTrigger className="transition-all focus-visible:ring-rose-500">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {availabilityStatuses.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}