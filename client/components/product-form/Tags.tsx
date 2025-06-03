import { useState } from "react"
import {
    Input,   
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
    Button,
    Plus,
    X,
} from "./ui"

interface TagsProps {
    form: UseFormReturn<ProductFormValues>
    isSubmitting: boolean
}

export function Tags({ form, isSubmitting }: TagsProps) {
    const [newTag, setNewTag] = useState("")

    const addTag = () => {
        if (newTag.trim() !== "") {
            const currentTags = form.getValues("tags") || []
            if (!currentTags.includes(newTag.trim())) {
                form.setValue("tags", [...currentTags, newTag.trim()])
                form.trigger("tags")
            }
            setNewTag("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        const currentTags = form.getValues("tags") || []
        form.setValue(
            "tags",
            currentTags.filter((tag) => tag !== tagToRemove),
        )
        form.trigger("tags")
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
                <FormField
                    control={form.control}
                    name="tags"
                    render={() => (
                        <FormItem>
                            <FormLabel>Tags <span className="text-red-500">*</span></FormLabel>
                            <div className="flex items-center space-x-2">
                                <Input
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Add a tag"
                                    className="transition-all focus-visible:ring-rose-500"
                                    disabled={isSubmitting}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault()
                                            addTag()
                                        }
                                    }}
                                />
                                <Button type="button" variant="outline" size="icon" onClick={addTag} disabled={isSubmitting}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {form.watch("tags")?.map((tag) => (
                                    <div
                                        key={tag}
                                        className="flex items-center bg-rose-100 text-rose-800 rounded-full px-3 py-1 text-sm"
                                    >
                                        {tag}
                                        {!isSubmitting && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-5 w-5 ml-1 hover:bg-rose-200"
                                                onClick={() => removeTag(tag)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}