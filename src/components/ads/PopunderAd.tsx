'use client';

import { useEffect, useState } from 'react';

interface PopunderAdProps {
  shouldShow: boolean;
  onShow?: () => void;
  onError?: (error: Error) => void;
}

export default function PopunderAd({ shouldShow, onShow, onError }: PopunderAdProps) {
  const [hasShown, setHasShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    // 检查是否在移动设备上（移动设备体验较差，暂不展示）
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      return;
    }

    if (shouldShow && !hasShown && !isLoading) {
      setIsLoading(true);
      
      try {
        // 延迟加载广告脚本，避免影响页面性能
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//pl27845680.effectivegatecpm.com/fe/94/06/fe94064d80d74690b289cde23b4fe784.js';
        script.async = true;
        
        // 添加错误处理
        script.onerror = () => {
          const error = new Error('Failed to load Adsterra popunder script');
          onError?.(error);
          setIsLoading(false);
        };

        script.onload = () => {
          // 记录展示时间
          localStorage.setItem('popunder_last_shown', today);
          setHasShown(true);
          setIsLoading(false);
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
        };
        
        document.head.appendChild(script);
        
      } catch (error) {
        onError?.(error as Error);
        setIsLoading(false);
      }
    }
  }, [shouldShow, hasShown, isLoading, onShow, onError]);

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
  }
};