'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AdPreferences } from './PopunderAd';
import { X, Settings, Shield, BarChart3 } from 'lucide-react';

interface AdPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdPreferencesModal({ isOpen, onClose }: AdPreferencesModalProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [stats, setStats] = useState({ shows: 0, lastMonth: '' });

  useEffect(() => {
    if (isOpen) {
      setIsDisabled(AdPreferences.isDisabled());
      setStats(AdPreferences.getStats());
    }
  }, [isOpen]);

  const handleToggleAds = () => {
    if (isDisabled) {
      AdPreferences.enableAds();
      setIsDisabled(false);
    } else {
      AdPreferences.disableAds();
      setIsDisabled(true);
    }
  };

  const handleResetToday = () => {
    AdPreferences.resetTodayShow();
    alert('Today\'s ad display record has been reset. You may see ads again today.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Ad Preferences</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Ad Control */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Advertisement Control</h3>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Advertisements</p>
                  <p className="text-sm text-muted-foreground">
                    {isDisabled 
                      ? 'Ads are currently disabled' 
                      : 'Ads help support this free service'
                    }
                  </p>
                </div>
                <Button
                  onClick={handleToggleAds}
                  variant={isDisabled ? "outline" : "default"}
                  size="sm"
                >
                  {isDisabled ? 'Enable' : 'Disable'}
                </Button>
              </div>
              
              {!isDisabled && (
                <div className="text-xs text-muted-foreground border-t border-border pt-3">
                  <p>• Ads are shown only after successful conversions</p>
                  <p>• Maximum one ad per day</p>
                  <p>• No ads on mobile devices</p>
                  <p>• Ads help keep this service free</p>
                </div>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Statistics</h3>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ads shown this month:</span>
                <span className="text-sm font-medium">{stats.shows}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Current month:</span>
                <span className="text-sm font-medium">{stats.lastMonth || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Developer Options */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">Developer Options</h3>
            <div className="p-4 bg-muted/30 rounded-lg">
              <Button
                onClick={handleResetToday}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Reset Today&apos;s Ad Record
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                This will allow ads to be shown again today (for testing purposes)
              </p>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Privacy Notice</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ad preferences are stored locally in your browser. We don&apos;t collect personal data 
              for advertising purposes. Ads are provided by Adsterra and subject to their privacy policy.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <Button onClick={onClose} className="w-full">
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}