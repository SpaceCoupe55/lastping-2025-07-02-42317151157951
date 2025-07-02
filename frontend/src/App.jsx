import React, { useState, useEffect } from 'react';
import { Shield, Clock, User, Settings, AlertTriangle, CheckCircle, Wallet } from 'lucide-react';

const App = () => {
  const [connected, setConnected] = useState(false);
  const [principal, setPrincipal] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backupWallet, setBackupWallet] = useState('');
  const [timeoutDays, setTimeoutDays] = useState(30);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock connection status - replace with actual ICP connection logic
  useEffect(() => {
    // Simulate checking for existing connection
    const checkConnection = async () => {
      // This would be replaced with actual ICP agent connection
      // For now, we'll simulate it
      setTimeout(() => {
        setConnected(false);
      }, 1000);
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    try {
      // Mock wallet connection - replace with actual ICP connection
      // This would use @dfinity/agent and @dfinity/auth-client
      setTimeout(() => {
        setConnected(true);
        setPrincipal('rdmx6-jaaaa-aaaah-qcaiq-cai'); // Mock principal
        setLoading(false);
        setSuccess('Wallet connected successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }, 1500);
    } catch (err) {
      setError('Failed to connect wallet');
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setPrincipal('');
    setStatus(null);
  };

  const fetchStatus = async () => {
    if (!connected) return;
    
    setLoading(true);
    try {
      // Mock API call - replace with actual canister call
      setTimeout(() => {
        setStatus({
          owner: 'rdmx6-jaaaa-aaaah-qcaiq-cai',
          backupWallet: 'rrkah-fqaaa-aaaah-qcupq-cai',
          lastPing: Date.now() - 86400000, // 1 day ago
          timeout: 30 * 86400000000000 // 30 days in nanoseconds
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to fetch status');
      setLoading(false);
    }
  };

  const ping = async () => {
    if (!connected) return;
    
    setLoading(true);
    try {
      // Mock API call - replace with actual canister call
      setTimeout(() => {
        setLoading(false);
        setSuccess('Ping successful! Timer reset.');
        setTimeout(() => setSuccess(''), 3000);
        fetchStatus(); // Refresh status
      }, 1000);
    } catch (err) {
      setError('Failed to ping');
      setLoading(false);
    }
  };

  const setBackup = async () => {
    if (!connected || !backupWallet) return;
    
    setLoading(true);
    try {
      // Mock API call - replace with actual canister call
      setTimeout(() => {
        setLoading(false);
        setSuccess('Backup wallet set successfully!');
        setTimeout(() => setSuccess(''), 3000);
        setBackupWallet('');
        fetchStatus(); // Refresh status
      }, 1000);
    } catch (err) {
      setError('Failed to set backup wallet');
      setLoading(false);
    }
  };

  const setTimeout = async () => {
    if (!connected || timeoutDays < 1) return;
    
    setLoading(true);
    try {
      // Mock API call - replace with actual canister call
      setTimeout(() => {
        setLoading(false);
        setSuccess(`Timeout set to ${timeoutDays} days successfully!`);
        setTimeout(() => setSuccess(''), 3000);
        fetchStatus(); // Refresh status
      }, 1000);
    } catch (err) {
      setError('Failed to set timeout');
      setLoading(false);
    }
  };

  const claimOwnership = async () => {
    if (!connected) return;
    
    setLoading(true);
    try {
      // Mock API call - replace with actual canister call
      setTimeout(() => {
        setLoading(false);
        setSuccess('Ownership claimed successfully!');
        setTimeout(() => setSuccess(''), 3000);
        fetchStatus(); // Refresh status
      }, 1000);
    } catch (err) {
      setError('Failed to claim ownership');
      setLoading(false);
    }
  };

  const formatPrincipal = (principal) => {
    if (!principal) return '';
    return `${principal.slice(0, 8)}...${principal.slice(-8)}`;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTimeRemaining = () => {
    if (!status) return null;
    
    const timeoutMs = Number(status.timeout) / 1000000; // Convert nanoseconds to milliseconds
    const deadline = status.lastPing + timeoutMs;
    const remaining = deadline - Date.now();
    
    if (remaining <= 0) return 'EXPIRED';
    
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h`;
  };

  const isExpired = () => {
    if (!status) return false;
    const timeoutMs = Number(status.timeout) / 1000000;
    const deadline = status.lastPing + timeoutMs;
    return Date.now() > deadline;
  };

  const isBackupWallet = () => {
    return status && status.backupWallet && principal === status.backupWallet;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-purple-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">LastPing</h1>
          </div>
          <p className="text-slate-300 text-lg">Dead Man's Switch for Internet Computer</p>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-3" />
            <span className="text-red-200">{error}</span>
            <button 
              onClick={() => setError('')}
              className="ml-auto text-red-400 hover:text-red-300"
            >
              ×
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
            <span className="text-green-200">{success}</span>
          </div>
        )}

        {/* Connection Status */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wallet className="w-6 h-6 text-purple-400 mr-3" />
              <div>
                <h3 className="text-white font-semibold">Wallet Connection</h3>
                {connected ? (
                  <p className="text-slate-300 text-sm">Connected: {formatPrincipal(principal)}</p>
                ) : (
                  <p className="text-slate-400 text-sm">Not connected</p>
                )}
              </div>
            </div>
            {!connected ? (
              <button
                onClick={connectWallet}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={fetchStatus}
                  disabled={loading}
                  className="bg-slate-600 hover:bg-slate-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Refresh
                </button>
                <button
                  onClick={disconnectWallet}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>

        {connected && (
          <>
            {/* Status Display */}
            {status && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center">
                  <Clock className="w-6 h-6 text-purple-400 mr-3" />
                  Contract Status
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <label className="text-slate-300 text-sm">Owner</label>
                      <p className="text-white font-mono text-sm bg-slate-700 p-2 rounded">
                        {formatPrincipal(status.owner)}
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <label className="text-slate-300 text-sm">Backup Wallet</label>
                      <p className="text-white font-mono text-sm bg-slate-700 p-2 rounded">
                        {status.backupWallet ? formatPrincipal(status.backupWallet) : 'Not set'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <label className="text-slate-300 text-sm">Last Ping</label>
                      <p className="text-white text-sm bg-slate-700 p-2 rounded">
                        {formatTime(status.lastPing)}
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <label className="text-slate-300 text-sm">Time Remaining</label>
                      <p className={`text-sm font-semibold p-2 rounded ${
                        isExpired() ? 'text-red-400 bg-red-900/30' : 'text-green-400 bg-green-900/30'
                      }`}>
                        {getTimeRemaining()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {principal === status.owner && (
                    <button
                      onClick={ping}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      {loading ? 'Pinging...' : 'Ping Now'}
                    </button>
                  )}
                  
                  {isBackupWallet() && isExpired() && (
                    <button
                      onClick={claimOwnership}
                      disabled={loading}
                      className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      {loading ? 'Claiming...' : 'Claim Ownership'}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Settings */}
            {(!status || principal === status.owner) && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center">
                  <Settings className="w-6 h-6 text-purple-400 mr-3" />
                  Settings
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 text-sm mb-2">Set Backup Wallet</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={backupWallet}
                        onChange={(e) => setBackupWallet(e.target.value)}
                        placeholder="Enter principal ID..."
                        className="flex-1 bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                      />
                      <button
                        onClick={setBackup}
                        disabled={loading || !backupWallet}
                        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                      >
                        Set
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-slate-300 text-sm mb-2">Timeout (Days)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={timeoutDays}
                        onChange={(e) => setTimeoutDays(Number(e.target.value))}
                        min="1"
                        max="365"
                        className="flex-1 bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                      />
                      <button
                        onClick={setTimeout}
                        disabled={loading || timeoutDays < 1}
                        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                      >
                        Set
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-slate-400">
          <p>Built on Internet Computer Protocol</p>
        </div>
      </div>
    </div>
  );
};

export default App;