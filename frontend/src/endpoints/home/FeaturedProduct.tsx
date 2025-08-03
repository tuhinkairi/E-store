
const products = [
  { id: 1, name: "Heritage Cashmere Coat", price: "$485", image: "https://th.bing.com/th/id/R.37b78526f0d42824ab245774cec985a9?rik=1cBjw%2bOC%2foKCjg&riu=http%3a%2f%2fwww.officesalt.com%2fwp-content%2fuploads%2f2018%2f02%2fBest-Formal-Shirt-Pant-Combinations-for-Men-34-600x1200.jpg&ehk=KnMZm6sblkPi%2fc50padh0nkawwHE36D1vuAaO5Qdpds%3d&risl=&pid=ImgRaw&r=0", badge: "SIGNATURE" },
  { id: 2, name: "Classic Oxford Shirt", price: "$145", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=600&fit=crop", badge: "ESSENTIAL" },
  { id: 3, name: "Wool Trench Coat", price: "$395", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop", badge: "TIMELESS" },
  { id: 4, name: "Merino Wool Sweater", price: "$225", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=600&fit=crop", badge: "LUXURY" }
];
const FeaturedProducts = () => (
  <section className="py-24 bg-cream">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-serif text-sage-900 mb-6">SIGNATURE PIECES</h2>
        <div className="w-24 h-0.5 bg-gold-500 mx-auto mb-6"></div>
        <p className="text-sage-700 text-lg font-light max-w-2xl mx-auto leading-relaxed">
          Meticulously crafted garments that transcend seasons and trends,
          embodying the essence of refined taste and enduring style.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative overflow-hidden bg-sage-50 mb-6">
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-sage-800 text-cream px-4 py-2 text-xs font-medium tracking-widest">
                  {product.badge}
                </span>
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-sage-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="text-center">
              <h3 className="text-sage-900 font-serif text-xl mb-3 group-hover:text-gold-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sage-700 font-light text-lg">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
export default FeaturedProducts;