'use client';

import { useState, useCallback, useRef } from 'react';

interface PopunderTriggerOptions {
  // 延迟时间（毫秒），在用户完成操作后多久触发广告
  delay?: number;
  // 是否只在成功转换后触发
  onlyOnSuccess?: boolean;
  // 最小停留时间（毫秒），用户需要在页面停留多久才能触发广告
  minStayTime?: number;
}

interface PopunderTriggerState {
  shouldShow: boolean;
  canTrigger: boolean;
  hasTriggered: boolean;
  userStayTime: number;
}

export function usePopunderTrigger(options: PopunderTriggerOptions = {}) {
  const {
    delay = 2000, // 默认2秒延迟
    onlyOnSuccess = true,
    minStayTime = 10000 // 默认需要停留10秒
  } = options;

  const [state, setState] = useState<PopunderTriggerState>({
    shouldShow: false,
    canTrigger: false,
    hasTriggered: false,
    userStayTime: 0
  });

  const stayTimeRef = useRef<number>(0);
  const stayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const triggerTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 开始计算用户停留时间
  const startStayTimer = useCallback(() => {
    if (stayTimerRef.current) {
      clearInterval(stayTimerRef.current);
    }

    const startTime = Date.now();
    stayTimerRef.current = setInterval(() => {
      const currentStayTime = Date.now() - startTime;
      stayTimeRef.current = currentStayTime;
      
      setState(prev => ({
        ...prev,
        userStayTime: currentStayTime,
        canTrigger: currentStayTime >= minStayTime && !prev.hasTriggered
      }));
    }, 1000);
  }, [minStayTime]);

  // 停止停留时间计算
  const stopStayTimer = useCallback(() => {
    if (stayTimerRef.current) {
      clearInterval(stayTimerRef.current);
      stayTimerRef.current = null;
    }
  }, []);

  // 触发广告展示
  const triggerAd = useCallback((isSuccess: boolean = true) => {
    // 检查是否满足触发条件
    if (state.hasTriggered) {
      console.log('Popunder ad already triggered today');
      return;
    }

    if (onlyOnSuccess && !isSuccess) {
      console.log('Popunder ad not triggered: operation was not successful');
      return;
    }

    if (stayTimeRef.current < minStayTime) {
      console.log(`Popunder ad not triggered: user stay time (${stayTimeRef.current}ms) less than minimum (${minStayTime}ms)`);
      return;
    }

    // 检查是否已经展示过
    const lastShown = localStorage.getItem('popunder_last_shown');
    const today = new Date().toDateString();
    
    if (lastShown === today) {
      console.log('Popunder ad already shown today');
      setState(prev => ({ ...prev, hasTriggered: true }));
      return;
    }

    // 延迟触发广告
    if (triggerTimerRef.current) {
      clearTimeout(triggerTimerRef.current);
    }

    triggerTimerRef.current = setTimeout(() => {
      setState(prev => ({
        ...prev,
        shouldShow: true,
        hasTriggered: true
      }));
      
      console.log('Popunder ad triggered');
    }, delay);

  }, [state.hasTriggered, onlyOnSuccess, minStayTime, delay]);

  // 重置触发状态（用于测试）
  const resetTrigger = useCallback(() => {
    setState({
      shouldShow: false,
      canTrigger: false,
      hasTriggered: false,
      userStayTime: 0
    });
    
    stayTimeRef.current = 0;
    
    if (triggerTimerRef.current) {
      clearTimeout(triggerTimerRef.current);
      triggerTimerRef.current = null;
    }
    
    localStorage.removeItem('popunder_last_shown');
  }, []);

  // 广告展示成功回调
  const onAdShown = useCallback(() => {
    console.log('Popunder ad shown successfully');
    // 可以在这里添加统计代码
  }, []);

  // 广告展示失败回调
  const onAdError = useCallback((error: Error) => {
    console.error('Popunder ad error:', error);
    setState(prev => ({
      ...prev,
      shouldShow: false
    }));
  }, []);

  // 清理定时器
  const cleanup = useCallback(() => {
    stopStayTimer();
    if (triggerTimerRef.current) {
      clearTimeout(triggerTimerRef.current);
      triggerTimerRef.current = null;
    }
  }, [stopStayTimer]);

  return {
    // 状态
    shouldShow: state.shouldShow,
    canTrigger: state.canTrigger,
    hasTriggered: state.hasTriggered,
    userStayTime: state.userStayTime,
    
    // 方法
    startStayTimer,
    stopStayTimer,
    triggerAd,
    resetTrigger,
    onAdShown,
    onAdError,
    cleanup,
    
    // 工具方法
    formatStayTime: (ms: number) => {
      const seconds = Math.floor(ms / 1000);
      return `${seconds}s`;
    },
    
    // 检查是否可以触发（用于UI显示）
    canTriggerAd: () => {
      return state.canTrigger && !state.hasTriggered && stayTimeRef.current >= minStayTime;
    }
  };
}