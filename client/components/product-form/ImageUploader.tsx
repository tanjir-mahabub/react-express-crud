"use client"
import {
    Input,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    UseFormReturn,
    ProductFormValues,
    Link,
    Upload,
    ImageIcon,
    Button,
    X,
    Trash2,
    Plus,
} from "./ui"

interface ImageUploaderProps {
    form: UseFormReturn<ProductFormValues>
    isSubmitting: boolean
    thumbnailPreview: string
    setThumbnailPreview: (url: string) => void
    thumbnailInput: { type: "url" | "file"; file: File | null }
    setThumbnailInput: (input: { type: "url" | "file"; file: File | null }) => void
    imagesInput: Array<{ type: "url" | "file"; file: File | null; url: string }>
    setImagesInput: (input: { type: "url" | "file"; file: File | null; url: string }[]) => void;
    imagesPreviews: string[]
    setImagesPreviews: (previews: string[]) => void
    newImageUrl: string
    setNewImageUrl: (url: string) => void
}

export function ImageUploader({
    form,
    isSubmitting,
    thumbnailPreview,
    setThumbnailPreview,
    thumbnailInput,
    setThumbnailInput,
    imagesInput,
    setImagesInput,
    imagesPreviews,
    setImagesPreviews,
    newImageUrl,
    setNewImageUrl,
}: ImageUploaderProps) {
    const handleThumbnailFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setThumbnailPreview(url)
            setThumbnailInput({ type: "file", file })
            form.setValue("thumbnail", url)
            form.trigger("thumbnail")
        }
    }

    const handleThumbnailUrlChange = (url: string) => {
        setThumbnailPreview(url)
        setThumbnailInput({ type: "url", file: null })
        form.setValue("thumbnail", url)
        form.trigger("thumbnail")
    }

    const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);

        const newImagesInput = files.map((file) => {
            return {
                type: "file" as const,
                file,
                url: URL.createObjectURL(file),
            };
        });

        const newImagesPreviews = newImagesInput.map((img) => img.url);

        // Get current values from form and state
        const currentImages = form.getValues("images") || [];

        // Update form images with new URLs appended
        form.setValue("images", [...currentImages, ...newImagesPreviews]);
        form.trigger("images");

        // Update component state for inputs and previews only once
        setImagesInput([...imagesInput, ...newImagesInput]);
        setImagesPreviews([...imagesPreviews, ...newImagesPreviews]);

        event.target.value = ""; // reset input
    };

    const addImageUrl = () => {
        if (newImageUrl.trim() !== "") {
            const currentImages = form.getValues("images") || []
            if (!currentImages.includes(newImageUrl.trim())) {
                form.setValue("images", [...currentImages, newImageUrl.trim()]);
                setImagesInput([...imagesInput, { type: "url", file: null, url: newImageUrl.trim() }]);
                setImagesPreviews([...imagesPreviews, newImageUrl.trim()]);
                form.trigger("images")
            }
            setNewImageUrl("")
        }
    }

    const removeImage = (index: number) => {
        const updated = imagesPreviews.filter((_, i) => i !== index)
        form.setValue("images", updated)
        setImagesPreviews(updated)
        setImagesInput(imagesInput.filter((_, i) => i !== index))
        form.trigger("images")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Thumbnail */}
                <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Thumbnail <span className="text-red-500">*</span></FormLabel>
                            <Tabs defaultValue="url" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="url" disabled={isSubmitting}><Link className="h-4 w-4" />URL</TabsTrigger>
                                    <TabsTrigger value="upload" disabled={isSubmitting}><Upload className="h-4 w-4" />Upload</TabsTrigger>
                                </TabsList>
                                <TabsContent value="url">
                                    <Input
                                        placeholder="https://example.com/image.jpg"
                                        value={thumbnailInput.type === "url" ? field.value : ""}
                                        onChange={(e) => handleThumbnailUrlChange(e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                </TabsContent>
                                <TabsContent value="upload">
                                    <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg ${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer bg-gray-50 hover:bg-gray-100"}`}>
                                        <div className="flex flex-col items-center justify-center pt-3 pb-3">
                                            <ImageIcon className="w-6 h-6 mb-2 text-gray-500" />
                                            <p className="text-xs text-gray-500">Click to upload</p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleThumbnailFileChange} disabled={isSubmitting} />
                                    </label>
                                </TabsContent>
                            </Tabs>
                            {thumbnailPreview && (
                                <div className="mt-2 relative w-20 h-20 border rounded-md overflow-hidden">
                                    <img src={thumbnailPreview} className="object-cover w-full h-full" onError={(e) => (e.currentTarget.src = "/placeholder.svg")} />
                                    {!isSubmitting && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-1 right-1 h-5 w-5"
                                            onClick={() => {
                                                setThumbnailPreview("")
                                                setThumbnailInput({ type: "url", file: null })
                                                form.setValue("thumbnail", "")
                                            }}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    )}
                                </div>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Additional Images */}
                <FormField
                    control={form.control}
                    name="images"
                    render={() => (
                        <FormItem>
                            <FormLabel>Additional Images <span className="text-red-500">*</span></FormLabel>
                            <Tabs defaultValue="url" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="url" disabled={isSubmitting}><Link className="h-4 w-4" />Add URL</TabsTrigger>
                                    <TabsTrigger value="upload" disabled={isSubmitting}><Upload className="h-4 w-4" />Upload</TabsTrigger>
                                </TabsList>
                                <TabsContent value="url" className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            value={newImageUrl}
                                            onChange={(e) => setNewImageUrl(e.target.value)}
                                            placeholder="https://example.com/image.jpg"
                                            disabled={isSubmitting}
                                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImageUrl())}
                                        />
                                        <Button type="button" variant="outline" size="icon" onClick={addImageUrl} disabled={isSubmitting}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TabsContent>
                                <TabsContent value="upload">
                                    <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg ${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer bg-gray-50 hover:bg-gray-100"}`}>
                                        <div className="flex flex-col items-center justify-center pt-3 pb-3">
                                            <ImageIcon className="w-6 h-6 mb-2 text-gray-500" />
                                            <p className="text-xs text-gray-500">Click to upload</p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageFileChange} disabled={isSubmitting} />
                                    </label>
                                </TabsContent>
                            </Tabs>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                                {imagesPreviews.map((preview, index) => {
                                    const imageInput = imagesInput[index]
                                    return (
                                        <div key={index} className="relative group border rounded-md overflow-hidden">
                                            <div className="aspect-video bg-slate-100 flex items-center justify-center">
                                                <img src={preview} alt={`Image ${index}`} className="object-contain max-h-full max-w-full" />
                                            </div>
                                            <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                                                {imageInput?.type === "file" ? "📁" : "🔗"}
                                            </div>
                                            {!isSubmitting && (
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5"
                                                    onClick={() => removeImage(index)}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}
