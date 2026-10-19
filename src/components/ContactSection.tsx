import React, { useState } from 'react';
import { SchoolInfo } from '../types';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  siteInfo: SchoolInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ siteInfo }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Admission Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Admission Inquiry',
        message: ''
      });
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-sky-600 font-bold mb-1">
            Communication & Location
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Contact & Campus Administration
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Reach out to our administrative desk for admissions, verification, or general school inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Institutional Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Campus Address Card */}
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Campus Address</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {siteInfo.address}
                  </p>
                  <div className="text-[11px] text-slate-400 mt-1">
                    EIIN: {siteInfo.eiin} · BISE Barishal
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Phone & Helpline */}
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Helpline & Administrative Phone</h4>
                  <div className="mt-1 space-y-0.5 text-xs">
                    <p className="text-slate-700">
                      Office: <a href={`tel:${siteInfo.phone}`} className="font-semibold text-sky-600 hover:underline">{siteInfo.phone}</a>
                    </p>
                    {siteInfo.emergencyPhone && (
                      <p className="text-slate-700">
                        Helpdesk: <a href={`tel:${siteInfo.emergencyPhone}`} className="font-semibold text-sky-600 hover:underline">{siteInfo.emergencyPhone}</a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Official Email</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    <a href={`mailto:${siteInfo.email}`} className="font-semibold text-sky-600 hover:underline">
                      {siteInfo.email}
                    </a>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Expect response within 24 operational hours.</p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Office & Class Hours</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Saturday – Thursday: 9:00 AM – 4:30 PM
                  </p>
                  <p className="text-xs text-rose-600 font-medium mt-0.5">
                    Friday & Public Holidays: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Official Social Media:</span>
              <div className="flex items-center gap-3">
                <a
                  href={siteInfo.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1"
                >
                  Facebook
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={siteInfo.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-1"
                >
                  YouTube
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Interactive Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Send an Admission or General Inquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Guardians, students, and visitors can submit inquiries directly to the administrative desk.
            </p>

            {formSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-emerald-900 text-sm">Message Successfully Submitted!</h4>
                <p className="text-xs text-emerald-700 mt-1">
                  Thank you for reaching out to Atghar High School. Our administrative office will review your query and contact you promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Md. Shahidul Islam"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +880 1712-000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. guardian@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Inquiry Purpose</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    >
                      <option value="Admission Inquiry">Class Admission (6 to 9)</option>
                      <option value="Transcript Verification">Academic Transcript Verification</option>
                      <option value="Tuition & Fees">Scholarship & Fee Queries</option>
                      <option value="General Information">General School Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Message or Question *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please specify student details, previous academic class, or your specific questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors shadow-xs flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
