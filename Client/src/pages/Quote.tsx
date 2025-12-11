import { useEffect, useRef, useState } from 'react';

const MAX_TOTAL = 18 * 1024 * 1024; // 18 MB safe total
const ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png';

const API_BASE = (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_API_BASE
  ? String((import.meta as any).env.VITE_API_BASE).trim()
  : '');

const Quote: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [filesError, setFilesError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(''); // for screen readers
  const [flash, setFlash] = useState<{ type: 'success' | 'error' | 'sending'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const submitLockRef = useRef(false); // re-entrancy guard

  // Auto-dismiss success/error after a short delay
  useEffect(() => {
    if (!flash) return;
    if (flash.type === 'sending') return;
    const t = setTimeout(() => setFlash(null), 4000);
    return () => clearTimeout(t);
  }, [flash]);

  const totalUsed = files.reduce((sum, f) => sum + f.size, 0);
  const usedPct = Math.min(100, Math.round((totalUsed / MAX_TOTAL) * 100));
  const formatSize = (bytes: number) => (bytes / (1024 * 1024)).toFixed(1);
  const overLimit = totalUsed > MAX_TOTAL;
  const fileHelperId = 'file-helper';
  const fileErrorId = 'file-error';
  const fileDescribedBy = [fileHelperId, (filesError || overLimit) ? fileErrorId : null].filter(Boolean).join(' ');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = Array.from(event.target.files || []);
    if (!chosen.length) {
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const tooBig = chosen.find(f => f.size > MAX_TOTAL);
    if (tooBig) {
      setFilesError(`${tooBig.name} is ${formatSize(tooBig.size)} MB. Max size is 18 MB per file.`);
      setStatusMessage(`${tooBig.name} is too large. Maximum 18 MB per file.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const merged = [...files, ...chosen];
    const total = merged.reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_TOTAL) {
      setFilesError(`Total size ${formatSize(total)} MB exceeds 18 MB limit. Remove some files.`);
      setStatusMessage('Total file size exceeds 18 MB. Please remove some files.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const seen = new Set<string>();
    const deduped = merged.filter(f => {
      const key = `${f.name}-${f.size}-${f.lastModified}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    setFiles(deduped);
    setFilesError('');
    setStatusMessage(`${deduped.length} file${deduped.length === 1 ? '' : 's'} selected. Total ${formatSize(totalUsed)} MB.`);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Synchronous guard (in case rapid double clicks happen before state updates)
    if (submitLockRef.current) return;
    if (isSubmitting || overLimit) return;
    submitLockRef.current = true;
    setIsSubmitting(true);
    setStatusMessage('Submitting your request...');
    setFlash({ type: 'sending', message: 'Sending your request…' });

    // Capture form element early to avoid null reference after async operations
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    formData.delete('attachments');
    files.forEach(f => formData.append('attachments', f));

    try {
      // Add a timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s
      const response = await fetch(`${API_BASE}/api/quote`, { method: 'POST', body: formData, signal: controller.signal });
      clearTimeout(timeoutId);
      if (response.ok) {
        const successText = 'Thank you for your inquiry. We will get back to you shortly!';
        setFlash({ type: 'success', message: successText });
        setStatusMessage('Request submitted successfully. Thank you!');
        formEl.reset();
        setFiles([]);
        setFilesError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        const msg = errorData.error || 'There was an error submitting your request. Please try again.';
        setFlash({ type: 'error', message: msg });
        setStatusMessage(msg);
      }
    } catch (error) {
      console.error('Submit error:', error);
      const aborted = (error as any)?.name === 'AbortError';
      const msg = aborted ? 'Request timed out. Please try again.' : 'Network error. Please check your connection and try again.';
      setFlash({ type: 'error', message: msg });
      setStatusMessage(msg);
    } finally {
      setIsSubmitting(false);
      submitLockRef.current = false;
    }
  };

  const handleClearFiles = () => {
    setFiles([]);
    setFilesError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveFile = (targetFile: File) => {
    const next = files.filter(f => f !== targetFile);
    setFiles(next);
    setFilesError('');
  };

  return (
    <div>
      {/* Centered flash/sonner overlay */}
      {flash && (
        <div className="fixed inset-0 z-[9999] grid place-items-center pointer-events-none">
          <div
            role="status"
            aria-live="polite"
            className={
              `pointer-events-auto max-w-md w-[92%] sm:w-[28rem] rounded-2xl shadow-xl px-5 py-4 text-sm sm:text-base ` +
              (flash.type === 'success' ? 'bg-white border border-green-200 text-[var(--color-dark)]' :
               flash.type === 'error' ? 'bg-white border border-red-200 text-[var(--color-dark)]' :
               'bg-white border border-[var(--color-light-gray)] text-[var(--color-dark)]')
            }
          >
            <div className="flex items-start gap-3">
              {/* Icon / spinner */}
              {flash.type === 'sending' ? (
                <span className="mt-0.5 inline-block w-4 h-4 rounded-full border-2 border-[var(--color-primary-blue)] border-t-transparent animate-spin"></span>
              ) : flash.type === 'success' ? (
                <span className="mt-0.5 inline-block w-4 h-4 rounded-full bg-green-500"></span>
              ) : (
                <span className="mt-0.5 inline-block w-4 h-4 rounded-full bg-red-500"></span>
              )}
              <div className="flex-1">
                {flash.type === 'sending' ? (
                  <p className="font-semibold">Sending…</p>
                ) : (
                  <p className="font-semibold">{flash.message}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setFlash(null)}
                className="ml-2 text-[var(--color-dark)]/70 hover:text-[var(--color-dark)]"
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Hero image band */}
      <section className="relative h-[20dvh] sm:h-[20dvh] lg:h-[34dvh] overflow-hidden">
        <img
          src="/tenweb_media_r03qb6za6.jpg"
          alt="Request a quote for heat treatment"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[var(--color-primary-blue)]/70 via-[var(--color-primary-blue)]/60 to-transparent backdrop-blur-[2px] sm:backdrop-blur" />
        <div className="relative h-full w-full max-w-7xl mx-auto px-3 sm:px-6 flex items-center  pb-6 sm:pb-10">
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white font-heading leading-tight">Request a Quote</h1>
            <p className="text-white/90 max-w-2xl mt-2 text-sm sm:text-base">Share your specs, drawings, and quantities—we'll respond quickly with a precise, code-compliant proposal.</p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="relative py-10 sm:py-10 bg-[var(--color-neutral-gray)]">
        <div aria-hidden className="pointer-events-none absolute -top-10 -left-10 w-72 h-72 rounded-full bg-[var(--color-primary-blue)]/13 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-10 w-80 h-80 rounded-full bg-[var(--color-primary-orange)]/13 blur-3xl" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6">
          <div className="w-full max-w-3xl mx-auto">
            <div id="quote-form" className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-[var(--color-light-gray)] border-t-4 border-t-[var(--color-primary-orange)] scroll-mt-[var(--nav-h)] h-full flex flex-col">
              <h2 className="text-2xl font-bold text-[var(--color-primary-blue)] mb-4 font-heading">Tell us about your job</h2>

              <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                {/* Live region for SR status updates */}
                <div className="sr-only" role="status" aria-live="polite">{statusMessage}</div>
                {/* Honeypot */}
                <input type="text" name="website" autoComplete="off" tabIndex={-1} className="hidden" />

                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input id="name" type="text" name="name" autoComplete="name" placeholder="Your Name *" required className="w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]" />
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input id="email" type="email" name="email" autoComplete="email" placeholder="Your Email *" required className="w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]" />
                </div>

                {/* Company & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label htmlFor="company" className="sr-only">Company</label>
                  <input id="company" type="text" name="company" autoComplete="organization" placeholder="Company Name *" required className="w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]" />
                  <label htmlFor="phone" className="sr-only">Phone</label>
                  <input id="phone" type="tel" name="phone" autoComplete="tel" placeholder="Phone Number *" required className="w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]" />
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="sr-only">Service</label>
                  <select id="service" name="service" className="w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-lg bg-white text-[var(--color-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]" defaultValue="" required>
                    <option value="" disabled>Select a service of interest *</option>
                    {[
                      'PWHT / Stress Relief',
                      'Preheating',
                      'Dry Out System',
                      'Normalizing',
                      'Hydrogen Diffusion',
                      'Temporary Electric Furnace',
                      'Other',
                    ].map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                  </select>
                </div>

                {/* Requirements */}
                <div>
                  <label htmlFor="requirements" className="sr-only">Requirements</label>
                  <textarea id="requirements" name="requirements" placeholder="Please describe your project requirements in detail... *" rows={6} required className="w-full px-4 py-3 border border-[var(--color-light-gray)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]" />
                </div>

                {/* File Upload (multi) */}
                <div>
                  <label htmlFor="fileUpload" className="block text-[var(--color-dark)] font-medium mb-2">Attach Files (optional)</label>

                  <div className="flex items-center gap-3 border border-[var(--color-light-gray)] rounded-lg px-3 py-2.5 bg-[var(--color-neutral-gray)] hover:bg-[var(--color-neutral-gray)]/70 transition">
                    <input
                      type="file"
                      id="fileUpload"
                      name="attachments"
                      multiple
                      onChange={handleFileChange}
                      className="sr-only"
                      accept={ACCEPT}
                      ref={fileInputRef}
                      aria-describedby={fileDescribedBy}
                      aria-invalid={Boolean(filesError || overLimit)}
                    />
                    <label htmlFor="fileUpload" className="bg-[var(--color-primary-orange)] text-white px-4 py-2 rounded-lg font-semibold cursor-pointer hover:bg-[var(--color-primary-orange)]/90 transition">
                      Choose Files
                    </label>
                    <span className="text-[var(--color-dark)] text-sm truncate flex-1">
                      {files.length === 0 ? 'No files chosen' :
                        files.length === 1 ? files[0].name :
                        `${files.length} files selected (${formatSize(totalUsed)} MB)`}
                    </span>
                    {files.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearFiles}
                        className="text-[var(--color-primary-blue)] text-sm font-semibold px-3 py-1.5 rounded-full border border-[var(--color-primary-blue)] hover:bg-[var(--color-neutral-gray)] transition"
                        aria-label="Clear selected files"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {/* Indicator moved BELOW the Choose Files row */}
                  <div className="mt-2">
                    {/* Total size progress */}
                    <div className="w-full h-1.5 bg-[var(--color-neutral-gray)] rounded overflow-hidden" aria-label="Total upload size used">
                      <div
                        className="h-full bg-[var(--color-primary-blue)] transition-all"
                        style={{ width: `${usedPct}%` }}
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={usedPct}
                        aria-valuetext={`Total size ${formatSize(totalUsed)} MB of 18 MB`}
                      />
                    </div>

                    {/* Pills and helper text */}
                    {files.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {files.map((f) => (
                          <span
                            key={`${f.name}-${f.size}-${f.lastModified}`}
                            className="inline-flex items-center gap-2 text-xs bg-white border border-[var(--color-light-gray)] rounded-full px-3 py-1 shadow-sm w-full"
                          >
                            <span className="truncate flex-1 min-w-0" title={f.name}>
                              {f.name} · {formatSize(f.size)} MB
                            </span>
                            <button
                              type="button"
                              aria-label={`Remove ${f.name}`}
                              className="grid place-items-center w-5 h-5 rounded-full bg-[var(--color-primary-blue)] text-white hover:opacity-90 transition-opacity flex-shrink-0"
                              onClick={() => handleRemoveFile(f)}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    <p id={fileHelperId} className="text-xs text-[var(--color-dark)]/70 mt-2">
                      PDF, DOC, DOCX, JPG, PNG. Max 18 MB total.{files.length > 0 && ` Current: ${formatSize(totalUsed)} MB`}
                    </p>
                    {filesError && <p id={fileErrorId} role="alert" className="text-xs text-red-600 mt-1">{filesError}</p>}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || overLimit}
                  aria-disabled={isSubmitting || overLimit}
                  aria-busy={isSubmitting}
                  className="w-full bg-[var(--color-primary-orange)] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[var(--color-primary-orange)]/90 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none transition-all text-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
                <p className="text-xs text-[var(--color-dark)]/70">By submitting, you agree we may contact you about this request. We'll never share your information.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quote;
