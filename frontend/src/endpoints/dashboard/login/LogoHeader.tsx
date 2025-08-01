
const LogoHeader = ({ subtitle }:{subtitle:string}) => (
  <div className="text-center mb-8">
    <div className="inline-flex items-center justify-center w-20 h-20 bg-sage-800 rounded-full mb-6 relative">
      <span className="text-3xl font-bold text-cream">E</span>
      <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full opacity-20" />
    </div>
    <h1 className="text-3xl font-light text-sage-800 mb-2 tracking-wider">ELYSIAN</h1>
    <p className="text-cream-70 text-sm">{subtitle}</p>
  </div>
);

export default LogoHeader;
