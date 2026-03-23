import type { Category } from '@/types';
import { CATEGORIES } from '@/constants/config';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
    active: Category;
    onChange: (category: Category) => void;
}

const CategoryFilter = ({ active, onChange }: CategoryFilterProps) => {
    return (
        <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onChange(cat as Category)}
                    className={cn(
                        'rounded-full border px-4 py-2 font-body text-xs font-medium uppercase transition-all duration-200',
                        active === cat
                            ? 'border-gold bg-gold text-obsidian'
                            : 'border-obsidian-50 bg-transparent text-foreground/60 hover:border-gold/30 hover:text-foreground'
                    )}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
