const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian">
            <div className="flex flex-col items-center gap-6">
                <div className="relative size-16">
                    <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
                    <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-gold" />
                </div>
                <p className="font-display text-sm text-gold/60">Classic Brand Co</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
