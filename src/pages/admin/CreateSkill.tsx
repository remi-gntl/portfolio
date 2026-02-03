import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Save, X } from 'lucide-react';
import { compressImage } from '../../lib/imageOptimizer';

const CreateSkill = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Frontend'); // Valeur par défaut

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

      if (imageFile) {
        // Compression
        const compressedFile = await compressImage(imageFile);
        const fileExt = 'webp';
        const fileName = `skill-${Date.now()}.${fileExt}`;
        
        // Upload
        const { error: uploadError } = await supabase.storage
          .from('projects') // On peut utiliser le même bucket
          .upload(fileName, compressedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('projects')
          .getPublicUrl(fileName);
        
        imageUrl = publicUrl;
      }

      // Insert
      const { error: dbError } = await supabase.from('skills').insert([
        {
          name,
          category,
          image: imageUrl
        }
      ]);

      if (dbError) throw dbError;
      navigate('/admin/dashboard');

    } catch (error) {
      console.error('Erreur:', error);
      alert("Erreur lors de la création.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6 md:p-10">
      <div className="max-w-xl mx-auto">
        
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/admin/dashboard')} className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold">Nouvelle Compétence</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900 p-8 rounded-2xl border border-slate-800">
          
          {/* Logo Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className={`relative w-24 h-24 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center overflow-hidden hover:border-blue-500 transition-colors bg-slate-800`}>
              {preview ? (
                <>
                  <img src={preview} alt="Preview" className="w-full h-full object-contain p-2" />
                  <button type="button" onClick={() => { setPreview(null); setImageFile(null); }} className="absolute top-1 right-1 p-0.5 bg-red-500 rounded-full"><X size={12} /></button>
                </>
              ) : (
                <Upload className="w-8 h-8 text-gray-500" />
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className={`absolute inset-0 opacity-0 cursor-pointer ${preview ? 'hidden' : ''}`} />
            </div>
            <span className="text-sm text-gray-500 mt-2">Logo (SVG ou PNG)</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Nom</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none" placeholder="Ex: React" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Catégorie</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none text-white">
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="DevOps">DevOps</option>
              <option value="Mobile">Mobile</option>
              <option value="Tools">Outils / Autre</option>
              <option value="System">Système & Réseau</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50 mt-4">
            <Save size={20} />
            {loading ? 'Ajout...' : 'Ajouter la compétence'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateSkill;