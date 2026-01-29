'use client';

import { useEffect, useState } from 'react';

interface PopunderAdProps {
  shouldShow: boolean;
  onShow?: () => void;
  onError?: (error: Error) => void;
}

export default function PopunderAd({ shouldShow, onShow, onError }: PopunderAdProps) {
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // 检查用户是否禁用了广告
    const adDisabled = localStorage.getItem('popunder_disabled') === 'true';
    if (adDisabled) {
      return;
    }

    // 检查是否已经展示过（每天限制一次）
    const lastShown = localStorage.getItem('popunder_last_shown');
    const today = new Date().toDateString();
    
    if (lastShown === today) {
      setHasShown(true);
      return;
    }

    // 如果触发了展示逻辑
    if (shouldShow && !hasShown) {
      try {
        // 记录展示时间
        localStorage.setItem('popunder_last_shown', today);
        setHasShown(true);
        onShow?.();
        
        // 记录广告展示统计
        const adStats = JSON.parse(localStorage.getItem('popunder_stats') || '{"shows": 0, "lastMonth": ""}');
        const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
        
        if (adStats.lastMonth !== currentMonth) {
          adStats.shows = 1;
          adStats.lastMonth = currentMonth;
        } else {
          adStats.shows += 1;
        }
        
        localStorage.setItem('popunder_stats', JSON.stringify(adStats));
        
      } catch (error) {
        onError?.(error as Error);
      }
    }
  }, [shouldShow, hasShown, onShow, onError]);

  // 不渲染任何可见内容
  return null;
}

// 导出用户偏好管理函数
export const AdPreferences = {
  // 禁用广告
  disableAds: () => {
    localStorage.setItem('popunder_disabled', 'true');
  },
  
  // 启用广告
  enableAds: () => {
    localStorage.removeItem('popunder_disabled');
  },
  
  // 检查广告是否被禁用
  isDisabled: () => {
    return localStorage.getItem('popunder_disabled') === 'true';
  },
  
  // 获取广告统计信息
  getStats: () => {
    return JSON.parse(localStorage.getItem('popunder_stats') || '{"shows": 0, "lastMonth": ""}');
  },
  
  // 重置今日展示记录（用于测试）
  resetTodayShow: () => {
    localStorage.removeItem('popunder_last_shown');
  },
  
  // 记录广告展示
  recordShow: () => {
    const today = new Date().toDateString();
    localStorage.setItem('popunder_last_shown', today);
    
    const adStats = JSON.parse(localStorage.getItem('popunder_stats') || '{"shows": 0, "lastMonth": ""}');
    const currentMonth = new Date().toISOString().slice(0, 7);
    
    if (adStats.lastMonth !== currentMonth) {
      adStats.shows = 1;
      adStats.lastMonth = currentMonth;
    } else {
      adStats.shows += 1;
    }
    localStorage.setItem('popunder_stats', JSON.stringify(adStats));
  }
};
