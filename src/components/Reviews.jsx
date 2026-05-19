import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const reviews = [
  { name: 'Ravi Kumar',    role: 'Student',           text: 'Very fast passport assistance service. Got my documents processed in a single day!', stars: 5, avatar: 'RK', color: '#0A66FF' },
  { name: 'Priya Devi',   role: 'Job Seeker',         text: 'AI assistant helped me fill forms easily without any confusion. Amazing service!', stars: 5, avatar: 'PD', color: '#1DA1F2' },
  { name: 'Senthil M.',   role: 'Small Business',     text: 'Best internet center near me for online applications. GST registration was smooth!', stars: 5, avatar: 'SM', color: '#00D4FF' },
  { name: 'Kavitha A.',   role: 'Homemaker',           text: 'Aadhaar update was done in 15 minutes. Super professional and friendly staff!', stars: 5, avatar: 'KA', color: '#22C55E' },
  { name: 'Murugan P.',   role: 'Farmer',              text: 'Income certificate processed quickly. WhatsApp update system is very convenient!', stars: 5, avatar: 'MP', color: '#0A66FF' },
  { name: 'Deepika R.',   role: 'Teacher',             text: 'Resume built with AI in 30 minutes. Very modern and looks extremely professional.', stars: 4, avatar: 'DR', color: '#1DA1F2' },
  { name: 'Arun Babu',    role: 'Engineer',            text: 'Digital signature done without hassle. The team knows exactly what they\'re doing!', stars: 5, avatar: 'AB', color: '#00D4FF' },
  { name: 'Sundari K.',   role: 'College Student',     text: 'Scholarship application filed in one visit. The staff guided me through every step.', stars: 5, avatar: 'SK', color: '#0A66FF' },
];

function ReviewCard({ review }) {
  return (
    <div className="glass-white rounded-2xl p-6 w-72 shrink-0 mx-3 border border-blue-100 hover:border-blue-300 transition-colors cursor-default">
      <div className="flex items-start justify-between mb-4">
        <Quote size={28} className="text-blue-200" />
        <div className="flex gap-0.5">
          {Array.from({ length: review.stars }).map((_, i) => (
            <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
      <p className="text-[#475569] text-sm leading-relaxed mb-5 italic">"{review.text}"</p>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ background: `linear-gradient(135deg, ${review.color}, #00D4FF)` }}
        >
          {review.avatar}
        </div>
        <div>
          <div className="font-semibold text-[#0F172A] text-sm">{review.name}</div>
          <div className="text-xs text-[#475569]">{review.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  // Duplicate for seamless loop
  const allReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-[#F4F9FF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full mb-4 text-[#0A66FF] bg-blue-50 border border-blue-200">
            Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
            Trusted by <span className="gradient-text">Thousands</span> of Customers
          </h2>
          <p className="text-[#475569] max-w-xl mx-auto">
            See why people across the region rely on Allen Net Center for their digital service needs.
          </p>
        </motion.div>
      </div>

      {/* Auto-scroll track */}
      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F4F9FF] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F4F9FF] to-transparent z-10" />

        <div className="flex testimonial-track">
          {allReviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
