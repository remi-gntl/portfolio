import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { compressImage } from '../../lib/imageOptimizer';
import { ArrowLeft, Upload, Save, X } from 'lucide-react';

const CreateProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // État du formulaire
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    github: '',
    link: '',
    techStack: '',
    features: ''   
  });

  // Gestion des champs textes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestion de l'image (Prévisualisation)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // SOUMISSION DU FORMULAIRE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

      if (imageFile) {
        // On affiche un petit log pour voir la différence
        console.log(`Taille originale: ${imageFile.size / 1024 / 1024} MB`);
        const compressedFile = await compressImage(imageFile);
        console.log(`Taille compressée: ${compressedFile.size / 1024 / 1024} MB`);

        // 2. Upload du fichier compressé
        const fileExt = 'webp'; // On sait que c'est du webp maintenant
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('projects')
          .upload(fileName, compressedFile); // On envoie compressedFile !

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('projects')
          .getPublicUrl(fileName);
        
        imageUrl = publicUrl;
      }

      // 2. Transformation des strings en tableaux (pour TechStack et Features)
      const techArray = formData.techStack.split(',').map(item => item.trim()).filter(i => i);
      const featureArray = formData.features.split(',').map(item => item.trim()).filter(i => i);

      // 3. Insertion en Base de Données
      const { error: dbError } = await supabase.from('projects').insert([
        {
          Title: formData.title,
          Description: formData.description,
          Github: formData.github,
          Link: formData.link,
          Img: imageUrl,
          TechStack: techArray, // Supabase attend du JSONB (tableau)
          Features: featureArray
        }
      ]);

      if (dbError) throw dbError;

      // Succès !
      navigate('/admin/dashboard');

    } catch (error) {
      console.error('Erreur:', error);
      alert("Une erreur est survenue lors de la création.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/admin/dashboard')} className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold">Nouveau Projet</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* COLONNE GAUCHE : IMAGE */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">Image du projet</label>
              <div className={`relative aspect-video rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center overflow-hidden transition-colors ${!preview ? 'hover:border-blue-500 hover:bg-slate-800/50' : 'border-blue-500'}`}>
                
                {preview ? (
                  <>
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => { setPreview(null); setImageFile(null); }}
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-500 mb-2" />
                    <span className="text-sm text-gray-500">Cliquez pour upload</span>
                  </>
                )}
                
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className={`absolute inset-0 opacity-0 cursor-pointer ${preview ? 'hidden' : ''}`}
                />
              </div>
            </div>

            {/* COLONNE DROITE : INFOS */}
            <div className="md:col-span-2 space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Titre du projet</label>
                <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none transition-colors" placeholder="Ex: Portfolio V1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea name="description" required rows={4} value={formData.description} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none transition-colors" placeholder="Description détaillée..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Lien GitHub</label>
                  <input type="url" name="github" value={formData.github} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none transition-colors" placeholder="https://github.com/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Lien Live (Demo)</label>
                  <input type="url" name="link" value={formData.link} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none transition-colors" placeholder="https://..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Tech Stack (séparer par des virgules)</label>
                <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none transition-colors" placeholder="React, Tailwind, Supabase..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Fonctionnalités (séparer par des virgules)</label>
                <input type="text" name="features" value={formData.features} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none transition-colors" placeholder="Dark Mode, Auth, Responsive..." />
              </div>

            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-slate-800">
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              <Save size={20} />
              {loading ? 'Enregistrement...' : 'Créer le projet'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateProject;