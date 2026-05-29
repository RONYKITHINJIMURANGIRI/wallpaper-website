import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';

export default function CategoryPage({ params }) {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Header page="category" />
      <main className="pt-24 px-4">
        <section className="max-w-5xl mx-auto py-16">
          <h1 className="text-4xl font-black mb-4">{params.genre}</h1>
          <p className="text-gray-400">Wallpapers filtered by category: {params.genre}.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
