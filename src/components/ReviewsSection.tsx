import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronDown, ChevronUp, UserCheck, MessageSquarePlus, ThumbsUp } from 'lucide-react';
import { useLanguage } from '../translations';

interface Review {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Brice Nguefack',
    role: 'Bénéficiaire Programme PED',
    city: 'Yaoundé',
    rating: 5,
    date: 'Septembre 2026',
    comment:
      "Grâce au programme PED du FNE360, j'ai décroché mon premier stage professionnel qui a débouché sur un CDI en finance d'entreprise. L'accompagnement du coach IA m'a énormément aidé pour la lettre de motivation.",
  },
  {
    id: '2',
    name: 'Clarisse Mbida',
    role: 'Certifiée CARE',
    city: 'Douala',
    rating: 5,
    date: 'Août 2026',
    comment:
      "La certification CARE est très complète et surtout 100% gratuite. Les conseils pour aborder les entretiens ont fait toute la différence lors de mon recrutement.",
  },
  {
    id: '3',
    name: 'Samuel Tchinda',
    role: 'Entrepreneur Agropastoral',
    city: 'Bafoussam',
    rating: 5,
    date: 'Juillet 2026',
    comment:
      "J'ai pu structurer mon exploitation maraîchère grâce au programme rural PADER. Le suivi des agents FNE sur le terrain est formidable.",
  },
];

interface ReviewsSectionProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ isOpen, onToggle }) => {
  const { lang, t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formRating, setFormRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newRev: Review = {
      id: Date.now().toString(),
      name: formName.trim(),
      role: 'Candidat FNE360',
      city: formCity.trim() || 'Cameroun',
      rating: formRating,
      date: "À l'instant",
      comment: formComment.trim(),
    };

    setReviews([newRev, ...reviews]);
    setFormName('');
    setFormCity('');
    setFormComment('');
    setShowAddForm(false);
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={onToggle}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-80 transition-opacity cursor-pointer"
      >
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <span>{t('home.reviews')}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4 text-left"
          >
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h4 className="font-bold text-foreground text-sm">
                    {lang === 'fr' ? 'Retours d’expérience vérifiés' : 'Verified User Feedback'}
                  </h4>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="font-bold text-foreground">4.9 / 5</span>
                    <span>(plus de 1 200 avis)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="rounded-full bg-surface-blue px-3 py-1.5 text-xs font-semibold text-brand-blue hover:bg-brand-blue hover:text-white transition-colors"
                >
                  {showAddForm ? 'Annuler' : 'Donner mon avis'}
                </button>
              </div>

              {/* Add form */}
              {showAddForm && (
                <motion.form
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="mt-4 rounded-xl border border-brand-blue/30 bg-surface-blue/30 p-4 space-y-3"
                >
                  <p className="text-xs font-bold text-foreground">Partagez votre avis sur FNE360</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Votre nom"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="rounded-xl border border-border bg-white px-3 py-1.5 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Votre ville (ex: Yaoundé)"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      className="rounded-xl border border-border bg-white px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground block mb-1">Note globale :</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormRating(num)}
                          className="p-1"
                        >
                          <Star
                            className={`h-4 w-4 ${
                              num <= formRating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    required
                    placeholder="Votre témoignage sur l'accompagnement, la formation ou l'emploi..."
                    rows={3}
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white p-2.5 text-xs"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="rounded-full bg-brand-blue px-4 py-1.5 text-xs font-bold text-white hover:opacity-90"
                    >
                      Publier mon avis
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Reviews list */}
              <div className="mt-4 space-y-3 max-h-72 overflow-y-auto pr-1">
                {reviews.map((rev) => (
                  <div key={rev.id} className="rounded-xl border border-border/80 bg-neutral-50/50 p-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-blue font-bold text-xs text-brand-blue">
                          {rev.name[0]}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-foreground">{rev.name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {rev.role} · {rev.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="flex text-yellow-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground">{rev.date}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-foreground/90 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
