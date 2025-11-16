export default function About() // Dark Mode Enabled()
 {
  return (
    <div className="w-full bg-gray-900 text-gray-100 leading-relaxed">
      {/* Header */}
  

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-10 px-4 space-y-12">
        {/* Navigation List */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 shadow-lg rounded-xl p-5 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-yellow-300 font-medium">
              <li>About Us</li>
              <li>Acts & Rules</li>
              <li>Schemes</li>
              <li>Who's Who</li>
              <li>Citizen Charter</li>
            </ul>
          </div>

          {/* About Section */}
          <div className="md:col-span-3 bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700 space-y-6">
            <h2 className="text-3xl font-bold text-yellow-400">State Government Portal</h2>

            <section>
              <h3 className="text-2xl font-semibold mb-2">History and Geography</h3>
              <p>
                Delhi finds prominent reference right from the times of the epic Mahabharata...
                Its control passed from Mauryas, Pallavas, Guptas, Turks, Afghan, Mughals, to the British.
                In 1956 it became a Union Territory and got a Legislative Assembly with the enactment of the
                National Capital Territory Act, 1991.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-2">Agriculture</h3>
              <p>
                The principal food crops are wheat, bajra, jowar, gram and maize... Emphasis has shifted to
                vegetables, dairy, floriculture, and high-return activities.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-2">Industry</h3>
              <p>
                Delhi is the largest commercial centre in northern India, producing electronics, automobiles,
                sports goods, textiles, medicines, leather goods, software, and more. Major industrial areas like
                Bawana and Narela are extensively developed.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-2">Irrigation and Power</h3>
              <p>
                Due to urbanisation, irrigated farmland is reducing. Delhi maintains irrigation through tube-wells
                and Yamuna canal networks. Power is supplied by multiple major plants including Pragati Power
                Project, Bawana Gas Plant, and Northern Regional Grid.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-2">Transport</h3>
              <p>
                Delhi is connected by extensive road, rail and air networks. It hosts India's busiest metro system
                with over 190 km of operational lines.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-2">Festivals</h3>
              <p>
                Being a cosmopolitan city, Delhi celebrates all major festivals of India. Tourism festivals like
                Qutab Festival, Garden Tourism Festival, Mango Festival are held annually.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-2">Tourist Places</h3>
              <ul className="list-disc ml-6">
                <li>Red Fort</li>
                <li>Jama Masjid</li>
                <li>Qutab Minar</li>
                <li>India Gate</li>
                <li>Lotus Temple</li>
                <li>Humayun’s Tomb</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white mt-10 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <div>
            <h3 className="font-semibold text-xl mb-3">Quick Links</h3>
            <ul className="space-y-1 text-gray-200">
              <li>FAQs</li>
              <li>Disclaimer</li>
              <li>Feedback</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-3">Delhi Secretariat Address</h3>
            <p>Government of NCT of Delhi<br/>3rd level, I.P. Estate, New Delhi-110002</p>
            <p className="mt-2">Office Timing: 09:30 AM - 06:00 PM</p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-3">Information</h3>
            <p>Last Updated: 14/11/2025</p>
            <p>Total Visitors: 2910780</p>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-300">
          Copyright © 2025 - Official Website of Government of NCT of Delhi
        </div>
      </footer>
    </div>
  );
}
