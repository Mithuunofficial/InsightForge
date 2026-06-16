import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { UploadCloud, FileSpreadsheet, Download, CheckCircle, AlertCircle } from 'lucide-react';

interface UploadCardProps {
  onUploadSuccess: (fileInfo: { name: string; size: string; rows: number; cols: number }) => void;
}

export const UploadCard: React.FC<UploadCardProps> = ({ onUploadSuccess }) => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [file, setFile] = useState<{ name: string; size: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const acceptedFile = acceptedFiles[0];

    // Check extensions
    const fileExtension = acceptedFile.name.split('.').pop()?.toLowerCase();
    if (fileExtension !== 'csv' && fileExtension !== 'xlsx') {
      setError('Unsupported file type. Please upload a .csv or .xlsx file.');
      return;
    }

    setError(null);
    setFile({
      name: acceptedFile.name,
      size: (acceptedFile.size / 1024).toFixed(1) + ' KB'
    });

    // Simulate upload progress
    let currentProgress = 0;
    setUploadProgress(0);
    const interval = setInterval(() => {
      currentProgress += 10;
      setUploadProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setUploadProgress(null);
        // Call success with realistic mock metadata
        onUploadSuccess({
          name: acceptedFile.name,
          size: (acceptedFile.size / 1024).toFixed(1) + ' KB',
          rows: 45280,
          cols: 14
        });
      }
    }, 100);
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  });

  const handleDownloadSample = () => {
    // Simulated template download alert
    alert('Mock template spreadsheet download started: format is UTC Date, Product, Region, Gross Sales, Quantity.');
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Drag zone border */}
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
          isDragActive 
            ? 'border-indigo-500 bg-indigo-500/5' 
            : file 
              ? 'border-emerald-500/30 bg-emerald-500/5' 
              : 'border-black/10 dark:border-white/10 bg-black/[0.005] dark:bg-white/[0.01] hover:bg-black/[0.02] dark:hover:bg-white/[0.03] hover:border-black/20 dark:hover:border-white/20'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          
          {/* Icons depending on state */}
          {file && !uploadProgress ? (
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle size={24} />
            </div>
          ) : (
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
              isDragActive ? 'text-indigo-600 dark:text-indigo-400 border-indigo-500/20 bg-indigo-500/10' : 'text-gray-500 dark:text-gray-400 border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]'
            }`}>
              <UploadCloud size={24} className={isDragActive ? 'animate-bounce' : ''} />
            </div>
          )}

          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white font-sans">
              {isDragActive 
                ? 'Drop your dataset here...' 
                : file 
                  ? 'Dataset ready for configuration' 
                  : 'Drag & drop your CSV or Excel file'
              }
            </p>
            <p className="text-xs text-gray-500 mt-1 font-sans">
              Support comma-separated CSV spreadsheets and Microsoft Excel tables up to 100MB
            </p>
          </div>

          {!file && (
            <button
              type="button"
              className="py-2 px-4 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs text-gray-800 dark:text-white font-medium border border-black/5 dark:border-white/5 transition-colors duration-200 cursor-pointer"
            >
              Select File
            </button>
          )}

        </div>
      </div>

      {/* Upload progress & file details */}
      {file && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card border border-black/5 dark:border-white/5 rounded-xl p-4 flex items-center justify-between text-xs"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex-shrink-0">
              <FileSpreadsheet size={16} />
            </div>
            <div className="min-w-0">
              <h5 className="font-bold text-gray-900 dark:text-white truncate max-w-[180px] font-sans">{file.name}</h5>
              <p className="text-gray-500 font-sans mt-0.5">{file.size}</p>
            </div>
          </div>

          {uploadProgress !== null ? (
            <div className="w-24 text-right space-y-1">
              <div className="text-[10px] text-gray-500 dark:text-gray-400 font-sans font-bold">{uploadProgress}%</div>
              <div className="h-1.5 w-full rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </div>
          ) : (
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Verified
            </span>
          )}
        </motion.div>
      )}

      {/* Error message */}
      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 rounded-xl text-xs flex items-center gap-2"
        >
          <AlertCircle size={14} />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Sample dataset download CTA */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleDownloadSample}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1.5 transition-colors duration-200 cursor-pointer bg-transparent border-0"
        >
          <Download size={14} />
          <span>Need a test file? Download our sales data template</span>
        </button>
      </div>

    </div>
  );
};
