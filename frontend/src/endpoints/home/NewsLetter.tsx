const Newsletter = () => (
    <section className="py-24 bg-gold-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl font-serif text-sage-900 mb-6">JOIN THE CIRCLE</h2>
            <div className="w-24 h-0.5 bg-sage-900 mx-auto mb-8"></div>
            <p className="text-sage-800 text-lg font-light mb-12 leading-relaxed">
                Receive exclusive invitations to private showings, seasonal previews,
                and insights from our heritage craftsmen.
            </p>
            <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
                <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-6 py-4 bg-cream text-sage-900 placeholder-sage-600 border-2 border-sage-200 focus:outline-none focus:border-sage-800 font-light"
                />
                <button className="bg-sage-900 text-cream px-10 py-4 font-medium hover:bg-sage-800 transition-colors tracking-wide">
                    SUBSCRIBE
                </button>
            </div>
        </div>
    </section>
);
export default Newsletter;