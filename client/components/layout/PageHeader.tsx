interface PageHeaderProps {
    title: string
    description?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => (
    <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h1>
        <p className="mt-3 text-xl text-gray-500">{description}</p>
    </div>
)
