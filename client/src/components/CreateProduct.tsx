import React, { useState } from 'react';
import { createProduct } from '../lib/actions/product';

export default function CreateProduct() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [category, setCategory] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Simple URL validation
    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            // Basic validation before sending
            if (!title.trim()) throw new Error('Title is required');
            if (!description.trim()) throw new Error('Description is required');
            if (!category.trim()) throw new Error('Category is required');
            if (price === '' || price <= 0) throw new Error('Price must be greater than 0');
            if (!thumbnail.trim() || !isValidUrl(thumbnail)) throw new Error('Valid thumbnail URL is required');
            if (images.length === 0) throw new Error('At least one image URL is required');
            if (!images.every(isValidUrl)) throw new Error('All image URLs must be valid');

            const payload = {
                title: title.trim(),
                description: description.trim(),
                price: Number(price),
                discountPercentage: 0,      // or allow input
                rating: 0,                  // or allow input
                stock: 100,                 // or allow input
                brand: 'Generic',           // or allow input
                category: category.trim(),
                thumbnail: thumbnail.trim(),
                images: images.map(img => img.trim()),
                tags,
            };

            console.log('Submitting payload:', payload);

            const result = await createProduct(payload);

            setSuccess('Product created successfully!');
            // Reset form or handle success UI
        } catch (err: any) {
            setError(err.message || 'Failed to submit product');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title*</label>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Description*</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Price*</label>
                <input
                    type="number"
                    value={price}
                    min={0.01}
                    step={0.01}
                    onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    required
                />
            </div>

            <div>
                <label>Category*</label>
                <input
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Thumbnail URL*</label>
                <input
                    type="url"
                    value={thumbnail}
                    onChange={e => setThumbnail(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Images URLs* (comma separated)</label>
                <input
                    type="text"
                    value={images.join(', ')}
                    onChange={e => setImages(e.target.value.split(',').map(url => url.trim()).filter(url => url.length > 0))}
                    required
                />
            </div>

            <div>
                <label>Tags (optional, comma separated)</label>
                <input
                    type="text"
                    value={tags.join(', ')}
                    onChange={e => setTags(e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0))}
                />
            </div>

            <button type="submit">Create Product</button>

            {error && <p style={{ color: 'red' }}>🚨 {error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
}
