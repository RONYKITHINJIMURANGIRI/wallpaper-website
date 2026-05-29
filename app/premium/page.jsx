import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Header page="premium" />
      <main className="pt-24 px-4">
        <section className="max-w-5xl mx-auto py-16">
          <h1 className="text-4xl font-black mb-4">Premium</h1>
          <p className="text-gray-400">Unlock Pro features like 8K downloads and zero ads.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
