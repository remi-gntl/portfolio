import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Mail, User, MessageSquare, Loader2, CheckCircle } from 'lucide-react';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const serviceID = 'service_0i17amh';
    const templateID = 'template_9vuwodp';
    const publicKey = 'uCh_tjR2sl5dPFKRF';

    if (!formRef.current) return;

    emailjs.sendForm(serviceID, templateID, formRef.current, publicKey)
      .then(() => {
        setSuccess(true);
        setLoading(false);
        // Reset après 5 secondes
        setTimeout(() => setSuccess(false), 5000);
        formRef.current?.reset();
      }, (err) => {
        console.error('Erreur:', err);
        setError("Une erreur est survenue, réessayez plus tard.");
        setLoading(false);
      });
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-4xl mx-auto relative z-10">
      
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-black text-white">
          Contactez <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Moi</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Un projet en tête ou une opportunité à discuter ? N'hésitez pas à m'envoyer un message, je réponds généralement sous 24h.
        </p>
      </div>

      <div className="bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800 backdrop-blur-sm shadow-2xl">
        
        {success ? (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
            <p className="text-gray-400">Merci de m'avoir contacté. Je reviens vers vous très vite.</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                  <input 
                    type="text" 
                    name="name" // Important pour EmailJS (doit matcher {{name}} dans le template)
                    required 
                    placeholder="Entrez votre Nom"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500 focus:bg-slate-800 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                  <input 
                    type="email" 
                    name="email" // Important pour EmailJS
                    required 
                    placeholder="Entrez votre email"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500 focus:bg-slate-800 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                <textarea 
                  name="message" // Important pour EmailJS
                  required 
                  rows={5}
                  placeholder="Écrivez votre message ici..."
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500 focus:bg-slate-800 outline-none transition-all resize-none"
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Envoi en cours...
                </>
              ) : (
                <>
                  Envoyer le message <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;