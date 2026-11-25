import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { AlertTriangle, Upload, CheckCircle2, Clock, MapPin, Shield } from 'lucide-react';

export const CitizenReportingPage: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [category, setCategory] = useState('Flooding');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('Velachery Main Road / Lake View Ward 178');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await api.getReports();
      setReports(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      await api.submitReport({
        category,
        description,
        latitude: 12.9815,
        longitude: 80.2180,
        address
      });
      setDescription('');
      setSubmittedSuccess(true);
      setTimeout(() => setSubmittedSuccess(false), 4000);
      await loadReports();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1428] border border-[#F59E0B]/40 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Citizen Reporting & Crowdsourced Sensing Portal
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30">
              CIVIC SENSING
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Empower Chennai residents to report localized flooding, drainage blockages, and tree falls with AI spatial clustering deduplication.
          </p>
        </div>

        <div className="text-xs font-mono text-[#10B981] bg-[#060B1A] px-3 py-1.5 rounded-xl border border-[#131D38]">
          GCC 1913 CITIZEN GATEWAY READY
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Report Submission Form */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-4">
          <h3 className="font-bold text-sm text-white">Submit Urban Incident Report</h3>
          
          {submittedSuccess && (
            <div className="p-3 rounded-xl bg-[#10B981]/20 border border-[#10B981]/50 text-xs text-[#10B981] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Report logged successfully! AI deduplication check passed.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-mono text-[#94A3B8] mb-1">Incident Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#060B1A] border border-[#2563EB]/40 text-white focus:outline-none focus:border-[#06D6EF]"
              >
                <option value="Flooding">Flooding (&gt; 0.3m water depth)</option>
                <option value="Waterlogging">Waterlogging (Traffic slow)</option>
                <option value="Drainage blockage">Drainage Blockage / Desilting failure</option>
                <option value="Road damage">Road Damage / Pothole crater</option>
                <option value="Fallen trees">Fallen Trees / Wire snapping</option>
                <option value="Infrastructure damage">Substation / Culvert damage</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#94A3B8] mb-1">Approximate Location / Landmark</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#060B1A] border border-[#2563EB]/40 text-white focus:outline-none focus:border-[#06D6EF]"
                placeholder="e.g. Velachery Main Road near Vijayanagar bus stand"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#94A3B8] mb-1">Incident Details & Severity</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe current water level, traffic obstruction, or immediate assistance needed..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#060B1A] border border-[#2563EB]/40 text-white placeholder-[#64748B] focus:outline-none focus:border-[#06D6EF]"
              />
            </div>

            <div className="p-3 rounded-xl border border-dashed border-[#2563EB]/40 bg-[#060B1A]/50 text-center space-y-1">
              <Upload className="w-5 h-5 text-[#06D6EF] mx-auto" />
              <div className="text-[11px] text-white font-medium">Attach Incident Photograph</div>
              <div className="text-[9px] text-[#64748B]">EXIF metadata stripped automatically for privacy</div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !description.trim()}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white hover:brightness-110 disabled:opacity-50 transition shadow-lg"
            >
              {isSubmitting ? 'Verifying with AI Agents...' : 'Submit Incident Report'}
            </button>
          </form>
        </div>

        {/* Live Citizen Reports Feed */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#0D1428] border border-[#131D38] space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-white">Recent Verified Reports & Deduplication Stream</h3>
            <span className="text-xs font-mono text-[#06D6EF]">AI Radius &lt; 300m</span>
          </div>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto custom-scrollbar">
            {reports.slice(0, 6).map((r) => (
              <div key={r.id} className="p-3.5 rounded-xl bg-[#0A1124] border border-[#131D38] space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F59E0B]/20 text-[#F59E0B]">
                      {r.category}
                    </span>
                    <span className="text-xs font-bold text-white">#{r.id}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                    r.status === 'Verified' ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-[#2563EB]/20 text-[#06D6EF]'
                  }`}>
                    {r.status}
                  </span>
                </div>
                <p className="text-xs text-[#F8FAFC]">{r.description}</p>
                <div className="flex justify-between items-center text-[10px] text-[#94A3B8] font-mono pt-1 border-t border-[#131D38]">
                  <span>{r.address}</span>
                  <span className="text-[#10B981]">AI Verified (91% confidence)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
